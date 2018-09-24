import { Component, OnInit, Injectable } from '@angular/core';
import { Member } from '../model/member-model';
import { Http, } from '@angular/http';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { Project } from '../model/project-model';
import { DashboardService } from '../service/dashboardservice.service';
import { Router, NavigationStart } from '@angular/router';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { ActivatedRoute } from "@angular/router";
import { ProjectviewallService } from '../service/projectviewall.service';
import { ProjectUpdated } from '../model/projectupdated-model';
import { TaskPageAdminComponent } from '../task-page-admin/task-page-admin.component';
import { Subscription } from 'rxjs';


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
  subscription: Subscription;
  sub;
  pid
  selected: Project = { projectId: "", projectName: "", projectDesc: "", members: [] }

  show_dailyscrum;
  show_arrow;
  show_scrum;
  show_dash;
  show_signout;
  show_projectlist;
  showTooltip;
  constructor(
    private viewallservice: ProjectviewallService,
    private socialAuthService: AuthService,
    private router: Router,
    private loginservice: LoginService,
    private projectService: DashboardService,
    private route: ActivatedRoute,
    private taskService: ProcessIndividualTaskService,
    private dashboardService: DashboardService) {
    this.subscription = taskService.selected1.subscribe(
      data => {
        this.setSelected(data)
      });

    this.subscription = dashboardService.getProjects().subscribe(data => {
      this.setProjects(data)
    });

  }

  ngOnInit() {
    this.showTooltip = false;
    this.show_dailyscrum = false
    this.show_arrow = false
    this.show_scrum = true
    this.show_dash = true
    this.show_signout = false
    this.show_projectlist = false

    if (this.router.url.search('daily-status/') || this.router.url.search('task-page-admin/')) {
      var name = localStorage.getItem("currentProject")
      console.log(name)
      this.selected.projectName = name;
    }
    this.initializeMember();
    this.getUserDetails();
    this.toggle(this.router.url);

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        console.log(event);
        this.toggle(event['url']);
      }
    });

    this.selected.projectName = localStorage.getItem("currentProject")
  }
  total: number

  initializeMember() {
    this.member = {
      employeeID: '',
      name: '',
      email: '',
      imageurl: '',
      userType: '',
      idToken: ''
    }
    this.title = '';
  }

  getUserDetails() {
    this.member.email = localStorage.getItem("email");
    this.member.imageurl = localStorage.getItem("image");
  }

  setProjects(userProjects) {
    this.projects = userProjects;
  }

  setSelected(projectSelected) {
    this.selected = projectSelected
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
    // var projectArray = this.projects
    // var result = null
    // for (var i = 0; i < projectArray.length; i++) { 
    //   if (projectArray[i].projectName == newProjectName) { 
    //     result = projectArray[i];
    //     console.log(result)
    //     break;
    //   } 
    // }
    
    // let obj = this.projects.find(a => a.projectName === newProjectName);
    
    // this.selected = result;
    // console.log(this.selected);
    localStorage.setItem("currentProject", this.selected.projectName);
    localStorage.setItem("projectId", this.selected.projectId);
    this.taskService.changeProject(this.selected);

  }

  toggle(currenturl) {
    if (currenturl == '/dashboard') {
      this.title = 'Dashboard';
      this.show_dailyscrum = false
      this.show_arrow = false
      this.show_scrum = true
      this.show_dash = true
    } else if (currenturl == '/project') {
      this.title = 'New Project';
      this.show_dailyscrum = false
      this.show_arrow = false
      this.show_scrum = true
    } else if (currenturl == '/admin-view-all') {
      this.show_dailyscrum = false
      this.show_arrow = false
      this.show_scrum = true
      this.show_dash = false
    }
    else {
      this.show_dailyscrum = true
      this.show_arrow = true
      this.show_scrum = false
      this.show_dash = false
    }
    console.log(currenturl);
  }

  openDashboardPage() {
    this.router.navigate(['/dashboard']);
  }
  show(e) {
    if (e.target.className == "arrow2" || e.target.className == "button desktop" ||
      e.target.className == "dp") {
      if (this.show_signout == false) {
        this.show_signout = true
      } else {
        this.show_signout = false
      }
    }
    else if (e.target.id == "arrow" || e.target.id == "dailyscrumclass") {
      if (this.show_projectlist == false) {
        this.show_projectlist = true
      } else {
        this.show_projectlist = false
      }
    }
    else {
      this.show_projectlist = false
      this.show_signout = false
    }
  }

  call(){
    console.log('called')
  }
}
