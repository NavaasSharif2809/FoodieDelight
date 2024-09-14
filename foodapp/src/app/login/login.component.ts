import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string | null = null;

  private readonly VALID_USERNAME = 'Admin';
  private readonly VALID_PASSWORD = 'Admin@123';

  constructor(private router: Router) { }

  onSubmit() {
    if (this.username === this.VALID_USERNAME && this.password === this.VALID_PASSWORD) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid Username or Password';
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
    }
  }

}
