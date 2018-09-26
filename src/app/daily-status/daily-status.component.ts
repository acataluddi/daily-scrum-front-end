import { Component, OnInit, Injectable } from '@angular/core';
import { Project, member } from "../model/project-model";
import { Task } from '../model/task-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NavigationdataService } from '../service/navigationdata.service'
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.component.html',
  styleUrls: ['./daily-status.component.css']
})
export class DailyStatusComponent implements OnInit {

  currentProject: string = ''

  userEmail: string = localStorage.getItem("email")

  task: Task;
  task1: Task;

  MockYesterdayTasks: Task[];
  MockTodayTasks: Task[];
  TodayTasks: Task[];
  YesterdayTasks: Task[];

  myDateValue: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  datachanged: member;
  taskHolderName = '';
  T: Task[];

  task_id;
  oldtodaytask: Task;
  oldyesterdaytask: Task;
  creatednewtoday = false;
  creatednewyesterday = false;
  hours_spent;
  minutes_spent;
  impediments;
  description;
  task_completed;
  total_hours_spent1 = 0;
  total_minutes_spent1 = 0;
  total_hours_spent2 = 0;
  total_minutes_spent2 = 0;
  showDatePicker = false;
  timeArray = Array; //Array type captured in a variable
  hours = 23;
  minutes = 59;
  todayval;
  yesterdayval;
  totalhour = 0;
  totalminute = 0;
  minDate: Date;
  maxDate: Date;

  disable = true;
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
  todayTaskDate;
  yesterdayTaskDate;
  todayDate = new Date();
  email = localStorage.getItem("email");
  UserType;
  flag = false;
  projectId = localStorage.getItem("projectId");
  status = false;
  lastEdit1;
  lastEdit2;
  lastEditString1 = '';
  lastEditString2 = '';
  subscription: Subscription;
  sub: any;
  editable;

