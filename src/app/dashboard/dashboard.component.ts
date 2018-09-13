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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router, private loginservice: LoginService, private dashboardservice: DashboardService, private http: Http,
    private viewallservice: AdminviewallserviceService, private projectService: ProjectService) {

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
  flag = true;
  imageurl = [];


  private getURL = "http://localhost:8080/DailyScrum/ProjectController";
  ngOnInit() {
    if (localStorage.getItem("userType") != "Admin" && localStorage.getItem("userType") != "Manager") {
      this.flag = false;
    }
    this.viewallservice.getMembers()
      .subscribe(membersArr => this.getMembers(membersArr));

    this.dashboardservice.getProjects()
      .subscribe(projectArr => this.getProjects(projectArr, this.memberArray));


  }

  getProjects(projectArr, memberArray): void {
    let x = 0;
    this.TotalProjectMembers[0] = 0;
    this.newproject = projectArr;
    this.memberArray = memberArray;
    console.log(this.newproject);
    this.noOfProjects = this.newproject.length;
    for (let i = 0; i < this.noOfProjects; i++) {

      this.noOfMembers[i] = this.newproject[i].members.length;
      this.TotalProjectMembers[i + 1] = this.TotalProjectMembers[i] + this.noOfMembers[i];
      console.log(this.TotalProjectMembers[i + 1]);
      console.log(this.noOfMembers[i]);

      for (let j = 0; j < this.noOfMembers[i]; j++) {

        for (let k = 0; k < this.TotalMembers; k++) {

          if (this.newproject[i].members[j].email == this.memberArray[k].email) {
            this.imageurl[x] = this.memberArray[k].imageurl;
            console.log(this.imageurl[x]);
            x = x + 1;
          }
        }
      }
    }
    console.log(this.imageurl);
  }

  getMembers(membersArr): void {
    this.memberArray = membersArr;
    console.log(this.memberArray);
    this.TotalMembers = this.memberArray.length;
  }

  getRandomColor() {
    var colors = ['rgb(12, 33, 93)', 'rgb(255, 177, 166)', 'rgb(63, 205, 195)'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  openDailyStatus() {


    if (localStorage.getItem("userType") === 'Admin' || localStorage.getItem("userType") === 'Manager') {
      this.router.navigateByUrl('/task-page-admin');
    }
    else {
      this.router.navigate(['/daily-status']);
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
