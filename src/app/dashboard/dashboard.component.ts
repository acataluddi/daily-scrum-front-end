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
    private socialAuthService: AuthService) {

  }
  member: Member;
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
  flag = false;
  imageurl = [];
  UserType;

  
  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log("user:");
      console.log(user);
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            this.UserType = msg.userType;
            if (this.UserType === "Admin" || this.UserType === "Manager") {
              this.flag = true;
              console.log("flag:" + this.flag);
            }

          });
      }
    });

    this.dashboardservice.getMembers()
      .subscribe(membersArr => this.getMembers(membersArr));

    this.dashboardservice.getProjects()
      .subscribe(projectArr => this.getProjects(projectArr, this.memberArray));
  }

  getProjects(projectArr, memberArray): void {
    let x = 0;
    this.TotalProjectMembers[0] = 0;
    this.newproject = projectArr;
    this.memberArray = memberArray;
    this.noOfProjects = this.newproject.length;
    for (let i = 0; i < this.noOfProjects; i++) {

      this.noOfMembers[i] = this.newproject[i].members.length;
      this.TotalProjectMembers[i + 1] = this.TotalProjectMembers[i] + this.noOfMembers[i];

      for (let j = 0; j < this.noOfMembers[i]; j++) {

        for (let k = 0; k < this.TotalMembers; k++) {

          if (this.newproject[i].members[j].email == this.memberArray[k].email) {
            this.imageurl[x] = this.memberArray[k].imageurl;
            x = x + 1;
          }
        }
      }
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
    this.taskService.getSelectedProject(project)
    localStorage.setItem('currentProject', name)

    if (this.flag) {
      this.router.navigate(['/task-page-admin',projectId, name])
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