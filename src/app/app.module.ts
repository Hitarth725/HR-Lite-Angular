import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HrDashboardComponent } from './hr/hr-dashboard/hr-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AddMemberComponent } from './hr/add-member/add-member.component';
import { SalaryPipe } from './shared/salary.pipe';
import { HttpPageComponent } from './http/http-page/http-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AdminDashboardComponent,
    HrDashboardComponent,
    LoginComponent,
    AddMemberComponent,
    SalaryPipe,
    HttpPageComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
