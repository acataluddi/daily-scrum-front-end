import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Task } from "../model/task-model";
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-individual-task',
  templateUrl: './individual-task.component.html',
  styleUrls: ['./individual-task.component.css']
})
export class IndividualTaskComponent implements OnInit {

  @Input() task: Task;
  @Input() editable: boolean;
  @Input() events: Observable<boolean>;
  @Input() hideSavedEvent: Observable<boolean>;
  @Output() timeChangeEvent = new EventEmitter<Task>();
  @Output() selectedTask = new EventEmitter<Task>();
  @Output() unselectedTask = new EventEmitter<Task>();
  // @Output() deleteTask = new EventEmitter<Task>();
  @Output() popTask = new EventEmitter<Task>();
  @ViewChild('des') des: ElementRef;
  @ViewChild('imp') imp: ElementRef;

  show_impediment;
  edit_time_spent;
  saved;
  show_save;

  buttonText;

  noDesc = false;
  noTime = false;

  time: Date = new Date();
  maxtime: Date = new Date();

  timeArray = Array;
  hours;
  minutes;
  newdesc = '';
  tid;
  old_desc = '';
  old_imped = '';
  old_hourspent = '';
  old_minspent = '';
  stageDesc = false;
  stageTime = false;

  check = false;

  eventsSubscription: any;
  copiedSubscription: any;
  constructor() { 
    this.maxtime.setHours(17);
    this.maxtime.setMinutes(0);
  }

  ngOnInit() {
    if (this.task.lastEdit == '') {
      this.buttonText = 'Save';
    } else {
      this.buttonText = 'Update';
    }

    this.eventsSubscription = this.events.subscribe((ischecked) =>
      this.check = ischecked);
    this.copiedSubscription = this.hideSavedEvent.subscribe((hideSaved) =>
      this.saved = false);

    this.time.setHours(this.task.hourSpent);
    this.time.setMinutes(this.task.minuteSpent);

    if (this.task.description == '' || this.task.description == null) {
      this.show_save = true;
      this.saved = false;
      this.stageTaskDesc(this.task)
    } else {
      this.show_save = false;
      this.saved = false;
    }

    this.check = false

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
    if (this.newdesc !== '') {
      task.description = this.newdesc;
    }
  }

  emitTimeEvent(task) {
    task.hourSpent = this.time.getHours();
    task.minuteSpent = this.time.getMinutes();
  }
  updateDescription() {
    this.task.description = this.task.description.trim();
  }

  updateImpediment() {
    this.task.impediments = this.task.impediments.trim();
    if (this.task.impediments === "") {
      this.show_impediment = false;
    }
  }

  save(task) {
    this.edit_time_spent = false
    if (task.description == "" && task.hourSpent <= 0 && task.minuteSpent <= 0) {
      this.noDesc = true;
      this.noTime = true;
    } else if (task.description == "") {
      this.noDesc = true;
      this.noTime = false;
    } else if (task.hourSpent <= 0 && task.minuteSpent <= 0) {
      this.noDesc = false;
      this.noTime = true;
    }
    else {
      // this.addUpdateTask.emit(task);
      this.timeChangeEvent.emit(task);
      this.saved = true;
      this.noDesc = false;
      this.noTime = false;
      this.show_save = false;
      setTimeout(() => {
        this.saved = false;
      }, 5000);
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
    }

    if (this.task.lastEdit == '') {
      this.buttonText = 'Save';
    } else {
      this.buttonText = 'Update';
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

    if (this.task.lastEdit == '') {
      this.buttonText = 'Save';
    } else {
      this.buttonText = 'Update';
    }
  }

  cancelChange(task) {
    this.saved = false
    this.show_impediment = false
    this.edit_time_spent = false
    this.noDesc = false;
    this.noTime = false;
    this.show_save = false
    if (this.stageDesc && this.stageTime) {
      task.hourSpent = this.old_hourspent
      task.minuteSpent = this.old_minspent
      this.time.setHours(+this.old_hourspent)
      this.time.setMinutes(+this.old_minspent)
      task.description = this.old_desc
      task.impediments = this.old_imped
    } else if (this.stageTime) {
      task.hourSpent = this.old_hourspent
      task.minuteSpent = this.old_minspent
      this.time.setHours(+this.old_hourspent)
      this.time.setMinutes(+this.old_minspent)
    } else if (this.stageDesc) {
      task.description = this.old_desc
      task.impediments = this.old_imped
    } else {
      task.description = this.old_desc
      task.impediments = this.old_imped
      task.hourSpent = this.old_hourspent
      task.minuteSpent = this.old_minspent
      this.time.setHours(+this.old_hourspent)
      this.time.setMinutes(+this.old_minspent)
    }
    if (task.impediments != '') {
      this.show_impediment = true
    }
    this.popTask.emit(task)
  }

  focus(value) {
    if (value == 1) {
      // var tag = document.getElementsByClassName('bs-timepicker-field') 
      // console.log(tag, tag.item(0))
      setTimeout(() => { document.getElementById('timeSpent' + this.task.taskId).focus() });  
    } else if (value == 2){
      setTimeout(() => { document.getElementById('impediments' + this.task.taskId).focus() });
    }
    // setTimeout(() => { document.getElementById('impediments' + this.task.taskId).focus() });
  }

  copy(id) {
    let copyText = document.getElementById('description' + id) as HTMLInputElement;
    copyText.select()
    document.execCommand("copy");
  }

  checked(task) {
    this.selectedTask.emit(task)
  }

  unchecked(task) {
    this.unselectedTask.emit(task)
  }
}
