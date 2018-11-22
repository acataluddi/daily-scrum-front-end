import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from "../service/login.service";
import { GoalService } from "../service/goal.service";
import { Goal } from '../model/goal-model'
import { NavBarMember } from '../model/nav-bar-member'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  goal: Goal;
  showPage: boolean;
  image: string;
  name: string;
  showSign1: boolean;
  showSign2: boolean;
  members: NavBarMember[];
  dropDown: boolean;
  searchText: string;
  hide: boolean;
  invalidGoalTitle: boolean;
  invalidGoalMember: boolean;
  @Output() goalAddedEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  constructor(
    public router: Router,
    private socialAuthService: AuthService,
    private loginservice: LoginService,
    private goalService: GoalService) { }

  ngOnInit() {
    this.showPage = false;
    this.searchText = '';
    this.goal = this.initializeNewGoal(this.goal);
    this.invalidGoalTitle = false;
    this.invalidGoalMember = false;
    this.showSign1 = true;
    this.showSign2 = true;
    this.dropDown = false;
    this.hide = false;
  }

  refreshData() {
    this.showPage = false;
    this.searchText = '';
    this.goal = this.initializeNewGoal(this.goal);
    this.invalidGoalTitle = false;
    this.invalidGoalMember = false;
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            if (msg.userType === "Manager") {
              this.showPage = true;
              this.goalService.getNavigationBarList("getStatusList").subscribe(data => {
                this.setProjects(data)
              });
            }
          });
      }
    });
    this.showSign1 = true;
    this.showSign2 = true;
    this.dropDown = false;
    this.hide = false;
  }
  show1() {
    this.showSign1 = !this.showSign1;
  }
  show2() {
    this.showSign2 = !this.showSign2;
    setTimeout(() => { document.getElementById('goalDescriptionInput').focus() });
  }
  list() {
    this.dropDown = !this.dropDown;
  }
  setProjects(members) {
    this.members = members;
  }
  selectMember(member: NavBarMember) {
    if (member.memberName !== null) {
      this.name = member.memberName;
      this.image = member.memberImage;
      this.dropDown = false;
      this.visible();
      this.goal.userEmail = member.memberEmail;
    }
  }
  visible() {
    this.hide = true;
  }

  initializeNewGoal(newGoal: Goal): Goal {
    newGoal = {
      goalId: '',
      goalTime: null,
      goalTitle: '',
      goalDescription: '',
      hasNewUpdatesForManager: false,
      hasNewUpdatesForUser: false,
      managerEmail: '',
      managerImage: '',
      userEmail: '',
      managerName: '',
      comments: []
    }
    return newGoal;
  }

  createNewGoal(goal: Goal) {
    this.invalidGoalMember = false;
    this.invalidGoalTitle = false;
    var hasError = false;
    this.goal.goalTitle = this.goal.goalTitle.trim();
    this.goal.goalDescription = this.goal.goalDescription.trim();
    goal.goalTitle = this.goal.goalTitle;
    goal.goalDescription = this.goal.goalDescription;
    if (goal.userEmail.trim() === '' || goal.userEmail === null) {
      hasError = true;
      this.invalidGoalMember = true;
    }
    if (goal.goalTitle.trim() === '' || goal.goalTitle === null) {
      hasError = true;
      this.invalidGoalTitle = true;
    }
    if (this.invalidGoalMember) {
      var elmnt = document.getElementById("teamMember");
      elmnt.scrollIntoView(false);
      document.getElementById("teamMember").classList.add('high-light-element');
      setTimeout(function () {
        document.getElementById("teamMember").classList.remove('high-light-element');
      }, 280);
    } else if (this.invalidGoalTitle) {
      var elmnt = document.getElementById("goalName");
      elmnt.scrollIntoView(false);
      document.getElementById("goalName").classList.add('high-light-element');
      setTimeout(function () {
        document.getElementById("goalName").classList.remove('high-light-element');
      }, 280);
    } 
    if (!hasError) {
      this.goalService.addGoal(goal).subscribe(addedGoal => {
        if (addedGoal.goalId != '' && addedGoal.goalId != undefined && addedGoal.goalId != null) {
          console.log('Goal added successfully');
          this.goal = this.initializeNewGoal(this.goal);
          this.goalAddedEvent.emit();
        }
      });
    }
  }

  cancelCreation() {
    this.goal = this.initializeNewGoal(this.goal);
    this.cancelEvent.emit();
    this.searchText = '';
  }

  isValidGoalName(goalName) {
    if (goalName.trim() == '') {
      this.invalidGoalTitle = true;
    }
  }

}

