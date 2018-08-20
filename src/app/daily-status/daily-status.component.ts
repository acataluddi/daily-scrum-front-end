import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { IndividualTaskComponent } from "../individual-task/individual-task.component";
import { Task } from '../model/task-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.component.html',
  styleUrls: ['./daily-status.component.css']
})
export class DailyStatusComponent implements OnInit {

  task: Task;
  task1: Task;
  MockYesterdayTasks: Task[];
  MockTodayTasks: Task[];
  myDateValue: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  task_id;
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

  addTodayTask() {
    var ts = new Task();
    ts = this.initializeNew(ts);
    this.MockTodayTasks.push(ts);

  }

  addYesterdayTask() {

    var ts = new Task();
    ts = this.initializeNew(ts);
    this.MockYesterdayTasks.push(ts);
  }

  initializeNew(ts: Task): Task {
    this.d = new Date();
    this.monthval = this.d.getMonth();
    this.monthval = this.monthval + 1;
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.hour = this.d.getHours();
    this.minute = this.d.getMinutes();
    this.second = this.d.getSeconds();
    if (this.date < 10) {
      this.date = '0' + this.date;
    }
    if (this.monthval < 10) {
      this.monthval = '0' + this.monthval;
    }
    if (this.hour < 10) {
      this.hour = '0' + this.hour;
    }
    if (this.minute < 10) {
      this.minute = '0' + this.minute;
    }
    if (this.second < 10) {
      this.second = '0' + this.second;
    }
    var newid = parseInt(this.date.toString() + this.monthval.toString() + this.year.toString() + this.hour.toString() + this.minute.toString() + this.second.toString());
    ts = {
      task_id: newid,
      description: '',
      hours_spent: 0,
      minutes_spent: 0,
      impediments: '',
      task_completed: false
    }
    return ts;
  }

  onDateChange(newDate: Date) {
    var d1 = new Date(newDate);
    (d1.setDate(d1.getDate()-1));
    this.month = this.months[newDate.getMonth()];
    this.date = newDate.getDate();
    this.year = newDate.getFullYear();
    if ((newDate.getMonth() === this.d.getMonth()) && (newDate.getDate() === this.d.getDate()) && (newDate.getFullYear() === this.d.getFullYear())) {
      this.todayval = "Today, " + this.month + " " + this.date + ", " + this.year;
      this.yesterdayval ="Yesterday's Tasks";
    }
    else {
      this.todayval = this.month + " " + this.date + ", " + this.year;
      this.yesterdayval =this.months[d1.getMonth()] + " " + d1.getDate() + ", " + d1.getFullYear();
    }
  }
  // onChange(newtime, task_id, t) {
  //   for (let yesterdayTask of this.MockYesterdayTasks) {
  //     if (yesterdayTask.task_id == task_id) {
  //       if(t===1){
  //         yesterdayTask.hours_spent = newtime;
  //         console.log(yesterdayTask);
  //         console.log("Hours spent changed");
  //       }
  //       if(t===2){
  //         yesterdayTask.minutes_spent = newtime;
  //         console.log(yesterdayTask);
  //         console.log("Minutes spent changed");
  //       }
  //     }
  //   }
  // }
}
