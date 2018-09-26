import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Http, Response } from "@angular/http";
import { DashboardService } from "../service/dashboardservice.service";
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { ProjectService } from "../service/project.service";
import { HeaderComponent } from '../header/header.component';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { AdminviewallComponent } from '../adminviewall/adminviewall.component';
import { AuthService } from 'angular-6-social-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,
    private loginservice: LoginService,
    private dashboardservice: DashboardService,
    private taskService: ProcessIndividualTaskService,
    private viewallservice: AdminviewallserviceService,
    private projectService: ProjectService,
    private viewallcomponent: AdminviewallComponent,
    private socialAuthService: AuthService) {

  }
  member: Member;
  LoggedinMember: Member;
  loggedin;
  projectName = "Daily Scrum";
  noOfProjects = null;
  project: Project;
  TotalMembers = null;
  TotalProjectMembers = [];
  newproject: Project[];
  memberArray: Member[];
  projectArray: Project[];
  noOfMembers = [];
  flag1 = false;
  flag2 = false;
  imageurl = [];
  UserType: string;


  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log("user:");
      console.log(user);
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            this.UserType = msg.userType;
            if (this.UserType === "Admin") {
              this.flag1 = true;
              this.flag2 = true;
              console.log("flag:" + this.flag1);
            } else if (this.UserType === "Manager") {
              this.flag2 = true;
            }

          });
      }
    });

    // this.dashboardservice.getMembers()
    // .subscribe(membersArr => this.getMembers(membersArr));

    this.dashboardservice.getProjects()
      .subscribe(projectArr => {
        if (projectArr != null) {
          this.getProjects(projectArr)
        }
      });
  }

  getProjects(projectArr): void {
    let x = 0;
    this.TotalProjectMembers[0] = 0;
    this.newproject = projectArr;
    this.projectService.setProjectArray(this.newproject);
    if (this.newproject !== undefined) {
      this.noOfProjects = this.newproject.length;
    }
    for (let i = 0; i < this.noOfProjects; i++) {

      this.noOfMembers[i] = this.newproject[i].members.length;
      console.log('number' + this.noOfMembers);

      this.TotalProjectMembers[i + 1] = this.TotalProjectMembers[i] + this.noOfMembers[i];
    }
  }

  getMembers(membersArr): void {
    this.memberArray = membersArr;
    console.log(this.memberArray);
    this.TotalMembers = this.memberArray.length;

  }
  openDailyStatus(project) {
    var projectId = project.projectId
    var name = project.projectName
    var startdate = project.startDate;
    this.taskService.getSelectedProject(project)
    localStorage.setItem('currentProject', name)
    localStorage.setItem("projectId", projectId)
    localStorage.setItem("startDate", startdate)

    if (this.flag2) {
      this.router.navigate(['/task-page-admin', projectId, name, startdate])
    } else {
      this.router.navigate(['/daily-status', projectId, name]);
    }
  }

  gotoUsersList() {

    this.router.navigateByUrl('/admin-view-all');

  }

  AddProject() {

    this.projectService.setRequestType("add");
    this.router.navigateByUrl('/project');
  }

  EditProject(projectDetail) {
    this.projectService.setRequestType("update");
    this.projectService.setProjectToBeUpdated(projectDetail)
    this.router.navigateByUrl('/project');
  }

  DeleteProject(projectId) {

    this.dashboardservice.deleteProjects(projectId)
      .subscribe((msg) => console.log("Project Deleted"));
    window.location.reload();

  }
}