  constructor(
    public router: Router,
    private taskservice: ProcessIndividualTaskService,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private data: NavigationdataService,
    private socialAuthService: AuthService,
    private loginservice: LoginService
  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-orange',
      showWeekNumbers: false
    });

    this.sub = this.route.params.subscribe(params => {
      this.currentProject = params['name']
      this.projectId = params['projectId'];
    });

    this.subscription = taskservice.newList.subscribe(
      data => {
        this.projectId = data.projectId
        this.currentProject = data.projectName
        this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
      });
  }

  ngOnInit() {
    this.minDate = new Date(2018, 8, 10);
    this.maxDate = new Date();
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            this.UserType = msg.userType;
            if (this.UserType === "Admin" || this.UserType === "Manager") {
              this.flag = true;
            } else {
              this.flag = false
              this.editable = true
            }
          });
      }
    });

    this.checkthis()
    this.oldtodaytask = new Task;
    this.oldyesterdaytask = new Task;

    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.myvalue = true;
    this.myDateValue = new Date();
    this.todayval = "Today, " + this.month + " " + this.date + ", " + this.year;
    this.yesterdayval = "Yesterday's Tasks";

    this.todayTaskDate = this.datepipe.transform(this.todayDate, "dd-MM-yyyy");
    this.todayDate.setDate(this.todayDate.getDate() - 1);
    this.yesterdayTaskDate = this.datepipe.transform(this.todayDate, "dd-MM-yyyy");

    this.projectId = localStorage.getItem("projectId")
    this.currentProject = localStorage.getItem("currentProject")

    this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTodaysTask(Todays) {
    this.MockTodayTasks = Todays;
    this.TodayTasks = Todays;
    this.status = true;
  }

  getYesterdaysTask(Yesterdays) {
    this.MockYesterdayTasks = Yesterdays;
    this.YesterdayTasks = Yesterdays;
  }

  calculateTotalTime(taskArray, value) {
    this.totalhour = 0;
    this.totalminute = 0;

    for (let task of taskArray) {
      this.totalhour += task.hourSpent;
      this.totalminute += task.minuteSpent;
    }

    var extrahour = 0;

    if (this.totalminute >= 60) {
      extrahour = Math.floor(this.totalminute / 60);
      this.totalminute = this.totalminute % 60;
    }

    this.totalhour += extrahour;

    switch (value) {
      case 1: this.total_hours_spent1 = this.totalhour;
        this.total_minutes_spent1 = this.totalminute;
        break;
      case 2: this.total_hours_spent2 = this.totalhour;
        this.total_minutes_spent2 = this.totalminute;
        break;
    }
  }

  modifyTime($event, taskArray, value) {
    this.task1 = $event;
    this.totalhour = 0;
    this.totalminute = 0;
    var old_hour = 0;
    var old_minute = 0;

    for (let task of taskArray) {
      if (task.taskId === this.task1.taskId) {
        old_hour = this.task1.hourSpent;
        old_minute = this.task1.minuteSpent;
        this.totalhour = (this.totalhour + this.task1.hourSpent);
        this.totalminute = (this.totalminute + this.task1.minuteSpent);
      } else {
        this.totalhour += task.hourSpent;
        this.totalminute += task.minuteSpent;
      }
    }

    var extrahour = 0;
    if (this.totalminute >= 60) {
      extrahour = Math.floor(this.totalminute / 60);
      this.totalminute = this.totalminute % 60;
    }
    this.totalhour += extrahour;
    if ((this.totalhour > 24) || (this.totalhour === 24 && this.totalminute > 0)) {
      this.task1.hourSpent = old_hour;
      this.task1.minuteSpent = old_minute;
      alert('Total time worked cannot be more than 24 hours.');
    }
    else {
      switch (value) {
        case 1: this.total_hours_spent1 = this.totalhour;
          this.total_minutes_spent1 = this.totalminute;
          break;
        case 2: this.total_hours_spent2 = this.totalhour;
          this.total_minutes_spent2 = this.totalminute;
          break;
      }
    }
  }

  addTodayTask() {
    if (this.creatednewtoday === true) {
      if (this.oldtodaytask.description !== '') {
        var ts = new Task();
        ts = this.initializeNew(ts);
        this.oldtodaytask = ts;
        this.MockTodayTasks.push(ts);
        this.creatednewtoday = true;
      }
    }
    else if (this.creatednewtoday === false) {
      var ts = new Task();
      ts = this.initializeNew(ts);
      this.oldtodaytask = ts;
      this.MockTodayTasks.push(ts);
      this.creatednewtoday = true;
    }
  }

  addYesterdayTask() {
    if (this.creatednewyesterday === true) {
      if (this.oldyesterdaytask.description !== '') {
        var ts = new Task();
        ts = this.initializeNew(ts);
        this.oldyesterdaytask = ts;
        this.MockYesterdayTasks.push(ts);
        this.creatednewyesterday = true;
      }
    }
    else if (this.creatednewyesterday === false) {
      var ts = new Task();
      ts = this.initializeNew(ts);
      this.oldyesterdaytask = ts;
      this.MockYesterdayTasks.push(ts);
      this.creatednewyesterday = true;
    }
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
      memberEmail: this.email,
      taskId: newid.toString(),
      description: '',
      hourSpent: 0,
      minuteSpent: 0,
      impediments: '',
      taskCompleted: false,
      projectId: this.projectId,
      taskDate: '',
      lastEdit: ''
    }
    return ts;
  }

  onDateChange(newDate: Date) {
    if (newDate.getDate() === this.maxDate.getDate() &&
      newDate.getMonth() === this.maxDate.getMonth() &&
      newDate.getFullYear() === this.maxDate.getFullYear()) {
      document.getElementById("rightarrow").classList.add('blocked-arrow');
    } else {
      document.getElementById("rightarrow").classList.remove('blocked-arrow');
    }

    if (newDate.getDate() === this.minDate.getDate() &&
      newDate.getMonth() === this.minDate.getMonth() &&
      newDate.getFullYear() === this.minDate.getFullYear()) {
      document.getElementById("leftarrow").classList.add('blocked-arrow');
    } else {
      document.getElementById("leftarrow").classList.remove('blocked-arrow');
    }

    if (this.status) {
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
      this.getData(newDate);
    }
  }

  getNextDate() {
    var d1 = new Date(this.newDate);
    if (d1.getDate() !== this.maxDate.getDate() &&
      d1.getMonth() === this.maxDate.getMonth() &&
      d1.getFullYear() === this.maxDate.getFullYear()) {
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
  }
  getPreviousDate() {
    var d1 = new Date(this.newDate);
    if (d1.getDate() !== this.minDate.getDate() &&
      d1.getMonth() === this.minDate.getMonth() &&
      d1.getFullYear() === this.minDate.getFullYear()) {
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
  }

  checkthis() {
    this.data.currentdata$.subscribe(datachanged => {
      this.datachanged = datachanged
      if (this.userEmail == this.datachanged.email) {
        this.editable = true;
        this.taskHolderName = 'My Tasks';
      } else {
        this.editable = false;
        this.taskHolderName = this.datachanged.name + "'s Tasks";
      }
      this.email = this.datachanged.email;
      this.projectId = localStorage.getItem("projectId")
      this.currentProject = localStorage.getItem("currentProject")
    });
  }

  newTodayTask($event) {
    this.task1 = $event;
    var editTime = new Date()
    var formateditTime = this.datepipe.transform(editTime, "MM-dd-yyyy HH:mm:ss")
    if (this.newOld(this.task1, this.TodayTasks)) {
      //insert
      if (this.task1.taskDate == '') {
        this.task1.taskDate = this.todayTaskDate;
        this.task1.projectId = this.projectId;
        this.task1.lastEdit = formateditTime
        this.taskservice.addNewTask(this.task1)
          .subscribe(msg => console.log(msg));
      } else {
        //update
        this.task1.lastEdit = formateditTime
        this.taskservice.updateOldTask(this.task1)
          .subscribe(msg => console.log(msg));
      }
    }
    else {
      //update
      this.task1.lastEdit = formateditTime
      this.taskservice.updateOldTask(this.task1)
        .subscribe(msg => console.log(msg));
    }
    this.getLastEdit(this.TodayTasks, 2)
  }

  //Add new task: Yesterday
  newYesterdayTask(newtask) {
    this.task1 = newtask
    var editTime = new Date()
    var formateditTime = this.datepipe.transform(editTime, "MM-dd-yyyy HH:mm:ss")

    if (this.newOld(newtask, this.YesterdayTasks)) {
      //insert
      if (this.task1.taskDate == '') {
        this.task1.taskDate = this.yesterdayTaskDate;
        this.task1.projectId = this.projectId;
        this.task1.lastEdit = formateditTime
        this.taskservice.addNewTask(this.task1).subscribe(
          msg => console.log(msg));
      } else {
        this.task1.lastEdit = formateditTime
        this.taskservice.updateOldTask(this.task1)
          .subscribe(msg => console.log(msg));
      }
    } else {
      //update
      this.task1.lastEdit = formateditTime
      this.taskservice.updateOldTask(this.task1)
        .subscribe(msg => console.log(msg));
    }
    this.getLastEdit(this.YesterdayTasks, 1)
  }

  newOld(keyTask, taskArray) {
    var flag = true;
    var length = taskArray.length;
    if (length == 0) {
      flag = true
    }
    else {
      var task = taskArray[length - 1]
      if (keyTask.taskId == task.taskId) {
        flag = true;
      }
      else {
        flag = false
      }
    }
    return flag;
  }

  getData(changedDate) {
    //get tasks from db on date change
    var td = changedDate;
    var yd = new Date(changedDate);
    (yd.setDate(changedDate.getDate() - 1));
    this.todayTaskDate = this.datepipe.transform(td, "dd-MM-yyyy");
    this.yesterdayTaskDate = this.datepipe.transform(yd, "dd-MM-yyyy");

    this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
  }

  getLastEdit(taskArray, value) {
    if (taskArray.length != 0) {
      var newDate = new Date()
      var edit = new Array()
      var day = new Array(7);
      var weekday
      var inweek
      let monthDate: string;
      day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      for (let task of taskArray) {
        let datevar = new Date(task.lastEdit)
        edit.push(datevar)
      }
      edit.sort()
      var lastEdit = edit[edit.length - 1]
      var dateDiff = newDate.getDate() - lastEdit.getDate()
      if (dateDiff <= 7) {
        weekday = day[lastEdit.getDay()]
        inweek = true
      } else {
        inweek = false
        let date = lastEdit.getDate()
        let month = this.months[lastEdit.getMonth()]
        monthDate = month + " " + date
      }
      var time = lastEdit.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      if (value == 1) {
        if (inweek) {
          this.lastEditString1 = weekday + " " + time
        } else {
          this.lastEditString1 = monthDate + " " + time
        }
      } else {
        if (inweek) {
          this.lastEditString2 = weekday + " " + time
        } else {
          this.lastEditString2 = monthDate + " " + time
        }
      }
    } else {
      if (value == 1) {
        this.lastEditString1 = ''
      } else {
        this.lastEditString2 = ''
      }
    }
  }

  getTask(today, yesterday, email, projectId) {
    this.taskservice.getTodays(today, email, projectId)
      .subscribe(data1 => {
        this.getTodaysTask(data1)
        this.calculateTotalTime(this.MockTodayTasks, 2)
        this.getLastEdit(this.TodayTasks, 2)
      });
    this.taskservice.getYesterdays(yesterday, email, projectId)
      .subscribe(data => {
        this.getYesterdaysTask(data);
        this.calculateTotalTime(this.MockYesterdayTasks, 1)
        this.getLastEdit(this.YesterdayTasks, 1)
      });
  }

  popTask(taskArray, task) {
    if (task.description == null || task.description == '') {
      taskArray.pop();
    }
    if (taskArray == this.MockTodayTasks) {
      this.creatednewtoday = false
    } else {
      this.creatednewyesterday = false
    }
  }

  viewAllTasks(): void {
    this.router.navigate(['/task-page-admin', this.projectId, this.currentProject]);
  }

  changeEmail(taskMember) {
    if (this.userEmail == taskMember.email) {
      this.editable = true;
      this.taskHolderName = 'My Tasks'
    } else {
      this.editable = false
      this.taskHolderName = taskMember.name + "'s Task";
    }
    this.email = taskMember.email;
    this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
  }
}
