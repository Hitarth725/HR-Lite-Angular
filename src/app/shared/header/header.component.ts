import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';  // ✅ Make sure path is correct

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    //Subscribe to currentUser$ for reactive updates
    this.userService.currentUser$.subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    if (confirm('Do you really want to logout?')) {
      this.userService.clearUser(); // ✅ Clear via service
      this.router.navigate(['/auth/login']);
    }
  }
}
