import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';
import { DashboardService } from "../service/dashboardservice.service";
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { ProjectService } from "../service/project.service";
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
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            this.UserType = msg.userType;
            if (this.UserType === "Admin") {
              this.flag1 = true;
              this.flag2 = true;
            } else if (this.UserType === "Manager") {
              this.flag2 = true;
            }

          });
      }
    });

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
      this.TotalProjectMembers[i + 1] = this.TotalProjectMembers[i] + this.noOfMembers[i];
    }
  }

  getMembers(membersArr): void {
    this.memberArray = membersArr;
    this.TotalMembers = this.memberArray.length;

  }
  openDailyStatus(project) {
    var projectId = project.projectId
    var name = project.projectName
    this.taskService.getSelectedProject(project)
    localStorage.setItem('currentProject', name)
    localStorage.setItem("projectId", projectId)

    if (this.flag2) {
      this.router.navigate(['/task-page-admin', projectId, name])
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
