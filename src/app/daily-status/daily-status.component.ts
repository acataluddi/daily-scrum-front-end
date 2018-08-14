import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { IndividualTaskComponent } from "../individual-task/individual-task.component";
import { Task } from '../model/task-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.component.html',
  styleUrls: ['./daily-status.component.css']
})
export class DailyStatusComponent implements OnInit {

  task: Task;
  task1: Task;
  emptyTask: Task;
  MockYesterdayTasks: Task[];
  MockTodayTasks: Task[];

  task_id;
  hours_spent;
  minutes_spent;
  impediments;
  description;
  task_completed;
  total_hours_spent = 0;
  total_minutes_spent = 0;
  showDatePicker = false;

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  d = new Date();
  month;
  date;
  year;
  myvalue;
  constructor(
    private taskservice: ProcessIndividualTaskService
  ) { }

  ngOnInit() {
    this.getTasks();
    this.calculateTotalTime();
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.myvalue = true;
  }
  timeArray = Array; //Array type captured in a variable
  hours: number = 23;
  minutes: number = 59;
  getTasks() {
    this.MockYesterdayTasks = this.taskservice.getYesterdayTasks();
    this.MockTodayTasks = this.taskservice.getTodayTasks();
  }


  initializeEmptyTask() {
    this.emptyTask = {
      task_id: 0,
      description: null,
      hours_spent: 0,
      minutes_spent: 0,
      impediments: null,
      task_completed: false
    }
  }

  totalhour = 0;
  totalminute = 0;
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
    var old_hour=0;
    var old_minute=0;
    for (let task of this.MockYesterdayTasks) {
      if (task.task_id === this.task1.task_id) {
        old_hour=this.task1.hours_spent;
        old_minute=this.task1.minutes_spent;
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
    if((this.totalhour>24) || (this.totalhour===24 && this.totalminute>0)){
      this.task1.hours_spent=old_hour;
      this.task1.minutes_spent=old_minute;
      alert('Total time worked cannot be more than 24 hours.');
    }
    else{
      this.total_hours_spent = this.totalhour;
      this.total_minutes_spent = this.totalminute;
    }
  }

  addTodayTask(){
    var ts = new Task();
    ts = this.initializeNew(ts);
    this.MockTodayTasks.push(ts);

  }

  addYesterdayTask(){

    var ts = new Task();
    ts = this.initializeNew(ts);
    this.MockYesterdayTasks.push(ts);
  }

   initializeNew(ts: Task):Task{
    ts = {
      task_id: 0,
      description: null,
      hours_spent: 0,
      minutes_spent: 0,
      impediments: null,
      task_completed: false
    }
    return ts;
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
