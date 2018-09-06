import { Component, OnInit } from '@angular/core';
import { Project, newProject } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';
import { PROJECTS } from "../mockProjects";
import {HttpClient} from "@angular/common/http";
import {Http,Response} from "@angular/http";
import {DashboardService } from "../service/dashboardservice.service"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router, private loginservice: LoginService,private dashboardservice:DashboardService, private http:Http) { }
  member: Member;
  loggedin;
  projectName = "Daily Scrum";
  noOfProjects = null;
  project: Project;
  newproject:newProject[];
  // Project:newProject;
  projectArray:newProject[];
  noOfMembers = [];
  projects = PROJECTS;
  flag = true;
  private getURL = "http://localhost:8080/DailyScrum/ProjectController";
  ngOnInit() {
    if (localStorage.getItem("userType") != "Admin" && localStorage.getItem("userType") != "Manager") {
      this.flag = false;
    }
    this.dashboardservice.getProjects()
      .subscribe(projectArr => this.getProjects(projectArr));

  }
  
  getProjects(projectArr): void {
    this.newproject = projectArr;
    console.log(this.newproject);
    this.noOfProjects = this.newproject.length;
    for (let i = 0; i < this.noOfProjects; i++) {
      this.noOfMembers[i] = this.newproject[i].members.length;
  
    }

    console.log(this.noOfMembers);
  }

  getRandomColor() {
    var colors = ['rgb(12, 33, 93)', 'rgb(255, 177, 166)', 'rgb(63, 205, 195)'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  openDailyStatus() {
    this.router.navigate(['/daily-status']);
  }
  gotoUsersList() {

    this.router.navigateByUrl('/admin-view-all');

  }
}
