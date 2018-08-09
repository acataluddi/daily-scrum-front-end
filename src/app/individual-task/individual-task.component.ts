import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../model/task-model";

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css']
})
export class IndividualTaskComponent implements OnInit {

  @Input() task: Task;
  constructor() { }

  ngOnInit() {
  }
}
