import { Component, OnInit } from '@angular/core';
import { GoalService } from "../service/goal.service";
import { Goal, Comment,GoalMember } from "../model/goal-model";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goal: Goal;
  comment: Comment;
  newComment: string[];
  getFirstMember:string;
  selectedGoalMember:GoalMember;
  length:number;
  constructor(
    private goalService: GoalService
  ) { }

  ngOnInit() {
    // this.goal = this.initializeNewGoal(this.goal);
    // this.newComment[] = '';
    this.selectedGoalMember = this.initializeNewGoalMember(this.selectedGoalMember);
    this.fetchNavigationBarList();
  }


  //goal member list 
  fetchNavigationBarList() {
    this.goalService.getNavigationBarList('getStatusList').subscribe(navigationBarList => {
      this.getFirstMember = navigationBarList[0].memberEmail;
      this.fetchGoalMember();
    });
  }

  //body of selected member
  fetchGoalMember() {
    this.goalService.getGoalMember('getGoalMember', 'neerajd@qburst.com').subscribe(goalMember => {
      this.selectedGoalMember = this.initializeGoalsWithComment(goalMember);
      this.length = goalMember.goals.length;
      console.log(this.selectedGoalMember);
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
    console.log('new member:', selectedMember);
    return selectedMember;
  }

  // createNewGoal(goal: Goal) {
  //   this.goalService.addGoal(goal).subscribe(addedGoal => {
  //     console.log(addedGoal);
  //   });
  // }

  createNewComment(comment: Comment) {
    this.goalService.addComment(comment).subscribe(addedComment => {
      console.log(addedComment);
    });
  }

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
  initializeNewGoalMember(goalMember:GoalMember){
    goalMember = {
      goals:[],
      hasNewUpdates:false,
      id:'',
      lastUpdate:null,
      userEmail:'',
      userId:'',
      userImage:'',
      userName: ''
    }
    return goalMember;
  }
  postComment(value){
    // this.comment = this.initializeNewComment(this.comment, goal);
    // var elmnt = document.getElementById('comment'+ goal.goalId);
    console.log(value)

  }
}
