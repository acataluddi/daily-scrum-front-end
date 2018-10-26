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
  @Input() feedbackUserList: GoalMember[];

  feedbackMember: FeedbackMember;
  length: number;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    if(this.firstFeedback != null ){
      this.length = 1;
    } else {
      this.length = 0;
    }
    this.feedbackMember = this.firstFeedback;
  }

  selectedMember(member: GoalMember){
    this.feedbackService.getFeedbacks(member.memberEmail).subscribe(data => this.feedbackMember = data);
  }
}
