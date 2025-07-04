import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  mobileMenuOpen = false;
  activeFaqIndex: number | null = null;

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

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
