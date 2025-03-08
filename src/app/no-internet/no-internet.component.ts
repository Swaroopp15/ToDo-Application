import { Component } from '@angular/core';

@Component({
  selector: 'app-no-internet',
  standalone: false,
  
  templateUrl: './no-internet.component.html',
  styleUrl: './no-internet.component.css'
})
export class NoInternetComponent {

  reloadPage() {
    window.location.reload();
  }
  
}
