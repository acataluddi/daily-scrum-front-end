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

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  d = new Date();
  month;
  date;
  year;

  constructor(
    private taskservice: ProcessIndividualTaskService
  ) { }

  ngOnInit() {
    this.getTasks();
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
  }

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

}
