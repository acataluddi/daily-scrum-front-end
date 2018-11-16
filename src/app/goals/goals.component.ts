import { Component, OnInit } from '@angular/core';
import { GoalService } from "../service/goal.service";
import { Goal, Comment, GoalMember } from "../model/goal-model";
import { NavBarMember } from '../model/nav-bar-member';

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
  selectedGoalMember:GoalMember;
  length:number;
  firstMemberEmail: string;
  navbarList: NavBarMember[];
  noOfComments = [];
  expand = [];
  len = 0;
  constructor(
    private goalService: GoalService
  ) { }

  ngOnInit() {
    this.currentUserEmail = localStorage.getItem('email');
    this.currentUserImage = localStorage.getItem('image');
    // this.goal = this.initializeNewGoal(this.goal);
    // this.newComment[] = '';
    this.selectedGoalMember = this.initializeNewGoalMember(this.selectedGoalMember);
    this.fetchNavigationBarList();
  }


  //goal member list 
  fetchNavigationBarList() {
    this.goalService.getNavigationBarList('getStatusList').subscribe(navigationBarList => {
      // console.log(navigationBarList)
      this.navbarList = navigationBarList;
      this.firstMemberEmail = navigationBarList[0].memberEmail;
      this.fetchGoalMember();
    });
  }

  //body of selected member
  fetchGoalMember() {
    this.goalService.getGoalMember('getGoalMember', this.firstMemberEmail).subscribe(goalMember => {
      this.selectedGoalMember = this.initializeGoalsWithComment(goalMember);
      this.length = goalMember.goals.length;
      for(let i = 0; i < this.length; i++ ) {
        this.noOfComments[i] = goalMember.goals[i].comments.length-1;
        if (i==0) {
          this.expand[i] = true;
        } else {
          this.expand[i] = false;
        }
      }
    });
  }

  initializeGoalsWithComment(selectedMember:GoalMember): GoalMember{
    for (let goal of selectedMember.goals) {
      var comment = new Comment();
      comment = this.initializeNewComment(comment,goal);
      if(goal.comments!==null){
        goal.comments.push(comment);
      } else if (goal.comments===null){
        var commentsArray:Comment[] = [comment];
        goal.comments = commentsArray;
      }
    }
    // console.log('new member:', selectedMember);
    return selectedMember;
  }

  // createNewGoal(goal: Goal) {
  //   this.goalService.addGoal(goal).subscribe(addedGoal => {
  //     console.log(addedGoal);
  //   });
  // }

  // postComment(comment: Comment): Comment {
  //   this.goalService.addComment(comment).subscribe(addedComment => {
  //     console.log(addedComment);
  //     return addedComment;
  //   });
  // }

  // initializeNewGoal(newGoal: Goal): Goal {
  //   newGoal = {
  //     goalId: '',
  //     goalTime: null,
  //     goalTitle: '',
  //     goalDescription: '',
  //     hasNewUpdatesForManager: false,
  //     hasNewUpdatesForUser: false,
  //     managerEmail: '',
  //     managerImage: '',
  //     userEmail: '',
  //     managerName: '',
  //     comments: []
  //   }
  //   return newGoal;
  // }

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
  createNewComment(newComment: Comment, selectedGoal: Goal){
    if(newComment.commentDescription.trim()!=='' && newComment.goalId!=='' 
      && newComment.userEmail!==''){
        this.goalService.addComment(newComment).subscribe(addedComment => {
          var commentsArray = selectedGoal.comments;
          commentsArray.pop();
          commentsArray.push(addedComment);
          selectedGoal.comments = commentsArray;
          var comment = new Comment();
          comment = this.initializeNewComment(comment,selectedGoal);
          selectedGoal.comments.push(comment);
        });
      }
  }

  selectMember(member: NavBarMember) {
    this.goalService.getGoalMember('getGoalMember', member.memberEmail).subscribe(goalMember => {
      this.selectedGoalMember = this.initializeGoalsWithComment(goalMember);
      this.length = goalMember.goals.length;
      for(let i = 0; i < this.length; i++ ) {
        if (i==0) {
          this.expand[i] = true;
        } else {
          this.expand[i] = false;
        }
      }
    });
  }
}
