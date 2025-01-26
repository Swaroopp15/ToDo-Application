import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  regForm: FormGroup;
  alertMessage: string = '';
  alertType: string = '';

  constructor(private regbulider: FormBuilder, private auth: SupabaseService, private route: Router) {
    this.regForm = this.regbulider.group({
      remail: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      rpassword: ['', Validators.required],
      rconfirmpassword: ['', Validators.required]
    });
  }

  submitreg() {
    if (this.regForm.valid) {
      if (this.regForm.value.rpassword === this.regForm.value.rconfirmpassword) {
        this.auth.register(this.regForm.value.remail, this.regForm.value.rpassword)
          .subscribe({
            next: (res: any) => {
              console.log(res);
              this.alertMessage = 'Registration successful!';
              this.alertType = 'success';
              setTimeout(() => this.alertMessage = '', 3000);
              this.route.navigate(['/login']);
            },
            error: (err: any) => {
              console.log(err);
              this.alertMessage = 'Registration failed!';
              this.alertType = 'error';
              setTimeout(() => this.alertMessage = '', 3000);
            }
          });
      } else {
        this.alertMessage = 'Passwords do not match!';
        this.alertType = 'error';
        setTimeout(() => this.alertMessage = '', 3000);
      }
    } else {
      this.alertMessage = 'Please fill in all required fields correctly.';
      this.alertType = 'error';
      setTimeout(() => this.alertMessage = '', 3000);
    }
  }
}
