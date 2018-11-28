import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(public router: Router,
    private modalService: BsModalService,
    private loginservice: LoginService,
    private dashboardservice: DashboardService,
    private taskService: ProcessIndividualTaskService,
    private navservice: NavigationdataService,
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
  operation: string;
  dropdownVisibilityFlag: boolean;
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
    this.dropdownVisibilityFlag = false;
    this.dashboardservice.getProjects()
      .subscribe(projectArr => {
        if (projectArr != null) {
          this.getProjects(projectArr)
        }
      });
  }

  InitializeShow() {
    for (let i = 0; i < this.noOfProjects; i++) {

      this.show[i] = 0;
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
  HideMenuDropDown() {
    if (this.dropdownVisibilityFlag == true) {
      this.dropdownVisibilityFlag = false;
    }
  }
  getMembers(membersArr): void {
    this.memberArray = membersArr;
    this.TotalMembers = this.memberArray.length;

  }
  openDailyStatus(project) {    
    this.saveSelectedDate();
    var projectId = project.projectId
    var name = project.projectName
    var myId = localStorage.getItem("email")
    var inProject;
    for (let member of project.members) {
      if (member.isActive) {
        var firstMember = member
        break
      }
    }
    var startdate = project.startDate;

    var myMemobj = project.members.find(function (element) {
      return element.email == myId;
    });
    if (myMemobj != null) {
      inProject = true
    } else {
      inProject = false
    }
    this.taskService.getSelectedProject(project)
    localStorage.setItem('currentProject', name)
    localStorage.setItem("projectId", projectId)
    localStorage.setItem("startDate", startdate)

    if (this.flag2 && this.flag1) {
      if (inProject) {
        this.setLocalStorage(myMemobj)
      } else {
        this.setLocalStorage(firstMember)
      }
      this.router.navigate(['/task-page-admin', projectId, name, startdate])
    } else {
      this.setLocalStorage(myMemobj)
      this.navservice.changedata(myMemobj)
      if (this.flag2) {
        this.router.navigate(['/task-page-admin', projectId, name, startdate]);
      } else {
        this.router.navigate(['/daily-status', projectId, name]);
      }
    }

  }

  setLocalStorage(memobj) {
    localStorage.setItem('taskEmail', memobj.email)
    localStorage.setItem('taskName', memobj.name)
    localStorage.setItem('addedDate', memobj.addedDate)
    localStorage.setItem("deletedDate", memobj.deletedDate)
    localStorage.setItem("isActive", memobj.isActive)
  }

  gotoUsersList() {
    this.router.navigateByUrl('/admin-view-all');
  }

  // AddProject() {
  //   this.operation = "AddProject";
  //   localStorage.setItem('currentOperation', this.operation);
  //   this.projectService.setRequestType("add");
  //   this.router.navigateByUrl('/project'); 
  // }

  EditProject(projectDetail) {
    this.operation = "EditProject";
    localStorage.setItem('currentOperation', this.operation);
    this.projectService.setRequestType("update");
    this.projectService.setProjectToBeUpdated(projectDetail)
    this.router.navigateByUrl('/project');


  }
  deleteId;
  DeleteProject() {
    this.dashboardservice.deleteProjects(this.deleteId)
      .subscribe((msg) => console.log("Project Deleted"));
    window.location.reload();

  }

  click(index) {
    if (this.show[index] == 1) {
      this.show[index] = 0;
    }
    else {
      this.show[index] = 1;
      for (let i = 0; i < this.noOfProjects; i++) {
        if (i != index) {
          this.show[i] = 0;
        }
      }
    }
  }

  openModal(template: TemplateRef<any>, projectId) {
    this.deleteId = projectId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef.hide();
  }

  saveSelectedDate(){
    var d = new Date();
    var nday = '';
    var nmonth = '';
    var selectedDate = '';
    if (d.getDate() < 10) {
      nday += '0' + d.getDate();
    } else {
      nday += d.getDate();
    }
    if ((d.getMonth() + 1) < 10) {
      nmonth += '0' + (d.getMonth() + 1);
    } else {
      nmonth += (d.getMonth() + 1);
    }
    selectedDate += nday + '-' + nmonth + '-' + d.getFullYear();
    localStorage.setItem("selectedDate", selectedDate);
  }
}
