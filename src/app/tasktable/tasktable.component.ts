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

  constructor(private taskbuilder: FormBuilder, private createtask: SupabaseService, private router: Router) {
    this.taskform = this.taskbuilder.group({
      name: ['', Validators.required],
      priority: ['', Validators.required],
      description: [''],
      duetime: ['']
    });
  }

  newtask() {
    if (this.taskform.valid) {
      console.log(this.taskform.value);

      this.createtask.submittask(this.taskform.value.name, this.taskform.value.description, this.taskform.value.duetime, this.taskform.value.priority, localStorage.getItem('user_id'))
        .then((res: any) => {
          console.log(res);
          if (res === 'noerror') this.router.navigateByUrl('/dashboard');
        }).catch((err: any) => {
          console.log(err);
        })

    }
  }


}
