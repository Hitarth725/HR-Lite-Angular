import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { UserService } from '../../shared/service/user.service';

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

  toastMessage = '';
  isLoading = false;

  constructor(private router: Router, private userService: UserService) {}

  onLogin() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    
    // Simulate API call delay
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const enteredEmail = this.form.email.trim().toLowerCase();
      
      const foundUser = users.find((u: any) => 
        u.email === enteredEmail && u.password === this.form.password
      );

      if (!foundUser) {
        this.showToast('Invalid email or password');
        this.isLoading = false;
        return;
      }

      if (foundUser.status !== 'Active') {
        this.showToast('Account is inactive. Please contact support.');
        this.isLoading = false;
        return;
      }
      
      // Update current user in shared service
      this.userService.setUser(foundUser);
      // Save session
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      // Redirect to stored route or fallback based on role
      const returnUrl = localStorage.getItem('returnUrl');
      localStorage.removeItem('returnUrl');

      if (returnUrl) {
        this.router.navigateByUrl(returnUrl);
      } else {
        const route = foundUser.role === 'Admin' ? '/admin-dashboard' : '/user-dashboard';
        this.router.navigate([route]);
      }
      this.isLoading = false;
    }, 1000);
  }

  showToast(msg: string) {
    this.toastMessage = msg;
    setTimeout(() => this.toastMessage = '', 3000);
  }
}