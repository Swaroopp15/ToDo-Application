import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasktable',
  standalone: false,

  templateUrl: './tasktable.component.html',
  styleUrl: './tasktable.component.css'
})
export class TasktableComponent {
  taskform: FormGroup;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor(
    private taskbuilder: FormBuilder,
    private createtask: SupabaseService,
    private router: Router
  ) {
    this.taskform = this.taskbuilder.group({
      name: ['', Validators.required],
      priority: [null, Validators.required],
      description: [''],
      duetime: ['']
    });
  }

  newtask() {
    if (this.taskform.valid) {
      const { name, description, duetime, priority } = this.taskform.value;
      const user_id = localStorage.getItem('user_id');

      this.createtask
        .submittask(name, description, duetime, priority, user_id)
        .subscribe({
          next: (res: any) => {
            console.log('Task creation response:', res);  // Log response to debug
            if (res.data) {
              this.alertMessage = 'Task created successfully!';
              this.alertType = 'success';
              this.router.navigateByUrl('/dashboard');
            } else if (res.error) {
              this.alertMessage = 'Failed to create task. Please try again.';
              this.alertType = 'error';
              console.error('Supabase error:', res.error);
            }
          },
          error: (err) => {
            console.error('Task creation error:', err);
            this.alertMessage = 'An error occurred. Please try again.';
            this.alertType = 'error';
          }
        });
    } else {
      this.alertMessage = 'Please fill in all required fields.';
      this.alertType = 'error';
    }
  }
}
