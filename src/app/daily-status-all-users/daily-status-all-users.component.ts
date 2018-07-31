import { Component, OnInit } from '@angular/core';

import { Task } from "../model/task-model";
import { Member } from "../model/member-model";
import { Project } from "../model/project-model";
import { IndividualMemberComponent } from "../individual-member/individual-member.component";

@Component({
  selector: 'app-daily-status-all-users',
  templateUrl: './daily-status-all-users.component.html',
  styleUrls: ['./daily-status-all-users.component.css']
})
export class DailyStatusAllUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
