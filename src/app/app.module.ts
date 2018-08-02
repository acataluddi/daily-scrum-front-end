import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { DailyStatusComponent } from './daily-status/daily-status.component';
import { DailyStatusAllUsersComponent } from './daily-status-all-users/daily-status-all-users.component';
import { IndividualTaskComponent } from './individual-task/individual-task.component';
import { IndividualMemberComponent } from './individual-member/individual-member.component';
import { AdminviewallComponent } from './adminviewall/adminviewall.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProjectComponent,
    DailyStatusComponent,
    DailyStatusAllUsersComponent,
    IndividualTaskComponent,
    IndividualMemberComponent,
    AdminviewallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
