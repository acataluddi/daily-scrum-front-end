import { Component, OnInit, ViewChild } from '@angular/core';
import { GoalService } from "../service/goal.service";
import { Goal, Comment, GoalMember } from "../model/goal-model";
import { NavBarMember } from '../model/nav-bar-member';
import { GoalUserlistComponent } from "../goal-userlist/goal-userlist.component";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goal: Goal;
  comment: Comment;
  newComment: string[];
  currentUserEmail: string;
  currentUserImage: string;
  selectedGoalMember: GoalMember;
  length: number;
  firstMemberEmail: string;
  navbarList: NavBarMember[];
  navigationMemberLength: number;
  noOfComments = [];
  expand = [];
  @ViewChild('goalUserList') goalUserList: GoalUserlistComponent;

  constructor(
    private goalService: GoalService
  ) { }

  ngOnInit() {
    this.currentUserEmail = localStorage.getItem('email');
    this.currentUserImage = localStorage.getItem('image');
    this.selectedGoalMember = this.initializeNewGoalMember(this.selectedGoalMember);
    this.fetchNavigationBarList();
  }


  //goal member list 
  fetchNavigationBarList() {
    this.goalService.getNavigationBarList('getStatusList').subscribe(navigationBarList => {
      this.navigationMemberLength = navigationBarList.length;
      if (navigationBarList.length > 0) {
        this.navbarList = navigationBarList;
        this.firstMemberEmail = navigationBarList[0].memberEmail;
        this.fetchGoalMember();
      } else {
        this.length = 0;
      }
    });
  }

  //body of selected member
  fetchGoalMember() {
    this.goalService.getGoalMember('getGoalMember', this.firstMemberEmail).subscribe(goalMember => {

      if (goalMember != null) {
        this.length = goalMember.goals.length;
        this.selectedGoalMember = this.initializeGoalsWithComment(goalMember);
        for (let i = 0; i < this.length; i++) {
          this.noOfComments[i] = goalMember.goals[i].comments.length - 1;
          if (i == 0) {
            this.expand[i] = true;
          } else {
            this.expand[i] = false;
          }
        }
      } else {
        this.length = 0;
      }
    });
  }

  initializeGoalsWithComment(selectedMember: GoalMember): GoalMember {
    if (selectedMember.goals != null) {
      for (let goal of selectedMember.goals) {
        var comment = new Comment();
        comment = this.initializeNewComment(comment, goal);
        if (goal.comments !== null) {
          goal.comments.push(comment);
        } else if (goal.comments === null) {
          var commentsArray: Comment[] = [comment];
          goal.comments = commentsArray;
        }
      }
    }
    return selectedMember;
  }

  initializeNewComment(comment: Comment, goal: Goal): Comment {
    comment = {
      commentId: '',
      commentTime: null,
      goalId: goal.goalId,
      commentDescription: '',
      memberEmail: '',
      memberImage: '',
      memberName: '',
      userEmail: goal.userEmail
    }
    return comment;
  }
  initializeNewGoalMember(goalMember: GoalMember) {
    goalMember = {
      goals: [],
      hasNewUpdates: false,
      id: '',
      lastUpdate: null,
      userEmail: '',
      userId: '',
      userImage: '',
      userName: ''
    }
    return goalMember;
  }
  createNewComment(newComment: Comment, selectedGoal: Goal) {
    if (newComment.commentDescription.trim() !== '' && newComment.goalId !== ''
      && newComment.userEmail !== '') {
      this.goalService.addComment(newComment).subscribe(addedComment => {
        var commentsArray = selectedGoal.comments;
        commentsArray.pop();
        commentsArray.push(addedComment);
        selectedGoal.comments = commentsArray;
        var comment = new Comment();
        comment = this.initializeNewComment(comment, selectedGoal);
        selectedGoal.comments.push(comment);
      });
    }
  }

  selectMember(member: NavBarMember) {
    this.goalService.getGoalMember('getGoalMember', member.memberEmail).subscribe(goalMember => {
      if (goalMember != null) {
        if (goalMember.goals != null) {
          this.length = goalMember.goals.length;
        } else {
          this.length = 0;
        }
        this.selectedGoalMember = this.initializeGoalsWithComment(goalMember);
        for (let i = 0; i < this.length; i++) {
          if (i == 0) {
            this.expand[i] = true;
          } else {
            this.expand[i] = false;
          }
        }
      } else {
        this.length = 0;
      }
    });
  }

  getStyle() {
    if (this.navigationMemberLength == 0) {
      return "100%";
    } else {
      return "calc(100% - 191px)";
    }
  }

  updateAfterNewGoal() {
    this.goalUserList.fetchMembersList();
    this.fetchNavigationBarList();
  }
}
