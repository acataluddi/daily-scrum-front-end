import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { ProjectComponent } from "./project/project.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DailyStatusComponent } from "./daily-status/daily-status.component";
import { DailyStatusAllUsersComponent } from "./daily-status-all-users/daily-status-all-users.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'daily-status', component: DailyStatusComponent },
  { path: 'daily-status-all-users', component: DailyStatusAllUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
