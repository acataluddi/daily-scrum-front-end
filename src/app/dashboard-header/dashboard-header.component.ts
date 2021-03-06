import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { ProjectService } from '../service/project.service';
import { Router } from '@angular/router';
import { GoalsComponent } from "../goals/goals.component";
import { AddGoalComponent } from "../add-goal/add-goal.component";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  activetab;
  UserType;
  flag1;
  flag2;
  operation: string;
  @ViewChild('goalsPage') goalsPage: GoalsComponent;
  @ViewChild('addNewGoal') addNewGoal: AddGoalComponent;

  constructor(private socialAuthService: AuthService,
    private loginservice: LoginService,
    private projectService: ProjectService,
    public router: Router) { }

  ngOnInit() {
    this.activetab = 1;
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
  }

  AddProject() {
    this.operation = "AddProject";
    localStorage.setItem('currentOperation', this.operation);
    this.projectService.setRequestType("add");
    this.router.navigateByUrl('/project');
  }

  AddGoal() {
    this.addNewGoal.refreshData();
    this.operation = "AddGoal";
    localStorage.setItem('currentOperation', this.operation);
    // Get the modal
    var modal = document.getElementById('myModal');
    //open the modal 
    modal.style.display = "block";
  }

  createGoal() {
    this.addNewGoal.createNewGoal();
  }

  updatePage() {
    this.closeModal();
    this.goalsPage.updateAfterNewGoal();
  }

  closeModal() {
    // Get the modal
    var modal = document.getElementById('myModal');
    //close the modal
    modal.style.display = "none";
  }
}
