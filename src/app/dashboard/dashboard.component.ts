import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  tasks: any[] = [];
  viewtask: boolean = false;
  viewtaskid: any;
  loading: boolean = false;  // Flag to show/hide loading spinner

  constructor(private auth: SupabaseService) {}

  ngOnInit(): void {
    this.fetchtasks();
  }

  // Fetch tasks
  fetchtasks() {
    this.loading = true;  // Show loading spinner while fetching tasks
    this.auth.fetchtask().subscribe({
      next: (response) => {
        this.tasks = response.data;
        console.log(response.data);
        this.viewtaskid = this.tasks[0]?.taskid;
        this.tasks.sort((a, b) => (a.priority < b.priority ? -1 : 1));
        console.log(this.tasks);
        this.loading = false;  // Hide loading spinner after fetching tasks
      },
      error: (err) => {
        console.log(err);
        this.loading = false;  // Hide loading spinner in case of error
      },
    });
  }

  // Delete task
  deletetaskcard(name: string) {
    const isConfirmed = window.confirm('Do you want to delete this task?');

    if (isConfirmed) {
      this.loading = true;  // Show loading spinner while deleting task
      this.auth.deletetask(name).subscribe({
        next: (res) => {
          console.log(res);
          if (res.error === null) {
            this.fetchtasks();  // Fetch updated tasks after deletion
          } else {
            console.log('Error occurred!');
          }
          this.loading = false;  // Hide loading spinner after deletion is done
        },
        error: (err) => {
          console.log(err);
          this.loading = false;  // Hide loading spinner in case of error
        },
      });
    } else {
      console.log('Task deletion cancelled.');
    }
  }

  closeviewtask() {
    this.viewtask = false;
  }
}
