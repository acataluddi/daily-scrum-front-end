import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../model/task-model";

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css']
})
export class IndividualTaskComponent implements OnInit {

  @Input() task: Task;
  @Output() timeChangeEvent = new EventEmitter<Task>();
  // @Output() descriptionChangeEvent = new EventEmitter();
  // @Output() impedenceChangeEvent = new EventEmitter();

  edit_description;
  edit_impediment;
  edit_time_spent;
  constructor() { }

  ngOnInit() {
    this.edit_description = false;
    this.edit_impediment = false;
    this.edit_time_spent = false;
  }

  timeArray = Array; //Array type captured in a variable
  hours: number = 24;
  minutes: number = 60;

  // onChangeHour(newtime, task) {
  //   task.hours_spent = newtime;
  //   console.log(task.hours_spent);
  //   console.log("Hours spent changed");
  // }
  // onChangeMinute(newtime, task) {
  //   task.minutes_spent = newtime;
  //   console.log(task.minutes_spent);
  //   console.log("Minutes spent changed");
  // }
  newdesc = "";
  updateValues(task) {
    console.log(this.newdesc);
    if (this.newdesc != "") {
      task.description = this.newdesc;
    }
  }

  emitTimeEvent(task) {
    console.log('emitting event from child');
    console.log('Hours : ' + task.hours_spent);
    console.log('Minutes : ' + task.minutes_spent);
    task.hours_spent = parseInt(task.hours_spent);
    task.minutes_spent = parseInt(task.minutes_spent);
    this.timeChangeEvent.emit(task);
  }

  // emitDescriptionEvent(){
  //   this.descriptionChangeEvent.emit();
  // }
  // emitImpedenceEvent(){
  //   this.impedenceChangeEvent.emit();
  // }

}
