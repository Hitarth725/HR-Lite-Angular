import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


// export const authGuard: CanActivate = (route, state) => {
//   return true;
// };
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user) return true;

    this.router.navigate(['/auth/login']);
    return false;
  }
}