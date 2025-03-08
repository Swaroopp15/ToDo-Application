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
  active : boolean = false;

  constructor(private formbuilder: FormBuilder, private auth: SupabaseService, private router: Router) {
    this.userForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      this.auth.login(this.userForm.value.email, this.userForm.value.password)
        .subscribe({
          next: (res: any) => {
            // console.log(res);
            if (res.error) {
              this.active = true;
              console.log('Login failed!');
            } else if (res.data && res.data.user) {
              localStorage.setItem('user_id', res.data.user.id);

              if (!res.error) {
                this.router.navigate(['/dashboard']);
              } else if (res.status === 400) {
                this.active = true;
                console.log(this.active);
                console.log('Login failed!');
              }
            }
          },
          error: (err: any) => {
            this.active = true;
            console.log('Incorrect details or error occurred!', err);
          }
        });
    } else {
      console.log('Please fill in the form correctly.');
    }
  }
}
