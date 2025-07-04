import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (user && user.status === 'Active') {
      const expectedRole = route.data['role'];
      if (!expectedRole || user.role === expectedRole) {
        return true;
      }

      // Optional: Redirect if role is wrong
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Save attempted URL before redirecting
    localStorage.setItem('returnUrl', state.url);
    this.router.navigate(['/auth/login']);
    return false;
  }
}
