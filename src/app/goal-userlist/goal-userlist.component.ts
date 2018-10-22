import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoalMember } from '../model/goalmember-model';
import { FeedbackService } from '../service/feedback.service';
import { equal } from 'assert';

@Component({
  selector: 'app-goal-userlist',
  templateUrl: './goal-userlist.component.html',
  styleUrls: ['./goal-userlist.component.css']
})
export class GoalUserlistComponent implements OnInit {

  @Output() selectMemberEvent = new EventEmitter();

  feedbackmemberArray: GoalMember[];
  Usertype = localStorage.getItem('userType');
  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    // this.initializeMemberArray();
    this.feedbackService.getFeedBackStatusList().subscribe(data => this.initializeMemberArray(data));
  }

  initializeMemberArray(array) {
    this.feedbackmemberArray = array;
    var mem = this.feedbackmemberArray[0]
    setTimeout(() => {
      document.getElementById(mem.memberId).classList.add('focus');
    }, 100);
  }

  getFeedbackOfUser(selectedmember) {
    this.selectMemberEvent.emit(selectedmember)

    if (this.Usertype == 'Admin') {
      selectedmember.hasNewUpdates = false;
      this.feedbackService.updateFeedbackStatus(selectedmember.memberEmail).subscribe(data => console.log(data));
    }

    for (let member of this.feedbackmemberArray) {
      if (selectedmember.memberId == member.memberId) {
        document.getElementById(member.memberId).classList.add('focus');
      }
      else {
        document.getElementById(member.memberId).classList.remove('focus');
      }
    }
  }
}
