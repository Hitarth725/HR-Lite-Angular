import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  hrList: any[] = [];

  ngOnInit(): void {
    this.loadHRs();
  }

  loadHRs() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.hrList = users.filter((u: any) => u.role === 'HR');
  }

  toggleStatus(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === user.email);
    if (index !== -1) {
      users[index].status = users[index].status === 'Active' ? 'Inactive' : 'Active';
      localStorage.setItem('users', JSON.stringify(users));
      this.loadHRs(); // refresh UI
    }
  }

  deleteHR(email: string) {
    if (confirm('Are you sure you want to delete this HR?')) {
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter((u: any) => u.email !== email);
      localStorage.setItem('users', JSON.stringify(users));
      this.loadHRs();
    }
  }
}

// hr-dashboard.component.ts
@Component({
  selector: 'app-hr-dashboard',
  template: `<div class="p-5"><h2>Welcome HR 🧑‍💼</h2></div>`
})
export class HrDashboardComponent {}
