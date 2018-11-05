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

  time;

  noDesc = false;
  noTime = false;

  timeArray = Array;
  hours;
  minutes;
  newdesc = '';
  tid;
  old_desc = '';
  old_imped = '';
  old_hourspent = '';
  old_minspent = '';
  stageDesc = false
  stageTime = false

  check = false;

  eventsSubscription: any;
  copiedSubscription: any;
  constructor() { }

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((ischecked) =>
      this.check = ischecked);
    this.copiedSubscription = this.hideSavedEvent.subscribe((hideSaved) =>
      this.saved = false);
    
    if (this.task.hourSpent >= 0 || this.task.minuteSpent >= 0) {
      if (this.task.hourSpent < 10) {
        this.hours = '0' + this.task.hourSpent.toString();
      } else {
        this.hours = this.task.hourSpent.toString();
      }
      if (this.task.minuteSpent < 10) {
        this.minutes = '0' + this.task.minuteSpent.toString();
      } else {
        this.minutes = this.task.minuteSpent.toString();
      }
      this.time = this.hours + ':' + this.minutes;
    }
    
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
    var hr = this.time.split(":")
    task.hourSpent = parseInt(hr[0]);
    task.minuteSpent = parseInt(hr[1]);
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
  }

  stageTaskTime(task) {
    this.saved = false
    this.noTime = false
    if (this.stageTime == false) {
      this.old_hourspent = task.hourSpent
      this.old_minspent = task.minuteSpent
      this.stageTime = true
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
    if (task.impediments != '') {
      this.show_impediment = true
    }
    this.popTask.emit(task)
  }

  focus(value) {
    if (value == 1) {
      setTimeout(() => { document.getElementById('timeSpent' + this.task.taskId).focus() });  
    } else if (value == 2){
      setTimeout(() => { document.getElementById('impediments' + this.task.taskId).focus() });
    }
    // setTimeout(() => { document.getElementById('impediments' + this.task.taskId).focus() });
  }

  copy(id) {
    console.log(id)
    let copyText = document.getElementById('description' + id) as HTMLInputElement;
    console.log(copyText.value)
    copyText.select()
    document.execCommand("copy");
  }

  checked(task) {
    // console.log(task)
    this.selectedTask.emit(task)
  }

  unchecked(task) {
    this.unselectedTask.emit(task)
  }
}
