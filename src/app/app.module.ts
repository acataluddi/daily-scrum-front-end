import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { DailyStatusComponent } from './daily-status/daily-status.component';
import { IndividualTaskComponent } from './individual-task/individual-task.component';
import { AdminviewallComponent } from './adminviewall/adminviewall.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";
import { Ng2Webstorage } from 'ngx-webstorage';
import { AuthGuard } from './status.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TaskPageAdminComponent } from './task-page-admin/task-page-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { UserslistComponent } from './userslist/userslist.component';
import { FilterPipe } from './filter.pipe';
import { NavigationdataService } from './service/navigationdata.service'
import { AutosizeModule } from 'ngx-autosize';
import { FilterEmail } from './filterEmail.pipe';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { GoalsComponent } from './goals/goals.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { GoalUserlistComponent } from './goal-userlist/goal-userlist.component';
import { FeedbackFilterPipe } from './feedbacklistfilter.pipe';
import { UserListFilterPipe } from './UserListfilter.pipe';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { GoalMemberFilter } from './goalMemberFilter.pipe';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [{
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("967649209783-pi515k1vmqr1igmq535chm1o32hb7fet.apps.googleusercontent.com")
    }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProjectComponent,
    DailyStatusComponent,
    IndividualTaskComponent,
    AdminviewallComponent,
    TaskPageAdminComponent,
    HeaderComponent,
    UserslistComponent,
    FeedbackFilterPipe,
    FilterPipe,
    FilterEmail,
    UserListFilterPipe,
    DashboardHeaderComponent,
    GoalsComponent,
    FeedbackComponent,
    GoalUserlistComponent,
    AddGoalComponent,
    GoalMemberFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    SocialLoginModule,
    Ng2Webstorage,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    HttpClientModule,
    HttpModule,
    Ng2Webstorage,
    AutosizeModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    AuthGuard,
    NavigationdataService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
