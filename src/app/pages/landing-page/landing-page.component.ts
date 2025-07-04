import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user && user.status === 'Active') {
      // Redirect based on role
      if (user.role === 'Admin') {
        this.router.navigate(['/dashboard']);
      } else if (user.role === 'HR') {
        this.router.navigate(['/hr-dashboard']);
      }
    }
  }
}
