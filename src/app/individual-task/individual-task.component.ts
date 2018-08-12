import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../model/task-model";

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css']
})
export class IndividualTaskComponent implements OnInit {

  @Input() task: Task;

  edit_description;
  edit_impediment;
  constructor() { }

  ngOnInit() {
    this.edit_description=false;
    this.edit_impediment=false;
  }
}
