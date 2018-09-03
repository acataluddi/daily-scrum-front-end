import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member-model';

import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { Project } from '../model/project-model';
import { ProjectService } from '../project.service';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  member: Member;
  image: String;
  projects: Project[];
  title: string;

  selected: Project = { name: "FR Project LXXXI - Core Order Management System", members: [], numberOfMembers: 5 };
  constructor(
    private socialAuthService: AuthService, 
    private route: Router,
    private loginservice: LoginService, 
    private projectService: ProjectService, 
    private act: ActivatedRoute) 
    { }

  ngOnInit() {
    this.initializeMember();
    this.getdata();
    this.toggle();
    this.route.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        if (event['url'] === '/dashboard') {
          this.title = 'Dashboard';
          document.getElementById("dailyscrumclass").style.visibility = "hidden";
          document.getElementById("arrow").style.visibility = "hidden";
          document.getElementById("scrum").style.visibility = "visible";
        } else if (event['url'] === '/project') {
          this.title = 'New Project';
          document.getElementById("dailyscrumclass").style.visibility = "hidden";
          document.getElementById("arrow").style.visibility = "hidden";
          document.getElementById("scrum").style.visibility = "visible";
        } else if (event['url'] === '/admin-view-all') {
          document.getElementById("dailyscrumclass").style.visibility = "hidden";
          document.getElementById("arrow").style.visibility = "hidden";
          document.getElementById("scrum").style.visibility = "visible";
          document.getElementById("dash").style.visibility = "hidden";
        } else {
          document.getElementById("dailyscrumclass").style.visibility = "visible";
          document.getElementById("arrow").style.visibility = "visible";
          document.getElementById("scrum").style.visibility = "hidden";
        }
      }
    });

  }

  initializeMember() {
    this.member = {
      employeeID: '',
      name: '',
      email: '',
      imageurl: '',
      userType: ''
    }
    this.title = '';
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

  toggle() {
    if (this.route.url == '/dashboard') {
      this.title = 'Dashboard';
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
    } else if (this.route.url == '/project') {
      this.title = 'New Project';
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
    } else if (this.route.url == '/admin-view-all') {
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
      document.getElementById("dash").style.visibility = "hidden";
    }
     else {
      document.getElementById("dailyscrumclass").style.visibility = "visible";
      document.getElementById("arrow").style.visibility = "visible";
      document.getElementById("scrum").style.visibility = "hidden";
    }
    console.log(this.route.url);

  }
}
