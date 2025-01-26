import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: false,

  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  @Input() message!: string;
  @Input() type!: string; // success, error, warning, info

  get alertClass(): string {
    switch (this.type) {
      case 'success':
        return 'bg-green-500 border-l-4 border-green-700';
      case 'error':
        return 'bg-red-500 border-l-4 border-red-700';
      case 'warning':
        return 'bg-yellow-500 border-l-4 border-yellow-700';
      case 'info':
        return 'bg-blue-500 border-l-4 border-blue-700';
      default:
        return 'bg-gray-500 border-l-4 border-gray-700';
    }
  }
}
