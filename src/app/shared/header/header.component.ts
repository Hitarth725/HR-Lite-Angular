import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any;

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout() {
    if (confirm('Do you really want to logout?')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/auth/login']);
    }
  }
}
