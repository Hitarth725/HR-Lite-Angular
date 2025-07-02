import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = {
    email: '',
    password: ''
  };

  error = '';

  constructor(private router: Router) {}

  onLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const enteredEmail = this.form.email.trim().toLowerCase();

    const foundUser = users.find((u: any) =>
      u.email === enteredEmail && u.password === this.form.password
    );

    if (!foundUser) {
      this.error = 'Invalid credentials. Try again.';
      return;
    }

    if (foundUser.status !== 'Active') {
      this.error = 'User is inactive. Contact admin.';
      return;
    }

    // Save session
    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    // Redirect
    if (foundUser.role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (foundUser.role === 'HR') {
      this.router.navigate(['/user-dashboard']);
    }
  }
}
