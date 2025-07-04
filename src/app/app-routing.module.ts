import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from './hr/hr-dashboard/hr-dashboard.component';
import { AddMemberComponent } from './hr/add-member/add-member.component';
import { HttpPageComponent } from './http/http-page/http-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

// Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Public landing page
  { path: '', component: LandingPageComponent },

  // Auth pages
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },

  // Admin routes
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' }
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' }
  },

  // HR routes
  {
    path: 'user-dashboard',
    component: HrDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'HR' }
  },
  {
    path: 'add-member',
    component: AddMemberComponent,
    canActivate: [AuthGuard],
    data: { role: 'HR' }
  },

  // Shared authenticated route
  {
    path: 'http',
    component: HttpPageComponent,
    canActivate: [AuthGuard]
  },

  // Fallback route (404 redirect)
  { path: '**', redirectTo: '' } // redirect to LandingPage instead of login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
