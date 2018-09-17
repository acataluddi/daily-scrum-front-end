import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task-model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Http, Headers } from '@angular/http';
import { ProjectviewallService } from '../service/projectviewall.service';
import { Member } from '../model/member-model';
import { Injectable } from '@angular/core';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { IndividualMember } from '../model/user-task-model'
import { Subscription } from 'rxjs';
import { Project } from '../model/project-model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


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
  sub: any;

  currentProject;
  currentProjectId;
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
  hours;
  minutes;
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
  subscription: Subscription;
  color = ['rgb(12, 33, 93)', 'rgb(255, 177, 166)', 'rgb(63, 205, 195)'];
  Tasks: Task[];
  Task: Task;
  constructor(
    private taskservice: ProcessIndividualTaskService,
    private employeeservice: AdminviewallserviceService,
    private viewallservice: ProjectviewallService,
    private http: Http,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-orange',
      showWeekNumbers: false
    });
    this.sub = this.route.params.subscribe(params => {
      this.currentProject = params['name']
      this.projectId = +params['projectId'];
    });
    this.subscription = taskservice.newList.subscribe(
      data => {
        this.currentProject = data.projectName;
        this.projectId = data.projectId
        this.currentProject = localStorage.getItem("currentProject");
        this.a();
      });
  }
  email;
  todayTaskDate;
  projectId;
  ngOnInit() {

    this.currentProject = localStorage.getItem("currentProject");

    this.IndMembObj = this.initializeNewMember(this.IndMembObj);
    this.IndMembArray = [];
    this.memberEmployeeArray = [];
    this.todayTaskDate = "";
    this.employeeservice.getMembers()
      .subscribe(membersArr => this.getMembers(membersArr));
    this.projectupdate = this.initializeNewProject(this.projectupdate);
    this.getProjects();
    this.oldtodaytask = new Task;
    this.oldyesterdaytask = new Task;;
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.myvalue = true;
    this.myDateValue = new Date();
  }
  pindTotalHour
  total: number
  projectupdated: Project;
  projectArray: Project[];
  IndMembArray: IndividualMember[];
  IndMembObj: IndividualMember;
  projectupdate: Project;
  getProjects() {
    var userType = localStorage.getItem("userType")
    if (userType === "Admin" || userType === "Manager") {
      this.email = 'getall'
    } else {
      this.email = localStorage.getItem("email");
    }

    this.viewallservice.getLoggedProjects(this.email)
      .subscribe(data => this.getloggedProjectsglobal(data));
  }
  getloggedProjectsglobal(Todays) {
    this.projectArray = Todays;
    this.projectupdate = this.getRequiredProject(this.currentProject);
    this.total_hours_spent = 0;
    this.total_minutes_spent = 0;
    this.setAllMembers();
  }
  a() {
    this.IndMembArray = [];
    this.projectupdate = this.getRequiredProject(this.currentProject);
    this.total_hours_spent = 0;
    this.total_minutes_spent = 0;
    this.setAllMembers();
  }
  getRequiredProject(pname: string): Project {
    for (let individualProject of this.projectArray) {
      if (individualProject.projectName === pname) {
        return individualProject;
      }
    }
  }
  setAllMembers() {
    for (let member of this.projectupdate.members) {
      this.taskservice.getTodays(this.todayTaskDate, member.email, this.projectupdate.projectId)
        .subscribe(data => {
          for (let memberEmployee of this.memberEmployeeArray) {
            if (memberEmployee.email === member.email) {
              this.IndMembObj.name = memberEmployee.name;
              this.IndMembObj.imageurl = memberEmployee.imageurl;
              this.IndMembObj = this.calculateIndividualTime(this.IndMembObj, data);
              this.IndMembObj.tasks = data;
              this.IndMembArray.push(this.IndMembObj);
              this.IndMembObj = this.initializeNewMember(this.IndMembObj);
            }
          }
        });
    }
  }
  initializeNewProject(newProject: Project): Project {
    newProject = {
      projectId: '',
      projectDesc: "",
      members: [],
      projectName: ""
    }
    return newProject;
  }
  initializeNewMember(newMember: IndividualMember): IndividualMember {
    newMember = {
      name: '',
      hour: 0,
      minute: 0,
      imageurl: "",
      tasks: []
    }
    return newMember;
  }
  getTodaysTask(Todays) {
    this.MockTodayTasks = Todays;
  }
  MockToTasks: Task;
  MockTodayTasks: Task[];
  indTotalHour = 0;
  indTotalMins = 0;
  calculateIndividualTime(ob: IndividualMember, tsk) {
    this.indTotalHour = 0;
    this.indTotalMins = 0;
    for (let t of tsk) {
      this.indTotalHour += t.hourSpent;
      this.indTotalMins += t.minuteSpent;
    }
    var extrahour = 0;
    if (this.indTotalMins >= 60) {
      extrahour = Math.floor(this.totalminute / 60);
      this.indTotalMins = this.indTotalMins % 60;
    } this.indTotalHour += extrahour;
    ob.hour = this.indTotalHour;
    ob.minute = this.indTotalMins;

    this.total_hours_spent += this.indTotalHour;
    this.total_minutes_spent += this.indTotalMins;

    var totalextrahour = 0;
    if (this.total_minutes_spent >= 60) {
      totalextrahour = Math.floor(this.total_minutes_spent / 60);
      this.total_minutes_spent = this.total_minutes_spent % 60;
      this.total_hours_spent += totalextrahour;
    }
    return ob;
  }
  memberEmployee: Member;
  memberEmployeeArray: Member[];
  getMembers(membersArr): void {
    this.memberEmployeeArray = membersArr;
  }
  onDateChange(newDate: Date) {
    var nday = '';
    var nmonth = '';
    var ndate = '';
    if (newDate.getDate() < 10) {
      nday += '0' + newDate.getDate();
    } else {
      nday += newDate.getDate();
    }
    if ((newDate.getMonth() + 1) < 10) {
      nmonth += '0' + (newDate.getMonth() + 1);
    } else {
      nmonth += (newDate.getMonth() + 1);
    }
    ndate += nday + '-' + nmonth + '-' + newDate.getFullYear();
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
    this.todayTaskDate = ndate;
    this.total_hours_spent = 0;
    this.total_minutes_spent = 0;
    this.totalhour = 0;
    this.totalminute = 0;
    this.indTotalHour = 0;
    this.indTotalMins = 0;
    this.currentProject = localStorage.getItem("currentProject");
    this.IndMembArray = [];
    this.a();
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
  viewMyTasks(): void {
    this.router.navigate(['/daily-status', this.projectId, this.currentProject]);
  }

}
