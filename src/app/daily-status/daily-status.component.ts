import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { IndividualTaskComponent } from "../individual-task/individual-task.component";

@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.component.html',
  styleUrls: ['./daily-status.component.css']
})
export class DailyStatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
