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
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.myvalue = true;
    this.initializeEmptyTask();
  }
  timeArray = Array; //Array type captured in a variable
  hours: number = 23;
  minutes: number = 59;
  getTasks() {
    this.MockYesterdayTasks = this.taskservice.getYesterdayTasks();
    this.MockTodayTasks = this.taskservice.getTodayTasks();

    var totalhour = 0;
    var totalminute = 0;
    for (let task of this.MockYesterdayTasks) {
      totalhour += task.hours_spent;
      totalminute += task.minutes_spent;
      // if (task.task_id === 1) {
      //   this.task_id = task.task_id;
      //   this.hours_spent = task.hours_spent;
      //   this.minutes_spent = task.minutes_spent;
      //   this.impediments = task.impediments;
      //   this.description = task.description;
      //   this.task_completed = task.task_completed;
      // }
    }
    //convering extra minutes to hours;
    var extrahour = 0;
    if (totalminute >= 60) {
      extrahour = Math.floor(totalminute / 60);
      totalminute = totalminute % 60;
    }
    totalhour += extrahour;
    this.total_hours_spent = totalhour;
    this.total_minutes_spent = totalminute;
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
