import { Component, OnInit } from '@angular/core';
import { Project, newProject } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';
import { PROJECTS } from "../mockProjects";
import {HttpClient} from "@angular/common/http";
import {Http,Response} from "@angular/http";
import {DashboardService } from "../service/dashboardservice.service";
import { AdminviewallserviceService } from '../service/adminviewallservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router, private loginservice: LoginService,private dashboardservice:DashboardService, private http:Http,
  private viewallservice:AdminviewallserviceService) { }
  member: Member;
  loggedin;
  projectName = "Daily Scrum";
  noOfProjects = null;
  project: Project;
  TotalMembers = null;
  newproject:newProject[];
  memberArray:Member[];
  projectArray:newProject[];
  noOfMembers = [];
  projects = PROJECTS;
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
  
  getProjects(projectArr,memberArray): void {
    this.newproject = projectArr;
    this.memberArray = memberArray;
    console.log(this.newproject);
    this.noOfProjects = this.newproject.length;
    // console.log(this.noOfProjects);
    // console.log(this.memberArray[0].imageurl);
    // for (let i = 0; i < this.noOfProjects; i++) {
      this.noOfMembers[0] = this.newproject[0].members.length; 
      // console.log(this.noOfMembers[i]);
      for (let j=0; j< this.noOfMembers[0];j++){

        for (let k=0;k<this.TotalMembers;k++){
         if ( this.newproject[0].members[j].email== this.memberArray[k].email){
            this.imageurl[j]= this.memberArray[k].imageurl;
            console.log(this.imageurl[j]);
            // break;
         }
        }
        
      }
    }
  // }

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
    this.router.navigate(['/daily-status']);
  }
  gotoUsersList() {

    this.router.navigateByUrl('/admin-view-all');

  }

  EditProject() {
    this.router.navigateByUrl('/project');
  }

  DeleteProject(projectId) {
    console.log("Hello");
    console.log(projectId);
    this.dashboardservice.deleteProjects(projectId)
    .subscribe(() => console.log("user deleted"));
    console.log("hello")
    // this.router.navigate(["/admin-view-all"]);
  }
}
