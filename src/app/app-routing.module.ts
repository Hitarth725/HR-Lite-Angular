import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from './hr/hr-dashboard/hr-dashboard.component';
import { AddMemberComponent } from './hr/add-member/add-member.component';
import { HttpPageComponent } from './http/http-page/http-page.component'; 
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'user-dashboard', component: HrDashboardComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: 'add-member', component: AddMemberComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: 'http', component: HttpPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
