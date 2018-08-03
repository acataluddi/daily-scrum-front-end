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
