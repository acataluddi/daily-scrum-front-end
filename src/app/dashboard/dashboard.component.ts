import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../login.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loginservice: LoginService) { }

  member: Member;
  ngOnInit() {
    // this.initializeMember();
    this.member = this.loginservice.getMember();
    this.displayMember();
    // (<any>window).signOut = this.signOut;
  }
  id = "";
  name = "";
  email = "";
  image = "";
  displayMember() {
    this.id = this.member.employee_id;
    this.name = this.member.name;
    this.email = this.member.email;
    this.image = this.member.imageurl;
  }


  // signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
}
