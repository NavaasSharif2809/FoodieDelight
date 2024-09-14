import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  logout() {
    // Perform logout logic here
    // For example, clear user session and redirect to login page
     sessionStorage.clear();
    // localStorage.clear();
    this.router.navigate(['/login']);
  }

}
