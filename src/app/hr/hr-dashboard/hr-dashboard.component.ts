// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-hr-dashboard',
//   templateUrl: './hr-dashboard.component.html',
//   styleUrls: ['./hr-dashboard.component.scss']
// })
// export class HrDashboardComponent implements OnInit {
//   employeeList: any[] = [];
//   currentUser: any;

//   ngOnInit(): void {
//     this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
//     const employees = JSON.parse(localStorage.getItem('employees') || '[]');
//     this.employeeList = employees.filter((e: any) => e.addedBy === this.currentUser.email);
//   }
// }

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {
  employeeList: any[] = [];
  filteredEmployees: any[] = [];

  currentUser: any;
  searchText = '';
  selectedRole = '';
  showActiveOnly = false;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employeeList = employees.filter((e: any) => e.addedBy === this.currentUser.email);
    this.applyFilters();
  }

  ngDoCheck(): void {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEmployees = this.employeeList.filter(emp => {
      const matchesSearch =
        emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        emp.email?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesRole = this.selectedRole ? emp.role === this.selectedRole : true;
      const matchesStatus = this.showActiveOnly ? emp.status === 'Active' : true;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }
}

