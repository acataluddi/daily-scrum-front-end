import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member-model';
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { Project } from '../model/project-model';
import { ProjectService } from '../project.service';
import { Router, NavigationStart } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { ProjectviewallService } from '../service/projectviewall.service';
import { ProjectUpdated } from '../model/projectupdated-model';
import { TaskPageAdminComponent } from '../task-page-admin/task-page-admin.component'

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
  email;

  selected: ProjectUpdated={projectId: '', projectDesc:'', projectName: 'Adastria Project I - Studio Application', members:[] }

  constructor(
    private viewallservice: ProjectviewallService,
    private socialAuthService: AuthService,
    private router: Router,
    private loginservice: LoginService,
    private http: Http,
    private projectService: ProjectService,
    private taskmock: TaskPageAdminComponent,
    private act: ActivatedRoute,

  ) { }

  ngOnInit() {
   
    this.callMethod1();
    this.initializeMember();
    this.getdata();
    this.toggle();
    localStorage.setItem("currentProject", this.projectArray[0].projectName);
    this.selected.projectName = localStorage.getItem("currentProject");
    

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
  // getNames() {
  //   this.http.get(this.viewallservice.apiURL)  
  //        .subscribe(
  //       (res: Response) => {
  //         this.projectArray = res.json();
  //         console.log("Hello");
  //         this.total = this.projectArray.length;
  //         console.log(this.projectArray);
  //       })

  // }

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
    this.selected = newProject;
    localStorage.setItem("currentProject", this.selected.projectName);
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
