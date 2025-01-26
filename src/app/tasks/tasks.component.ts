import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: false,

  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input() val: any;
  @Output() delete = new EventEmitter();
  view: boolean = false;
  alert: boolean = false;
  alertType: string = 'info';
  alertMessage: string = '';

  constructor(private router: Router) { }

  deletetask() {
    this.delete.emit(this.val.taskid);
    this.showAlert('success', 'Task completed successfully!');
  }

  updatetask() {
    this.router.navigate(['/re-task'], {
      queryParams: { task: this.val.taskid },
    });
    this.showAlert('info', 'Redirecting to task update...');
  }

  viewtask() {
    this.view = true;
    console.log('Dialog opened:', this.view);
  }

  closetask() {
    this.view = false;
    console.log('Dialog closed:', this.view);
  }


  showAlert(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }
}
