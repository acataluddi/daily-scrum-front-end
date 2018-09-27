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
import { NavigationdataService } from '../service/navigationdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router,
    private loginservice: LoginService,
    private navservice: NavigationdataService,
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
  show = [];
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

  InitializeShow() {
    for (let i=0; i<this.noOfProjects; i++) {

      this.show[i] = 0;
      console.log(this.show[i])
    }
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
    var myId = localStorage.getItem("email")
    for (let member of project.members) {
      if (member.isActive) {
        var firstMember = member
        break
      }
    }
    var taskemail = firstMember.email
    var taskName = firstMember.name
    var startdate = project.startDate;
    var addDate = firstMember.addDate;
    var deleteDate = firstMember.deleteDate;
    var isActive = firstMember.isActive;

    var myMemobj = project.members.find(function (element) {
      return element.email == myId;
    });
    // console.log(myMemobj)
    if(myMemobj != null){
      var myEmail = myMemobj.email
      var myName = myMemobj.name
      var myAddDate = myMemobj.addDate
      var myDeleteDate = myMemobj.deleteDate
      var myIsActive = myMemobj.isActive
      this.navservice.updateDummy(myMemobj)
    }


    this.taskService.getSelectedProject(project)
    localStorage.setItem('currentProject', name)
    localStorage.setItem("projectId", projectId)
    localStorage.setItem("startDate", startdate)

    if (this.flag2 && this.flag1) {
      localStorage.setItem('taskEmail', taskemail)
      localStorage.setItem('taskName', taskName)
      localStorage.setItem('addDate', addDate)
      localStorage.setItem("deleteDate", deleteDate)
      localStorage.setItem("isActive", isActive)
      this.router.navigate(['/task-page-admin', projectId, name, startdate])
    } else {
      
      localStorage.setItem('taskEmail', myId)
      localStorage.setItem('taskName', myName)
      localStorage.setItem('addDate', myAddDate)
      localStorage.setItem("deleteDate", myDeleteDate)
      localStorage.setItem("isActive", myIsActive)
      if (this.flag2){
        this.router.navigate(['/task-page-admin', projectId, name, startdate]);
      } else{
        this.router.navigate(['/daily-status', projectId, name]);
      }
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
  click(index) {
    let i: number = index
    console.log(this.show[i]);
    this.show[index] = !this.show[index]; 
  }
}
