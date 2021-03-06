
import { Component, OnInit } from '@angular/core';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';
import { Response, } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DashboardService } from "../service/dashboardservice.service";
import { AuthService } from 'angular-6-social-login';
import { LoginService } from "../service/login.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-adminviewall',
  templateUrl: './adminviewall.component.html',
  styleUrls: ['./adminviewall.component.css']
})

export class AdminviewallComponent implements OnInit {
  member: Member;
  memberArray: Member[];
  p: number;
  total: number;
  flag = false;
  filterMember: Member;

  constructor(
    public router: Router,
    private dashboardservice: DashboardService,
    private viewallservice: AdminviewallserviceService,
    private http: HttpClient,
    private socialAuthService: AuthService,
    private loginservice: LoginService) {
  }

  userTypes = ['Admin', 'Manager', 'User'];

  ngOnInit() {
    this.AuthenticationUser();
  }

  AuthenticationUser() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            msg.userType;
            if (msg.userType === "Admin") {
              this.flag = true;
            }
          });
      }
    });

    this.dashboardservice.getMembers()
      .subscribe(membersArr => { this.getTotalCount(membersArr) });
  }

  getTotalCount(membersArr) {
    this.memberArray = membersArr;
    this.total = this.memberArray.length;
    this.member = membersArr;
  }

  onChange(newType, mem: Member) {
    mem.userType = newType;
    this.viewallservice.putmember(mem)
      .subscribe((res: Response) => {
        console.log(res);
      })
  }
}


