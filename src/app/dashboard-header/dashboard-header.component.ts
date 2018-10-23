import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { ProjectService } from '../service/project.service';
import { Router } from '@angular/router';
import { FeedbackService } from '../service/feedback.service';
import { GoalUserList } from '../model/goalUserList-model';
import { FeedbackMember } from '../model/feedback-model';

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

  feedbackUserList: GoalUserList[] = []
  firstFeedbackmember: FeedbackMember

  constructor(private socialAuthService: AuthService,
    private loginservice: LoginService,
    private projectService: ProjectService,
    public router: Router,
    private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.activetab = 1;
    document.getElementById("projects-tab").classList.add('tab-active');
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

    if (localStorage.getItem('userType') == "Admin") {
      this.feedbackService.getFeedBackStatusList().subscribe(data => {
      this.feedbackUserList = data;
        if (data.length > 0) {
          this.feedbackService.getFeedbacks(data[0].memberEmail).subscribe(data => this.fetchFirstFeedbackMember(data))
        }
      })
    }
  }

  activateTab(value) {
    this.activetab = value;
    this.setActivetabStyle(value)
  }

  AddProject() {
    this.operation = "AddProject";
    localStorage.setItem('currentOperation', this.operation);
    this.projectService.setRequestType("add");
    this.router.navigateByUrl('/project');
  }
  
  AddGoal() {
    alert("We are working on it!")
  }

  setActivetabStyle(value) {
    switch (value) {
      case 1: document.getElementById("projects-tab").classList.add('tab-active');
        if (this.flag1) {
          if (document.getElementById("users-tab").classList.contains('tab-active')) {
            document.getElementById("users-tab").classList.remove('tab-active');
          }
          if (document.getElementById("feedback-tab").classList.contains('tab-active')) {
            document.getElementById("feedback-tab").classList.remove('tab-active');
          }
        }
        if (this.UserType == 'Manager' || this.UserType == 'User') {
          if (document.getElementById("goals-tab").classList.contains('tab-active')) {
            document.getElementById("goals-tab").classList.remove('tab-active');
          }
        }
        break;
      case 2: document.getElementById("users-tab").classList.add('tab-active');
        if (document.getElementById("projects-tab").classList.contains('tab-active')) {
          document.getElementById("projects-tab").classList.remove('tab-active');
        }
        if (this.UserType == 'Manager' || this.UserType == 'User') {
          if (document.getElementById("goals-tab").classList.contains('tab-active')) {
            document.getElementById("goals-tab").classList.remove('tab-active');
          }
        }
        if (this.flag1) {
          if (document.getElementById("feedback-tab").classList.contains('tab-active')) {
            document.getElementById("feedback-tab").classList.remove('tab-active');
          }
        }
        break;
      case 3: document.getElementById("goals-tab").classList.add('tab-active');
        if (document.getElementById("projects-tab").classList.contains('tab-active')) {
          document.getElementById("projects-tab").classList.remove('tab-active');
        }
        if (this.flag1) {
          if (document.getElementById("feedback-tab").classList.contains('tab-active')) {
            document.getElementById("feedback-tab").classList.remove('tab-active');
          }
          if (document.getElementById("users-tab").classList.contains('tab-active')) {
            document.getElementById("users-tab").classList.remove('tab-active');
          }
        }
        break;
      case 4: document.getElementById("feedback-tab").classList.add('tab-active');
        if (document.getElementById("projects-tab").classList.contains('tab-active')) {
          document.getElementById("projects-tab").classList.remove('tab-active');
        }
        if (this.UserType == 'Manager' || this.UserType == 'User') {
          if (document.getElementById("goals-tab").classList.contains('tab-active')) {
            document.getElementById("goals-tab").classList.remove('tab-active');
          }
        }
        if (this.flag1) {
          if (document.getElementById("users-tab").classList.contains('tab-active')) {
            document.getElementById("users-tab").classList.remove('tab-active');
          }
        }
        break;
    }
  }

  fetchFirstFeedbackMember(member) {
    this.firstFeedbackmember = member;
  }
}
