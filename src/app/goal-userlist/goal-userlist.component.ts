import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NavBarMember } from '../model/nav-bar-member';
import { FeedbackService } from '../service/feedback.service';
import {GoalService } from '../service/goal.service'
import { equal } from 'assert';

@Component({
  selector: 'app-goal-userlist',
  templateUrl: './goal-userlist.component.html',
  styleUrls: ['./goal-userlist.component.css']
})
export class GoalUserlistComponent implements OnInit {

  // @Input() feedbackUserList: NavBarMember[];
  @Output() selectMemberEvent = new EventEmitter();

  feedbackmemberArray: NavBarMember[];
  Usertype = localStorage.getItem('userType');
  checker: boolean = false;
  length: number;
  constructor(private feedbackService: FeedbackService,
    private goalService:GoalService) { }

  ngOnInit() {
    // this.initializeMemberArray(this.feedbackUserList)
      this.goalService.getNavigationBarList('getStatusList').subscribe(navigationBarList => {
        this.feedbackUserList(navigationBarList)
      });
    
    
    // this.feedbackService.getFeedBackStatusList().subscribe(data => this.initializeMemberArray(data));
  }

  // initializeMemberArray(array) {
  //   this.feedbackmemberArray = array;
  //   this.length = this.feedbackmemberArray.length;
  //   var mem = this.feedbackmemberArray[0]
  //   setTimeout(() => {
  //     document.getElementById(mem.memberId).classList.add('focus');
  //   }, 50);
  // }

  getGoalsOfUser(selectedmember) {
    if (selectedmember.hasNewUpdates) {
      selectedmember.hasNewUpdates = false;
    }
    this.selectMemberEvent.emit(selectedmember)
    if(document.getElementById("search_name").classList.contains('flexed')){
      document.getElementById("userslist").classList.remove("block")
      document.getElementById("list").classList.remove("block")
      document.getElementById("list").classList.remove("shadow")
      document.getElementById("search_name").classList.remove("flexed")
      document.getElementById("userslist").classList.remove("flex")
    }
    // this.goalService.getNavigationBarList('getStatusList').subscribe(navigationBarList => {
    //   this.feedbackUserList(navigationBarList)
    // });
  

  //   if (this.Usertype == 'Admin') {
  //     selectedmember.hasNewUpdates = false;
  //     this.feedbackService.updateFeedbackStatus(selectedmember.memberEmail).subscribe(data => console.log(data));
  //   }

    for (let member of this.feedbackmemberArray) {
      if (document.getElementById(member.memberId) != null) {
        if (selectedmember.memberId == member.memberId) {
          document.getElementById(member.memberId).classList.add('focus');
        }
        else {
          document.getElementById(member.memberId).classList.remove('focus');
        }
      }
    }
  }

  changeCSS() {
    if (!this.checker) {
      document.getElementById("userslist").classList.add("block")
      document.getElementById("list").classList.add("block")
      document.getElementById("list").classList.add("shadow")
      document.getElementById("search_name").classList.add("flexed")
      document.getElementById("userslist").classList.add("flex")
      this.checker = !this.checker
    }
    else {
      document.getElementById("userslist").classList.remove("block")
      document.getElementById("list").classList.remove("block")
      document.getElementById("list").classList.remove("shadow")
      document.getElementById("search_name").classList.remove("flexed")
      document.getElementById("userslist").classList.remove("flex")
      this.checker = !this.checker

    }
  }
  feedbackUserList(navigationBarList) {
    this.feedbackmemberArray = navigationBarList;
    this.length = this.feedbackmemberArray.length;
    var mem = this.feedbackmemberArray[0]
    setTimeout(() => {
      document.getElementById(mem.memberId).classList.add('focus');
    }, 50);
  }
}
