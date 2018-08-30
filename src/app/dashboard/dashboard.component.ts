import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';
import { PROJECTS } from "../mockProjects";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router, private loginservice: LoginService) { }
  member: Member;
  loggedin;
  projectName = "Daily Scrum";
  noOfProjects = 13;
  project: Project;
  projects = PROJECTS;
  ngOnInit() {
  }
  getRandomColor() {
   var colors = ['rgb(12, 33, 93)', 'rgb(255, 177, 166)', 'rgb(63, 205, 195)'];
 return colors[Math.floor(Math.random() * colors.length)];
  } 
  openDailyStatus(){
    this.router.navigate(['/daily-status']);
    }
}