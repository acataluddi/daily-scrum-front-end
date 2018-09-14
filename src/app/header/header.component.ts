import { Component, OnInit, Injectable } from '@angular/core';
import { Member } from '../model/member-model';
import { Http, } from '@angular/http';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { Project } from '../model/project-model';
import { ProjectService } from '../service/project.service';
import { Router, NavigationStart } from '@angular/router';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';

import { ActivatedRoute } from "@angular/router";
import { ProjectviewallService } from '../service/projectviewall.service';
import { ProjectUpdated } from '../model/projectupdated-model';
import { TaskPageAdminComponent } from '../task-page-admin/task-page-admin.component';


@Injectable({
  providedIn: 'root'
})

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
  email = localStorage.getItem("email");
  selected: Project = { projectId: "", projectName: "", members: [], projectDesc: '' };
  constructor(
    private viewallservice: ProjectviewallService,
    private socialAuthService: AuthService,
    private router: Router,
    private loginservice: LoginService,
    private projectService: ProjectService,
    private taskService: ProcessIndividualTaskService) { }

  ngOnInit() {
    this.callMethod1();
    this.initializeMember();
    this.getUserDetails();
    this.toggle(this.router.url);

    // this.projectService.getProjects(this.email)
    //     .subscribe(data => {
    //       this.setProjects(data);
    //       let projects = data ; 
    //       localStorage.setItem("projectId", projects[0].projectId)    
    //     });

    //     localStorage.setItem("currentProject", this.projectArray[0].projectName);
    // this.selected.projectName = localStorage.getItem("currentProject");
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        this.toggle(event['url']);
      }
    });

    
  }
  total: number
  projectupdated: ProjectUpdated;
  projectArray: ProjectUpdated[];
  callMethod1() {
    this.email = localStorage.getItem("email");
    this.viewallservice.getLoggedProjects(this.email)
      .subscribe(data => this.getloggedProjectsglobal(data));
  }
  getloggedProjectsglobal(Todays) {
    this.projectArray = Todays;
    this.selected.projectName = this.projectArray[0].projectName;

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

  getUserDetails() {
    this.member.email = localStorage.getItem("email");
    this.member.imageurl = localStorage.getItem("image");
  }

  setProjects(userProjects){
    this.projects = userProjects;
    this.selected = this.projects[0];
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
    this.selected = newProject;
   
    localStorage.setItem("currentProject", this.selected.projectName);
    this.taskService.changeProject(this.selected)
   
  }

  toggle(currenturl) {
    if (currenturl == '/dashboard') {
      this.title = 'Dashboard';
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
      document.getElementById("dash").style.visibility = "visible";
    } else if (currenturl == '/project') {
      this.title = 'New Project';
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
    } else if (currenturl == '/admin-view-all') {
      document.getElementById("dailyscrumclass").style.visibility = "hidden";
      document.getElementById("arrow").style.visibility = "hidden";
      document.getElementById("scrum").style.visibility = "visible";
      document.getElementById("dash").style.visibility = "hidden";
    }
    else {
      document.getElementById("dailyscrumclass").style.visibility = "visible";
      document.getElementById("arrow").style.visibility = "visible";
      document.getElementById("scrum").style.visibility = "hidden";
      document.getElementById("dash").style.visibility = "hidden";
    }
    console.log(currenturl);
  }

  openDashboardPage() {
    this.router.navigate(['/dashboard']);
  }
  show(e) {
    if (e.target.className == "arrow2" || e.target.className == "button desktop" ||
      e.target.className == "dp") {
      if (document.getElementById("signout").style.visibility == "hidden") {
        document.getElementById("signout").style.visibility = "visible";
      } else {
        document.getElementById("signout").style.visibility = "hidden";
      }
    }
    else if (e.target.id == "arrow" || e.target.id == "dailyscrumclass") {
      if (document.getElementById("projectlist").style.visibility == "hidden") {
        document.getElementById("projectlist").style.visibility = "visible";
      } else {
        document.getElementById("projectlist").style.visibility = "hidden";
      }
    }
    else {
      document.getElementById("projectlist").style.visibility = "hidden";
      document.getElementById("signout").style.visibility = "hidden";
    }
  }

}
