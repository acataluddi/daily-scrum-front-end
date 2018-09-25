import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Task } from "../model/task-model";

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css']
})
export class IndividualTaskComponent implements OnInit {

  @Input() task: Task;
  @Input() editable: boolean;
  @Output() timeChangeEvent = new EventEmitter<Task>();
  @Output() addUpdateTask = new EventEmitter<Task>();
  @Output() popTask = new EventEmitter<Task>();
  @ViewChild('des') des: ElementRef;
  @ViewChild('imp') imp: ElementRef;

  show_impediment;
  edit_time_spent;
  show_save;
  saved;

  noDesc = false;
  noTime = false;

  timeArray = Array;
  hours = 17;
  minutes = 60;
  newdesc = '';
  tid;
  old_desc = '';
  old_imped = '';
  old_hourspent = '';
  old_minspent = '';
  stageDesc = false
  stageTime = false

  constructor() { }

  ngOnInit() {
    console.log(this.editable)
    this.show_save = false;
    this.saved = false;
    this.tid = parseInt(this.task.taskId);
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
    task.hourSpent = parseInt(task.hourSpent);
    task.minuteSpent = parseInt(task.minuteSpent);
  }
  updateDescription() {
    this.task.description = this.des.nativeElement.textContent;
    this.des.nativeElement.textContent = this.task.description;
    console.log('idval:' + this.des.nativeElement.innerText);
    this.task.description = this.task.description.trim();
    console.log('task val:' + this.task.description);
    // this.task.description.replace('&nbsp;', '');
    if (this.task.description === "") {
      this.des.nativeElement.innerText = "";
    }
  }

  updateImpediment() {
    this.task.impediments = this.imp.nativeElement.innerText.trim();
    console.log('idval:' + this.imp.nativeElement.innerText);
    this.task.impediments = this.task.impediments.trim();
    console.log('task val:' + this.task.impediments);
    this.task.impediments.replace('&nbsp;', '');
    if (this.task.impediments === "") {
      this.show_impediment = false;
      this.imp.nativeElement.innerText = "";
    }
  }

  save(task) {
    this.edit_time_spent = false
    if (task.description == "") {
      // alert("Add description")
      this.noDesc = true;
    } else if (task.hourSpent <= 0 && task.minuteSpent <= 0) {
      // alert("Add Time spent")
      this.noDesc = false;
      this.noTime = true;
    }
    else {
      this.addUpdateTask.emit(task);
      this.timeChangeEvent.emit(task);
      this.show_save = false;
      this.saved = true;
      this.noDesc = false;
      this.noTime = false;
    }
    this.stageDesc = false;
    this.stageTime = false;
  }

  stageTaskDesc(task) {
    this.saved = false
    this.noDesc = false
    if (this.stageDesc == false) {
      this.old_desc = task.description
      this.old_imped = task.impediments
      this.stageDesc = true
      console.log(this.old_imped)
    }

  }

  stageTaskTime(task) {
    this.saved = false
    this.noTime = false
    if (this.stageTime == false) {
      this.old_hourspent = task.hourSpent
      this.old_minspent = task.minuteSpent
      this.stageTime = true
    }
    console.log(this.old_hourspent)
  }

  cancelChange(task) {
    this.saved = false
    this.show_save = false
    this.show_impediment = false
    this.edit_time_spent = false
    this.noDesc = false;
    this.noTime = false;
    if (this.stageDesc && this.stageTime) {
      task.hourSpent = this.old_hourspent
      task.minuteSpent = this.old_minspent
      task.description = this.old_desc
      task.impediments = this.old_imped
    } else if (this.stageTime) {
      task.hourSpent = this.old_hourspent
      task.minuteSpent = this.old_minspent
    } else if (this.stageDesc) {
      task.description = this.old_desc
      task.impediments = this.old_imped
    } else {
      task.description = this.old_desc
      task.impediments = this.old_imped
      task.hourSpent = this.old_hourspent
      task.minuteSpent = this.old_minspent
    }
    this.popTask.emit(task)
  }

}
