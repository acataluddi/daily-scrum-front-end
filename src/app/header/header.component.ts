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

  selected: Project = {
    "projectId":"4092018122459",
    "members":[
       {
          "email":"ronyc@qburst.com",
          "role":"Manager"
       },
       {
          "email":"neerajd@qburst.com",
          "role":"Developer"
       },
       {
          "email":"nisha@qburst.com",
          "role":"Developer"
       },
       {
          "email":"arathi@qburst.com",
          "role":"Team Lead"
       },
       {
          "email":"sanjo@qburst.com",
          "role":"Developer"
       },
       {
          "email":"athiram@qburst.com",
          "role":"Developer"
       },
       {
          "email":"sruthy@qburst.com",
          "role":"Tester"
       },
       {
          "email":"nithaa@qburst.com",
          "role":"Manager"
       },
       {
          "email":"sunil@qburst.com",
          "role":"Manager"
       },
       {
          "email":"nithin@qburst.com",
          "role":"Tester"
       },
       {
          "email":"akhils@qburst.com",
          "role":"Team Lead"
       }
    ],
    "projectName":"FR Project VIII - EU",
    "projectDesc":"This project is to customize the existing Taiwanese FR Single Page Application to get it readied for release in EU region with French, German and English language support and some other functional changes in web and cms."
  };
  constructor(
    private socialAuthService: AuthService,
    private router: Router,
    private loginservice: LoginService,
    private projectService: ProjectService,
    private act: ActivatedRoute) { }

  ngOnInit() {
    this.initializeMember();
    this.getdata();
    this.toggle();
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        if (event['url'] === '/dashboard') {
          this.title = 'Dashboard';
          document.getElementById("dailyscrumclass").style.visibility = "hidden";
          document.getElementById("arrow").style.visibility = "hidden";
          document.getElementById("scrum").style.visibility = "visible";
          document.getElementById("dash").style.visibility = "visible";
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
          document.getElementById("dash").style.visibility = "hidden";
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
    this.selected.projectName = newProject;
  }

  toggle() {
    if (this.router.url == '/dashboard') {
      this.title = 'Dashboard';
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
    } else if (this.router.url == '/project') {
      this.title = 'New Project';
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
    } else if (this.router.url == '/admin-view-all') {
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
    console.log(this.router.url);

  }
  openDashboardPage() {
    this.router.navigate(['/dashboard']);
  }
}
