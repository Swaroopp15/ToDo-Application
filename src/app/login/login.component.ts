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
  
  constructor(private formbulider: FormBuilder, private auth: SupabaseService, private router: Router) {
    this.userForm = this.formbulider.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      password: ['', Validators.required]
    });
    console.log('before:'+ localStorage.getItem('user_id'))
  }

  submitForm() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.auth.login(this.userForm.value.email, this.userForm.value.password)
      .then((res: any) => {
        console.log(res);
        console.log('before:'+ localStorage.getItem('user_id'))
        localStorage.setItem('user_id', res.data.user.id);
        console.log('local storage:'+localStorage.getItem('user_id'))
        if(res.error === null)
          this.router.navigate(['/dashboard']);
          else alert('login failed!');
      }).catch((err: any) => {
        console.log(err);
        alert('Incorrect Details..!')
      })
    }
  }
}