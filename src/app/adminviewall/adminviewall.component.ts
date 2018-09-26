
import { Component, OnInit } from '@angular/core';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
    this.viewallservice.getMembers()
      .subscribe(membersArr => {
        this.getMembers(membersArr)
      });

    this.dashboardservice.getMembers()
      .subscribe(membersArr => { this.getTotalCount(membersArr) });

  }


  getTotalCount(membersArr) {
    this.memberArray = membersArr;
    this.total = this.memberArray.length;
  }

  getMembers(membersArr): void {
    this.memberArray = membersArr;
  }

  onChange(newType, mem: Member) {
    mem.userType = newType;
    this.viewallservice.putmember(mem)
      .subscribe((res: Response) => {
        console.log(res);
      })
  }

  getPagenum(pagenum) {
    this.viewallservice.getPageNum(pagenum);
    this.p = pagenum;
    this.viewallservice.getMembers()
      .subscribe(membersArr => this.getMembers(membersArr));
  }
}


