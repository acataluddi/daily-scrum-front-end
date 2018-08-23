import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { ProjectComponent } from "./project/project.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DailyStatusComponent } from "./daily-status/daily-status.component";
import { DailyStatusAllUsersComponent } from "./daily-status-all-users/daily-status-all-users.component";
import { AdminviewallComponent } from "./adminviewall/adminviewall.component";
import {AuthGuard} from './status.service';
import { TaskPageAdminComponent} from "./task-page-admin/task-page-admin.component";

const routes: Routes = [
  { path: '', redirectTo: '/task-page-admin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  { path: 'daily-status', component: DailyStatusComponent, canActivate:[AuthGuard] },
  { path: 'daily-status-all-users', component: DailyStatusAllUsersComponent , canActivate:[AuthGuard] },
  { path: 'admin-view-all', component: AdminviewallComponent ,canActivate:[AuthGuard] },
  { path: 'task-page-admin', component:TaskPageAdminComponent, canActivate:[AuthGuard] },
  { path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
