import { Component, OnInit, Input } from '@angular/core';
import { FeedbackMember } from '../model/feedback-model';
import { FeedbackService } from '../service/feedback.service';
import { GoalMember } from '../model/goalmember-model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() firstFeedback: FeedbackMember;

  feedbackMember: FeedbackMember;
  // lastUpdate: string = 'Thu, 01:30PM';

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    // console.log(this.firstFeedback)
    this.feedbackMember = this.firstFeedback;
    // this.initialize();
    // this.lastUpdate = 'Thu, 01:30PM';
  }

  // initialize() {
  //   this.feedbackMember = {
  //     userEmail: '',
  //     userId: '',
  //     userImage: '',
  //     userName: '',
  //     lastUpdate:'',
  //     hasNewUpdates: true,
  //     feedbacks: [
  //       {
  //         feedbackDate: '',
  //         feedbackId: "",
  //         feedbackDescription: ''
  //       }
  //     ]
  //   };
  // }

  selectedMember(member: GoalMember){
    this.feedbackService.getFeedbacks(member.memberEmail).subscribe(data => this.feedbackMember = data);
  }
}
