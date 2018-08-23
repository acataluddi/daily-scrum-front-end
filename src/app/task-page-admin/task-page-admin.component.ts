import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-task-page-admin',
  templateUrl: './task-page-admin.component.html',
  styleUrls: ['./task-page-admin.component.css']
})
export class TaskPageAdminComponent implements OnInit {

  task: Task;
  task1: Task;
  MockYesterdayTasks: Task[];
  MockTodayTasks: Task[];
  myDateValue: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  task_id;
  oldtodaytask: Task;
  oldyesterdaytask: Task;
  creatednewtoday=false;
  creatednewyesterday=false;
  hours_spent;
  minutes_spent;
  impediments;
  description;
  task_completed;
  total_hours_spent = 0;
  total_minutes_spent = 0;
  showDatePicker = false;
  timeArray = Array; //Array type captured in a variable
  hours = 23;
  minutes = 59;
  todayval;
  yesterdayval;
  totalhour = 0;
  totalminute = 0;

  newDate = new Date();

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  d = new Date();
  hour;
  minute;
  second;
  month;
  monthval;
  date;
  year;
  myvalue;
  constructor(
    private taskservice: ProcessIndividualTaskService
  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-orange',
      showWeekNumbers: false
    });
  }

  ngOnInit() {
    this.oldtodaytask= new Task;
    this.oldyesterdaytask=new Task;
    this.getTasks();
    this.calculateTotalTime();
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.myvalue = true;
    this.myDateValue = new Date();
    this.todayval = "Today, " + this.month + " " + this.date + ", " + this.year;
    this.yesterdayval ="Yesterday's Tasks";
  }
  getTasks() {
    this.MockYesterdayTasks = this.taskservice.getYesterdayTasks();
    this.MockTodayTasks = this.taskservice.getTodayTasks();
  }
  calculateTotalTime() {
    for (let task of this.MockYesterdayTasks) {
      this.totalhour += task.hours_spent;
      this.totalminute += task.minutes_spent;
    }
    //convering extra minutes to hours;
    var extrahour = 0;
    if (this.totalminute >= 60) {
      extrahour = Math.floor(this.totalminute / 60);
      this.totalminute = this.totalminute % 60;
    }
    this.totalhour += extrahour;
    this.total_hours_spent = this.totalhour;
    this.total_minutes_spent = this.totalminute;
  }

  modifyTime($event) {
    this.task1 = $event;
    console.log('performing event in parent');
    this.totalhour = 0;
    this.totalminute = 0;
    var old_hour = 0;
    var old_minute = 0;
    for (let task of this.MockYesterdayTasks) {
      if (task.task_id === this.task1.task_id) {
        old_hour = this.task1.hours_spent;
        old_minute = this.task1.minutes_spent;
        this.totalhour = (this.totalhour + this.task1.hours_spent);
        this.totalminute = (this.totalminute + this.task1.minutes_spent);
      } else {
        this.totalhour += task.hours_spent;
        this.totalminute += task.minutes_spent;
      }
    }
    //convering extra minutes to hours;
    var extrahour = 0;
    if (this.totalminute >= 60) {
      extrahour = Math.floor(this.totalminute / 60);
      this.totalminute = this.totalminute % 60;
    }
    this.totalhour += extrahour;
    if ((this.totalhour > 24) || (this.totalhour === 24 && this.totalminute > 0)) {
      this.task1.hours_spent = old_hour;
      this.task1.minutes_spent = old_minute;
      alert('Total time worked cannot be more than 24 hours.');
    }
    else {
      this.total_hours_spent = this.totalhour;
      this.total_minutes_spent = this.totalminute;
    }
  }


}
