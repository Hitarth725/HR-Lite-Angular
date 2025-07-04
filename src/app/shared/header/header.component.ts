import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  userDropdownOpen = false;
  user: any;
  private userSubscription!: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Close dropdown when toggling mobile menu
    if (this.mobileMenuOpen) {
      this.userDropdownOpen = false;
    }
  }

  toggleUserDropdown(): void {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  logout(): void {
    if (confirm('Do you really want to logout?')) {
      this.userService.clearUser();
      this.userDropdownOpen = false;
      this.mobileMenuOpen = false;
      this.router.navigate(['/auth/login']);
    }
  }
}
