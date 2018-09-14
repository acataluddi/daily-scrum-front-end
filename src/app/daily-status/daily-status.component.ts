import { Component, OnInit, Injectable } from '@angular/core';
import { Task } from '../model/task-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

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
  TodayTasks: Task[];
  YesterdayTasks: Task[];

  myDateValue: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
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
  todayTaskDate;
  yesterdayTaskDate;
  todayDate = new Date();
  email = localStorage.getItem("email");
  projectId;
  status = false;
  lastEdit;
  lastEditString = '';
  subscription: Subscription;
  sub: any;

  constructor(
    private taskservice: ProcessIndividualTaskService,
    private datepipe: DatePipe,
    private route: ActivatedRoute

  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-orange',
      showWeekNumbers: false
    });
    this.subscription = taskservice.newList.subscribe(
      data => {
        this.projectId = data.projectId
        this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)

      });
  }

  ngOnInit() {
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

    this.sub = this.route.params.subscribe(params => {
      var name = params['name']
      this.projectId = +params['projectId'];
    });
    console.log(this.projectId)
    this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTodaysTask(Todays) {
    this.MockTodayTasks = Todays;
    this.TodayTasks = Todays;;
    this.status = true;
  }

  getYesterdaysTask(Yesterdays) {
    this.MockYesterdayTasks = Yesterdays;
    this.YesterdayTasks = Yesterdays;
  }

  calculateTotalTime() {
    this.totalhour = 0;
    this.totalminute = 0;
    for (let task of this.MockYesterdayTasks) {
      this.totalhour += task.hourSpent;
      this.totalminute += task.minuteSpent;
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
    console.log(this.totalhour);//console.log(this.totalhour);
    console.log(this.totalminute);
  }

  modifyTime($event) {
    this.task1 = $event;
    console.log('performing event in parent');
    this.totalhour = 0;
    this.totalminute = 0;
    var old_hour = 0;
    var old_minute = 0;

    // this.newYesterdayTask(this.task1);

    for (let task of this.MockYesterdayTasks) {
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

    //convering extra minutes to hours;
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
      this.total_hours_spent = this.totalhour;
      this.total_minutes_spent = this.totalminute;
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
      // console.log(this.oldtodaytask);
    }
    // console.log(this.MockTodayTasks)
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

  //Add new task: Today
  newTodayTask($event) {
    this.task1 = $event;
    var editTime = new Date()
    var formateditTime = this.datepipe.transform(editTime, "dd-MM-yyyy HH:mm:ss")
    console.log(formateditTime)
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
    this.getLastEdit(this.YesterdayTasks)
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

  getLastEdit(YesterdayTasks) {
    if (YesterdayTasks.length != 0) {
      var edit = new Array()
      var day = new Array(7);
      day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      for (let task of YesterdayTasks) {
        let datevar = new Date(task.lastEdit)
        console.log(datevar)
        edit.push(datevar)
      }
      edit.sort()
      this.lastEdit = edit[edit.length - 1]
      var weekday = day[this.lastEdit.getDay()]
      var time = this.lastEdit.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      this.lastEditString = weekday + " " + time
    } else {
      this.lastEditString = ''
    }
  }

  getTask(today, yesterday, email, projectId) {
    this.taskservice.getTodays(today, email, projectId)
      .subscribe(data => this.getTodaysTask(data));
    this.taskservice.getYesterdays(yesterday, email, projectId)
      .subscribe(data => {
        this.getYesterdaysTask(data);
        this.calculateTotalTime()
        this.getLastEdit(this.YesterdayTasks)
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
}
