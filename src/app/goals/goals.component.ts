import { Component, OnInit } from '@angular/core';
import { GoalService } from "../service/goal.service";
import { Goal, Comment } from "../model/goal-model";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  goal: Goal;
  comment: Comment;
  constructor(
    private goalService: GoalService
  ) { }

  ngOnInit() {
    this.goal = this.initializeNewGoal(this.goal);
    this.comment = this.initializeNewComment(this.comment);
  }

  fetchNavigationBarList() {
    this.goalService.getNavigationBarList('getStatusList').subscribe(navigationBarList => {
      console.log(navigationBarList);
    });
  }

  fetchGoalMember() {
    this.goalService.getGoalMember('getGoalMember', 'neerajd@qburst.com').subscribe(goalMember => {
      console.log(goalMember);
    });
  }

  createNewGoal(goal: Goal) {
    this.goalService.addGoal(goal).subscribe(addedGoal => {
      console.log(addedGoal);
    });
  }

  createNewComment(comment: Comment) {
    this.goalService.addComment(comment).subscribe(addedComment => {
      console.log(addedComment);
    });
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

  initializeNewComment(comment: Comment): Comment {
    comment = {
      commentId: '',
      commentTime: null,
      goalId: '1541563292124',
      commentDescription: 'Sure I will do it',
      memberEmail: '',
      memberImage: '',
      memberName: '',
      userEmail: 'sanjojoy22@gmail.com'
    }
    return comment;
  }
}
