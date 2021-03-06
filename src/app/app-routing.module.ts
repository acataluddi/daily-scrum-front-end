import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ProjectComponent } from "./project/project.component";
import { DailyStatusComponent } from "./daily-status/daily-status.component";
import { AdminviewallComponent } from "./adminviewall/adminviewall.component";
import { AuthGuard } from './status.service';
import { TaskPageAdminComponent } from "./task-page-admin/task-page-admin.component";
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { GoalUserlistComponent } from './goal-userlist/goal-userlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardHeaderComponent, canActivate: [AuthGuard] },
  { path: 'daily-status/:projectId/:name', component: DailyStatusComponent, canActivate: [AuthGuard] },
  { path: 'admin-view-all', component: AdminviewallComponent, canActivate: [AuthGuard] },
  { path: 'goal', component: GoalUserlistComponent, canActivate: [AuthGuard] },
  { path: 'task-page-admin/:projectId/:name/:startdate', component: TaskPageAdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
