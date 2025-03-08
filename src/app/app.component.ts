import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';
  isOnline = navigator.onLine;

  @HostListener('window:online', ['$event'])
  setOnline() {
    this.isOnline = true;
  }

  @HostListener('window:offline', ['$event'])
  setOffline() {
    this.isOnline = false;
  }
}
