import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router , private loginservice: LoginService) { }

  member: Member;
  loggedin;
  
  
  ngOnInit() {
    this.member = this.loginservice.getMember();
    this.displayMember();
    localStorage.getItem("logged");   
  }
  
  id = "";
  name = "";
  email = "";
  userType = "";
  displayMember() {
    this.id = this.member.memberID;
    this.name = this.member.name;
    this.email = this.member.email;
    this.userType = this.member.userType;    
  }
}
