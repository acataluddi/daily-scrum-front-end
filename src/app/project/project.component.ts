import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectmemberService } from "../service/projectmember.service";
import { Project, member } from "../model/project-model"
import { ProjectService } from "../service/project.service";
import {AuthService} from 'angular-6-social-login';
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild('des') 'des': ElementRef;

  project: Project;
  count: number;
  posted: number;
  lastMember: member;
  reqType: string;
  buttonText: string;
  pId;
  pName;
  pDesc;
  pMembers;

  public show1: boolean = true;
  public show2: boolean = true;
  showAddMember: boolean;

  constructor(private projectmemberservice: ProjectmemberService,
    public router: Router,
    private projectservice: ProjectService,
    private socialAuthService: AuthService, private loginservice: LoginService ) { }

  ngOnInit() {

    this.socialAuthService.authState.subscribe((user) => {
      console.log("user:");
      console.log(user);
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            msg.userType;
            if (msg.userType != "Admin" && msg.userType != "Manager") {
              // this.flag = true;
              // console.log("flag:"+this.flag);
              this.router.navigate(['/dashboard']);
            }

          });
      }
      });
    this.count = 0;
    this.posted = 0;
    this.showAddMember = false;
    this.reqType = this.projectservice.getRequestType();
    if (this.reqType === 'update') {
      this.buttonText = 'Update Project';
      this.project = this.initializeNewProject(this.project);
      this.pId = this.projectservice.getProjectToBeUpdated().projectId;
      this.pName = this.projectservice.getProjectToBeUpdated().projectName;
      this.pDesc = this.projectservice.getProjectToBeUpdated().projectDesc;
      this.pMembers = this.projectservice.getProjectToBeUpdated().members;
      for (let mb of this.pMembers) {
        this.project.members.push(mb);
      }
      this.project.projectId = this.pId;
      this.project.projectName = this.pName;
      this.project.projectDesc = this.pDesc;
      this.show1 = false;
      this.showAddMember = true;
    } else if (this.reqType === 'add') {
      this.buttonText = 'Add Project';
      this.project = this.initializeNewProject(this.project);
    }
  }

  generateId() {
    var date = new Date();
    var concat;
    concat = date.getFullYear().toString();
    concat += date.getMonth().toString();
    concat += date.getDate().toString();
    concat += date.getHours().toString();
    concat += date.getMinutes().toString();
    concat += date.getSeconds().toString();
    concat += date.getMilliseconds().toString();
    return concat;

  }

  changeVisibility1() {
    this.show1 = !this.show1;
    setTimeout(() => { this.des.nativeElement.focus(); });
  }

  changeVisibility2() {
    this.show2 = !this.show2;
    this.count++;
  }


  cancel(): void {
    if (confirm("Do you want to cancel the changes?")) {
      if (this.reqType == 'update') {
        this.project.projectId = this.pId;
        this.project.projectName = this.pName;
        this.project.projectDesc = this.pDesc;
        for (let mb of this.pMembers) {
          this.project.members=[];
          this.project.members.push(mb);
        }
        this.show1 = false;
      } else if (this.reqType == 'add') {
        this.project = this.initializeNewProject(this.project);
        this.show1 = true;
      }
      if (this.des !== undefined) {
        this.des.nativeElement.innerText = this.project.projectDesc;
      }
      this.router.navigate(['/dashboard']);
    }
  }

  initializeNewMember(m: member): member {
    m.email = "";
    m.role = "Select role";
    return m;
  }

  initializeNewProject(newProject: Project): Project {
    newProject = {
      projectId: this.generateId(),
      projectDesc: "",
      members: [],
      projectName: ""
    }
    return newProject;
  }

  addNewMem() {
    var me = new member();
    me = this.initializeNewMember(me);
    var membersLength = this.project.members.length;
    if (membersLength > 0) {
      this.lastMember = this.project.members[membersLength - 1];
      if (this.lastMember.email !== '' && (this.lastMember.role !== ''
        && this.lastMember.role !== 'Select role')) {
        this.project.members.push(me);
      }
    } else if (membersLength === 0) {
      this.project.members.push(me);
    }
  }

  delete(m: member): void {
    for (let memb in this.project.members) {
      if (this.project.members[parseInt(memb)].email === m.email) {
        this.project.members.splice(parseInt(memb), 1);
      }
    }
    if (this.project.members.length === 0) {
      this.showAddMember = false;
    }
  }

  addOrModifyProject() {
    console.log(this.project.members);
    if (this.des === undefined) {
      this.project.projectDesc = '';
    }
    else {
      this.project.projectDesc = this.des.nativeElement.innerText;
      console.log(this.des.nativeElement.innerText);
    }

    for (let memb in this.project.members) {
      if (this.project.members[parseInt(memb)].email === '' ||
        this.project.members[parseInt(memb)].role === '' ||
        this.project.members[parseInt(memb)].role === 'Select role') {

        this.project.members.splice(parseInt(memb), 1);
      }
    }
    console.log(this.project.members);
    console.log(this.project);
    if (this.project.projectDesc !== '' &&
      this.project.projectDesc != '' &&
      this.project.members.length != 0) {

      console.log(this.project);

      if (this.reqType === 'add') {
        this.projectservice.addProject(this.project).subscribe(
          (data: any) => {
            console.log(data);
            if (data.projectId === this.project.projectId) {
              console.log('Project added successfully');
              this.router.navigate(['/dashboard']);
            }
            else {
              console.log('Some error occured please try again.');
            }
          });
      } else if (this.reqType === 'update') {
        this.projectservice.updateProject(this.project).subscribe(
          (msg) => {
            if (msg.message === "Project Edited Successfully") {
              console.log('Project Edited Successfully');
              this.router.navigate(['/dashboard']);
            }
            else {
              console.log('Some error occured please try again.');
            }
          });
      } else {
        console.log('Some error occured please try again.');
      }
    } else {
      console.log('Please fill in all project details');
    }
  }
}
