import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {
  employeeList: any[] = [];
  currentUser: any;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employeeList = employees.filter((e: any) => e.addedBy === this.currentUser.email);
  }
}
