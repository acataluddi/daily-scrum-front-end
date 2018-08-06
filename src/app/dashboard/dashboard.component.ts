import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router , private loginservice: LoginService) { }

  member: Member;
  loggedin = false;
  
  
  ngOnInit() {
    // this.initializeMember();
    this.member = this.loginservice.getMember();
    this.displayMember();
    
    this.loggedin = this.loginservice.getLoginStatus();
    console.log(this.loggedin);
    
  }

  
  id = "";
  name = "";
  email = "";
  image = "";
  token = "";
  displayMember() {
    this.id = this.member.Id;
    this.name = this.member.Name;
    this.email = this.member.Email;
    this.image = this.member.Imageurl;
    this.token = this.member.Token;
    
  }
}
