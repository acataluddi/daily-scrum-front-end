import { Component, OnInit } from '@angular/core';
import { Feedback } from '../model/feedback-model';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackArray: Feedback[];
  individualfeedback: Feedback;
  length: number;
  date = new Date();

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.length = 2;
    this.fetchFeedback();
  }

  fetchFeedback() {
    this.feedbackService.getFeedbacks().subscribe(feedbackList => {
      this.feedbackArray = feedbackList;
      if (this.feedbackArray.length != 0) {
        this.length = 1;
      } else {
        this.length = 0;
      }
    });
  }
}
