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
      priority: ['', Validators.required],
      description: [''],
      duetime: ['']
    });
  }

  newtask() {
    if (this.taskform.valid) {
      const { name, description, duetime, priority } = this.taskform.value;

      this.createtask
        .submittask(name, description, duetime, priority, localStorage.getItem('user_id'))
        .subscribe({
          next: (res: any) => {
            if (res === 'noerror') {
              this.alertMessage = 'Task created successfully!';
              this.alertType = 'success';
              this.router.navigateByUrl('/dashboard');
            }
          },
          error: (err: any) => {
            console.error('Error while creating task:', err);
            this.alertMessage = 'Failed to create task. Please try again.';
            this.alertType = 'error';
          }
        });
    } else {
      this.alertMessage = 'Please fill in all required fields.';
      this.alertType = 'error';
    }
  }
}
