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
    // this.initializeMember();
    this.member = this.loginservice.getMember();
    this.displayMember();
    localStorage.getItem("logged");
    
    
  }

  
  id = "";
  name = "";
  email = "";
  image = "";
  // token = "";
  displayMember() {
    this.id = this.member.employeeID;
    this.name = this.member.name;
    this.email = this.member.email;
    this.image = this.member.imageurl;
    // this.token = this.member.Token;
    
  }
}
