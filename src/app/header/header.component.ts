import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member-model';

import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { Project } from '../model/project-model';
import { ProjectService } from '../project.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  member: Member;
  image: String;
  projects: Project[];

  selected: Project = { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: 5 };
  constructor(private socialAuthService: AuthService,
    private loginservice: LoginService, private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.initializeMember();
    this.getdata();
  }

  initializeMember() {
    this.member = {
      employeeID: '',
      name: '',
      email: '',
      imageurl: '',
      userType: ''
    }

  }

  getdata() {
    this.member.email = localStorage.getItem("email");
    this.member.imageurl = localStorage.getItem("image");
    this.projects = this.projectService.getProjects();
  }

  getImage(): String {
    this.member.imageurl = localStorage.getItem("image");
    return this.member.imageurl;
  }
  logout() {
    this.socialAuthService.signOut();
    this.loginservice.logoutMember();
  }

  changeProject(newProject) {
    this.selected.name = newProject;
  }

}
