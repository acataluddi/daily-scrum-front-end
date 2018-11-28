import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavBarMember } from '../model/nav-bar-member';
import { GoalService } from '../service/goal.service'

@Component({
  selector: 'app-goal-userlist',
  templateUrl: './goal-userlist.component.html',
  styleUrls: ['./goal-userlist.component.css']
})
export class GoalUserlistComponent implements OnInit {

  @Output() selectMemberEvent = new EventEmitter();

  feedbackmemberArray: NavBarMember[];
  Usertype = localStorage.getItem('userType');
  checker: boolean = false;
  length: number;
  constructor(
    private goalService: GoalService) { }

  ngOnInit() {
    this.fetchMembersList();
  }

  fetchMembersList() {
    this.goalService.getNavigationBarList('getStatusList').subscribe(navigationBarList => {
      this.feedbackUserList(navigationBarList);
    });
  }


  getGoalsOfUser(selectedmember) {
    if (selectedmember.hasNewUpdates) {
      selectedmember.hasNewUpdates = false;
    }
    this.selectMemberEvent.emit(selectedmember)
    if (document.getElementById("search_name").classList.contains('flexed')) {
      document.getElementById("userslist").classList.remove("block")
      document.getElementById("list").classList.remove("block")
      document.getElementById("list").classList.remove("shadow")
      document.getElementById("search_name").classList.remove("flexed")
      document.getElementById("userslist").classList.remove("flex")
    }

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
    if (this.length > 0) {
      var mem = this.feedbackmemberArray[0]
      mem.hasNewUpdates = false;
      setTimeout(() => {
        document.getElementById(mem.memberId).classList.add('focus');
      }, 50);
    }
  }
}
