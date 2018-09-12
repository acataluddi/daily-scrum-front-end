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
  tid;
  constructor() { }

  ngOnInit() {
    this.tid=parseInt(this.task.taskId);
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
    this.timeChangeEvent.emit(task);
  }
  updateDescription() {
    // this.des.nativeElement.textContent = this.des.nativeElement.textContent.trim();
    this.task.description = this.des.nativeElement.innerText;
    console.log('idval:' + this.des.nativeElement.innerText);
    this.task.description = this.task.description.trim();
    console.log('task val:' + this.task.description);
    this.task.description.replace('&nbsp;', '');
    if (this.task.description === "") {
      this.des.nativeElement.innerText = "";
    }
  }

  updateImpediment() {
    // this.imp.nativeElement.innerText = this.imp.nativeElement.innerText.trim();
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

}
