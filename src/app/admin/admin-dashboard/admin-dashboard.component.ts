import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, DoCheck {
  hrList: any[] = [];
  filteredHRs: any[] = [];

  searchText = '';
  selectedStatus = '';

  activeCount = 0;
  inactiveCount = 0;
  thisWeekCount = 0;

  ngOnInit(): void {
    this.loadHRs();
  }

  ngDoCheck(): void {
    this.applyFilters();
  }

  loadHRs() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.hrList = users.filter((u: any) => u.role === 'HR');

    // Count active/inactive
    this.activeCount = this.hrList.filter(hr => hr.status === 'Active').length;
    this.inactiveCount = this.hrList.filter(hr => hr.status === 'Inactive').length;

    // Count HRs added in last 7 days
    this.thisWeekCount = this.hrList.filter(hr => {
      const createdDate = new Date(hr.createdAt || hr.createdAtDate || hr.created || hr.date || Date.now()); // fallback
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return createdDate >= oneWeekAgo;
    }).length;

    this.applyFilters();
  }


  applyFilters() {
    this.filteredHRs = this.hrList.filter((hr) => {
      const matchesSearch =
        hr.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        hr.email.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = this.selectedStatus ? hr.status === this.selectedStatus : true;

      return matchesSearch && matchesStatus;
    });
  }

  toggleStatus(user: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === user.email);
    if (index !== -1) {
      users[index].status = users[index].status === 'Active' ? 'Inactive' : 'Active';
      localStorage.setItem('users', JSON.stringify(users));
      this.loadHRs();
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
