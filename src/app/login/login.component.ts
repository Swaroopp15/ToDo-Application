import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  specificRoute = 'login';
  userForm: FormGroup;
  alertMessage: string = '';
  alertType: string = '';
  // set: any = localStorage.setItem('user_id', '');

  constructor(private formbuilder: FormBuilder, private auth: SupabaseService, private router: Router) {
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', Validators.required]
    });
    // console.log(this.set);

  }

  submitForm() {
    if (this.userForm.valid) {
      this.auth.login(this.userForm.value.email, this.userForm.value.password)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.data && res.data.user) {
              localStorage.setItem('user_id', res.data.user.id);

              if (!res.error) {
                this.alertMessage = 'Login successful!';
                this.alertType = 'success';
                setTimeout(() => this.alertMessage = '', 3000);
                this.router.navigate(['/dashboard']);
              } else {
                this.alertMessage = 'Login failed!';
                this.alertType = 'error';
                setTimeout(() => this.alertMessage = '', 3000);
              }
            }
          },
          error: (err: any) => {
            console.log(err);
            this.alertMessage = 'Incorrect details or error occurred!';
            this.alertType = 'error';
            setTimeout(() => this.alertMessage = '', 3000);
          }
        });
    } else {
      this.alertMessage = 'Please fill in the form correctly.';
      this.alertType = 'error';
      setTimeout(() => this.alertMessage = '', 3000);
    }
  }
}
