import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  tasks: any[] = []; // All tasks
  filteredTasks: any[] = []; // Tasks filtered by priority
  selectedPriority: string = 'All'; // Current priority filter
  loading: boolean = false;

  constructor(private auth: SupabaseService, private router: Router) { }

  ngOnInit(): void {
    this.fetchtasks();
  }

  // Fetch tasks from the server
  fetchtasks() {
    this.loading = true;
    this.auth.fetchtask().subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.filteredTasks = this.tasks; // Initialize with all tasks
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        alert('Failed to fetch tasks. Please try again later.'); // User-friendly error
      },
    });
  }

  // Filter tasks by priority
  filterTasks(priority: string) {
    this.selectedPriority = priority;
    this.filteredTasks =
      priority === 'All'
        ? this.tasks
        : this.tasks.filter((task) => task.priority === priority);
  }

  // Delete a task
  deletetaskcard(taskId: string) {
    const isConfirmed = window.confirm('Do you want to delete this task?');
    if (isConfirmed) {
      this.loading = true;
      this.auth.deletetask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task.taskid !== taskId);
          this.filterTasks(this.selectedPriority); // Reapply filter
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
    }
  }

  // Logout the user
  logout() {
    const isConfirmed = window.confirm('Are you sure you want to logout?');
    if (isConfirmed) {
      this.auth.logout().subscribe({
        next: () => {
          localStorage.removeItem('user_id');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Logout failed', err);
        },
      });
    }
  }
}