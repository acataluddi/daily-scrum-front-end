import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task-model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { ProjectviewallService } from '../service/projectviewall.service';
import { Member } from '../model/member-model';
import { Injectable } from '@angular/core';
import { ProjectUpdated } from '../model/projectupdated-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { TaskArray } from '../model/task-array-model'

const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-task-page-admin',
  templateUrl: './task-page-admin.component.html',
  styleUrls: ['./task-page-admin.component.css']
})

export class TaskPageAdminComponent implements OnInit {

  currentProject;
  myDateValue: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  task_id;
  oldtodaytask: Task;
  oldyesterdaytask: Task;
  creatednewtoday = false;
  creatednewyesterday = false;
  hours_spent;
  minutes_spent;
  impediments;
  description;
  member_name;
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
  i = 0;

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
    private taskservice: ProcessIndividualTaskService,
    private employeeservice: AdminviewallserviceService,
    private viewallservice: ProjectviewallService,
    private http: Http,
  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-orange',
      showWeekNumbers: false
    });
  }

  email;
  todayTaskDate;
  projectId;
  ngOnInit() {
    this.currentProject = localStorage.getItem("currentProject");
    this.callMethod1();
    this.callMethod();

    this.employeeservice.getMembers()
      .subscribe(membersArr => this.getMembers(membersArr));

    this.oldtodaytask = new Task;
    this.oldyesterdaytask = new Task;
    this.calculateTotalTime();
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.myvalue = true;
    this.myDateValue = new Date();
    this.todayval = "Today, " + this.month + " " + this.date + ", " + this.year;
    this.yesterdayval = "Yesterday's Tasks";

  }
  p: number;
  total: number
  projectupdated: ProjectUpdated;
  projectArray: ProjectUpdated[];

  callMethod() {

    this.email;
    this.todayTaskDate;
    this.email = "neerajd@qburst.com";
    this.todayTaskDate = "2018-01-01";
    this.projectId = "1";
    this.taskservice.getTodays(this.todayTaskDate, this.email, this.projectId)
      .subscribe(data => this.getTodaysTask(data));
  }

  // callMethod2(a) {

  //   this.email;
  //   this.todayTaskDate;
  //   this.email = a;
  //   this.todayTaskDate = "2018-01-01";
  //   this.projectId = "1";
  //   this.taskservice.getTodays(this.todayTaskDate, this.email, this.projectId)
  //     .subscribe(data => this.getTodaysTask(data));
  // }


  /** 
  callMethod(a,b,c) {
    this.email=a;
    this.todayTaskDate=b;
    this.projectArray=c;
    this.taskservice.getTodays(this.todayTaskDate, this.email, this.projectId)
      .subscribe(data => this.getTodaysTask(data));  
  }*/


  callMethod1() {

    this.email = localStorage.getItem("email");
    this.viewallservice.getLoggedProjects(this.email)
      .subscribe(data => this.getloggedProjectsglobal(data));
  }
  getloggedProjectsglobal(Todays) {
    this.projectArray = Todays;
  }


  getTodaysTask(Todays) {
    this.MockTodayTasks = Todays;
    console.log("Look Under");
    this.calculateIndividualTime();
    this.calculateTotalTime();
  }
  MockToTasks: Task;
  MockTodayTasks: Task[];


  reaction() {
    this.total_hours_spent = 0;
    this.total_minutes_spent = 0;
    this.totalhour = 0;
    this.totalminute = 0;
    this.indTotalHour = 0;
    this.indTotalMins = 0;
    this.currentProject = localStorage.getItem("currentProject");
    this.calculateIndividualTime();
    this.calculateTotalTime();
  }

  // getNames() {
  //   this.http.get(this.viewallservice.apiURL)
  //     .subscribe(
  //       (res: Response) => {
  //         this.projectArray = res.json();
  //         console.log("Hello");
  //         this.total = this.projectArray.length;
  //         console.log(this.projectArray);
  //       })
  // }

 
  calculateTotalTime() {
    for (let projectupdated of this.projectArray) {
      if (projectupdated.projectName == this.currentProject) {
        for(let member of projectupdated.members){

        for (let MockToTasks of this.MockTodayTasks) {
          this.totalhour += MockToTasks.hourSpent;
          this.totalminute += MockToTasks.minuteSpent;
        }
        var extrahour = 0;
        if (this.totalminute >= 60) {
          extrahour = Math.floor(this.totalminute / 60);
          this.totalminute = this.totalminute % 60;
        } this.totalhour += extrahour;
        this.total_hours_spent = this.totalhour;
        this.total_minutes_spent = this.totalminute;
      }
    }
  }
  }
  indTotalHour = 0;
  indTotalMins = 0;
  calculateIndividualTime() {
    for (let MockToTasks of this.MockTodayTasks) {
      this.indTotalHour += MockToTasks.hourSpent;
      this.indTotalMins += MockToTasks.minuteSpent;
    }
    console.log(this.indTotalHour);
  }
  memberEmployee: Member;
  memberEmployeeArray: Member[];
  getMembers(membersArr): void {
    this.memberEmployeeArray = membersArr;
    console.log(this.memberEmployeeArray);
  }
  onDateChange(newDate: Date) {
    this.newDate = newDate;
    var d1 = new Date(newDate);
    (d1.setDate(d1.getDate() - 1));
    this.month = this.months[newDate.getMonth()];
    this.date = newDate.getDate();
    this.year = newDate.getFullYear();
    if ((newDate.getMonth() === this.d.getMonth()) && (newDate.getDate() === this.d.getDate()) && (newDate.getFullYear() === this.d.getFullYear())) {
      this.todayval = "Today, " + this.month + " " + this.date + ", " + this.year;
      this.yesterdayval = "Yesterday's Tasks";
    }
    else {
      this.todayval = this.month + " " + this.date + ", " + this.year;
      this.yesterdayval = this.months[d1.getMonth()] + " " + d1.getDate() + ", " + d1.getFullYear();
    }
  }
  getNextDate() {
    var d1 = new Date(this.newDate);
    (d1.setDate(d1.getDate() + 1));
    this.month = this.months[d1.getMonth()];
    this.date = d1.getDate();
    this.year = d1.getFullYear();
    if ((this.month === this.d.getMonth()) && (this.date === this.d.getDate()) && (this.year === this.d.getFullYear())) {
      this.todayval = "Today, " + this.month + " " + this.date + ", " + this.year;
      this.yesterdayval = "Yesterday's Tasks";
    }
    else {
      this.todayval = this.month + " " + this.date + ", " + this.year;
      this.yesterdayval = this.months[this.newDate.getMonth()] + " " + this.newDate.getDate() + ", " + this.newDate.getFullYear();
    }
    this.newDate = d1;
    this.myDateValue = d1;
  }
  getPreviousDate() {
    var d1 = new Date(this.newDate);
    (d1.setDate(d1.getDate() - 1));
    this.month = this.months[this.newDate.getMonth()];
    this.date = this.newDate.getDate();
    this.year = this.newDate.getFullYear();
    if ((this.newDate.getMonth() === this.d.getMonth()) && (this.newDate.getDate() === this.d.getDate()) && (this.newDate.getFullYear() === this.d.getFullYear())) {
      this.todayval = "Today, " + this.month + " " + this.date + ", " + this.year;
      this.yesterdayval = "Yesterday's Tasks";
    }
    else {
      this.todayval = this.month + " " + this.date + ", " + this.year;
      this.yesterdayval = this.months[d1.getMonth()] + " " + d1.getDate() + ", " + d1.getFullYear();
    }
    this.newDate = d1;
    this.myDateValue = d1;
  }
  getRandomColor() {
    var colors = ['rgb(12, 33, 93)', 'rgb(255, 177, 166)', 'rgb(63, 205, 195)'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
