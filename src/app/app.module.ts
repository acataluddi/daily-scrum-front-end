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
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";
import { Ng2Webstorage } from 'ngx-webstorage';
import { AuthGuard } from './status.service';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TaskPageAdminComponent } from './task-page-admin/task-page-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Response, Headers } from '@angular/http';
import { HeaderComponent } from './header/header.component';

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
    DailyStatusAllUsersComponent,
    IndividualTaskComponent,
    IndividualMemberComponent,
    AdminviewallComponent,
    TaskPageAdminComponent,
    HeaderComponent
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
    HttpClientModule,
    HttpModule,
    Ng2Webstorage
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
