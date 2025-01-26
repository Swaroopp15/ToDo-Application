import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: false,

  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  updateform: FormGroup;
  oldtaskid: string = ''; 
  oldtask: any = '';
  loading: boolean = true; 

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 5000); 
  }

  constructor(
    public taskbuilder: FormBuilder,
    private supabase: SupabaseService,
    private router: Router,
    private actrouter: ActivatedRoute
  ) {

    const res = this.actrouter.snapshot.queryParams;
    this.oldtaskid = res['task']; 
    console.log('Task ID:', this.oldtaskid);

    this.updateform = this.taskbuilder.group({
      name: ['', Validators.required],
      priority: ['', Validators.required],
      description: [''],
      duetime: ['']
    });

    this.supabase.fetchwithid(this.oldtaskid).subscribe({
      next: (res) => {
        console.log('Fetched Task Data:', res);
        if (res.data) {
          this.oldtask = res.data[0];
          this.updateform.setValue({
            name: this.oldtask.name || '',
            priority: this.oldtask.priority || '',
            description: this.oldtask.description || '',
            duetime: this.oldtask.duetime || ''
          });
        } else {
          console.error('No task data found');
        }
      },
      error: (err) => console.error('Error fetching task:', err),
      complete: () => (this.loading = false) 
    });
  }

  update() {
    let error = false;
    this.supabase
      .updatetask(
        this.updateform.value.name,
        this.updateform.value.description,
        this.updateform.value.duetime,
        this.updateform.value.priority,
        this.oldtaskid 
      )
      .subscribe({
        next: (res) => console.log('Update Response:', res),
        error: (err) => {
          console.error('Update Error:', err);
          error = true;
        },
        complete: () => {
          if (!error) {
            this.router.navigate(['/dashboard']); 
          } else {
            alert('Update failed!');
          }
        }
      });
  }
}
