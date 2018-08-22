import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Task } from "../model/task-model";

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css']
})
export class IndividualTaskComponent implements OnInit {

  @Input() task: Task;
  @Output() timeChangeEvent = new EventEmitter<Task>();
  @ViewChild('des') des: ElementRef;
  @ViewChild('imp') imp: ElementRef;

  show_impediment;
  edit_time_spent;

  timeArray = Array;
  hours = 24;
  minutes = 60;
  newdesc = '';
  constructor() { }

  ngOnInit() {
    if (this.task.impediments === "") {
      this.show_impediment = false;
    }
    else {
      this.show_impediment = true;
    }
    this.edit_time_spent = false;
  }
  updateValues(task) {
    console.log(this.newdesc);
    if (this.newdesc !== '') {
      task.description = this.newdesc;
    }
  }

  emitTimeEvent(task) {
    task.hours_spent = parseInt(task.hours_spent);
    task.minutes_spent = parseInt(task.minutes_spent);
    this.timeChangeEvent.emit(task);
  }
  updateDescription() {
    this.des.nativeElement.innerHTML = this.des.nativeElement.innerHTML.trim();
    this.task.description = this.des.nativeElement.innerHTML;
    console.log(this.des.nativeElement.innerHTML);
    this.task.description = this.task.description.trim();
    console.log(this.task.description);
    this.task.description.replace('&nbsp;', '');
    if (this.task.description === "") {
      this.des.nativeElement.innerHTML = "";
    }
  }

  updateImpediment() {
    this.imp.nativeElement.innerHTML = this.imp.nativeElement.innerHTML.trim();
    this.task.impediments = this.imp.nativeElement.innerHTML.trim();
    console.log(this.imp.nativeElement.innerHTML);
    this.task.impediments = this.task.impediments.trim();
    console.log(this.task.impediments);
    this.task.impediments.replace('&nbsp;', '');
    if (this.task.impediments === "") {
      this.show_impediment = false;
      this.imp.nativeElement.innerHTML = "";
    }
    this
  }

}
