import { Component, OnInit, Injectable, TemplateRef } from '@angular/core';
import { Project, member } from "../model/project-model";
import { Task } from '../model/task-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NavigationdataService } from '../service/navigationdata.service'
import { DatePipe } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  modalRef: BsModalRef
  userEmail: string = localStorage.getItem("email")

  task: Task;
  task1: Task;

  MockYesterdayTasks: Task[];
  MockTodayTasks: Task[];
  TodayTasks: Task[];
  YesterdayTasks: Task[];

  selectedYesterdaysTasks: Task[] = [];
  selectedTodaysTasks: Task[] = [];

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

  months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
  email = localStorage.getItem("taskEmail");
  UserType;
  flag = false;
  projectId = localStorage.getItem("projectId");
  status = false;

  lastEdit1;
  lastEdit2;

  lastEditString1 = '';
  lastEditString2 = '';

  editable1;
  editable2;

  checkbox1 = false;
  checkbox2 = false;

  private eventsSubject1 = new Subject<boolean>();
  event1 = this.eventsSubject1.asObservable()
  private eventsSubject2 = new Subject<boolean>();
  event2 = this.eventsSubject2.asObservable()

  changeProjectsubscription: Subscription;
  routeparamsub: any;
  selectmem: Subscription;

  name = localStorage.getItem("taskName")

  constructor(
    public router: Router,
    private taskservice: ProcessIndividualTaskService,
    private datepipe: DatePipe,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private data: NavigationdataService,
    private socialAuthService: AuthService,
    private loginservice: LoginService
  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-orange',
      showWeekNumbers: false
    });

    this.routeparamsub = this.route.params.subscribe(params => {
      this.currentProject = params['name']
      this.projectId = params['projectId'];
    });

    this.changeProjectsubscription = taskservice.newList.subscribe(
      data => {
        var myEmail = this.userEmail
        var inProject;

        this.projectId = data.projectId
        this.currentProject = data.projectName

        var myMemobj = data.members.find(function (element) {
          return element.email == myEmail;
        });
        if (myMemobj != null) {
          inProject = true
        } else {
          inProject = false
        }

        if (inProject) {
          this.datachanged = myMemobj;
          this.setLocalStorage(myMemobj)
          var taskEmail = myMemobj.email
          var taskName = myMemobj.name
          this.email = taskEmail

          this.setMinMaxDate(myMemobj)
        } else {
          for (let member of data.members) {
            if (member.isActive) {
              var firstMember = member
              break
            }
          }
          this.datachanged = firstMember;
          this.setLocalStorage(firstMember)
          var taskEmail = firstMember.email
          var taskName = firstMember.name
          this.email = taskEmail
          this.setMinMaxDate(firstMember)

        }

        if (this.userEmail == this.email) {
          this.setEditable(myMemobj)
        } else {

          this.editable1 = false
          this.editable2 = false
          if (taskName == '') {
            taskName = 'Unnamed'
          }

          this.taskHolderName = taskName;
        }
        localStorage.setItem("taskEmail", this.email)
        localStorage.setItem("taskName", taskName)

        this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
      });

    this.selectmem = data.currentdata$.subscribe(datachanged => {
      this.datachanged = datachanged

      this.setMinMaxDate(datachanged)

      if (this.UserType == 'Admin' || this.UserType == 'Manager') {

        if (this.userEmail == this.datachanged.email) {
          this.setEditable(datachanged)
        } else {
          this.editable1 = false
          this.editable2 = false
          if (this.datachanged.name == '') {
            this.datachanged.name = 'Unnamed'
          }
          this.taskHolderName = this.datachanged.name;
        }
      } else if (this.userEmail == this.datachanged.email) {
        this.setEditable(datachanged)
      } else {
        this.editable1 = false
        this.editable2 = false
        if (this.datachanged.name == '') {
          this.datachanged.name = 'Unnamed'
        }
        this.taskHolderName = this.datachanged.name;
      }
      this.email = this.datachanged.email;
      this.projectId = localStorage.getItem("projectId")
      this.currentProject = localStorage.getItem("currentProject")
    });

  }

  ngOnInit() {

    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            this.UserType = msg.userType;
            if (this.UserType === "Admin" || this.UserType === "Manager") {
              this.flag = true;
            } else {
              this.flag = false
            }
          });
      }
    });
    // this.checkthis()
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
    this.routeparamsub.unsubscribe();
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
    if ((this.totalhour > 16) || (this.totalhour === 16 && this.totalminute > 0)) {
      // this.task1.hourSpent = old_hour;
      // this.task1.minuteSpent = old_minute;
      // var template = document.getElementById("template");
      // this.open()
      alert('Total time worked cannot be more than 16 hours.');

      switch (value) {
        case 1: this.creatednewyesterday = true
          this.total_hours_spent1 = this.totalhour;
          this.total_minutes_spent1 = this.totalminute;
          this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
          break;
        case 2: this.creatednewtoday = true
          this.total_hours_spent2 = this.totalhour;
          this.total_minutes_spent2 = this.totalminute;
          this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
          break;
      }
    }
    else {
      switch (value) {
        case 1: this.total_hours_spent1 = this.totalhour;
          this.total_minutes_spent1 = this.totalminute;
          this.creatednewyesterday = false
          this.newYesterdayTask(this.task1)
          break;
        case 2: this.total_hours_spent2 = this.totalhour;
          this.total_minutes_spent2 = this.totalminute;
          this.creatednewtoday = false
          this.newTodayTask(this.task1)
          break;
      }
    }
  }

  addTodayTask() {
    // console.log(this.total_hours_spent2)
    if ((this.total_hours_spent2 > 16) || (this.total_hours_spent2 === 16 && this.total_minutes_spent2 >= 0)) {
      this.creatednewtoday = true;
    } else {
      this.creatednewtoday = false;
    }
    if (this.creatednewtoday === false) {
      if (this.oldtodaytask.description !== '') {
        var ts = new Task();
        ts = this.initializeNew(ts);
        this.oldtodaytask = ts;
        this.MockTodayTasks.push(ts);
        this.creatednewtoday = false;
        setTimeout(() => { document.getElementById('description' + ts.taskId).focus() });
      }
    }
  }

  addYesterdayTask() {
    if ((this.total_hours_spent1 > 16) || (this.total_hours_spent1 === 16 && this.total_minutes_spent1 >= 0)) {
      this.creatednewyesterday = true;
    } else {
      this.creatednewyesterday = false;
    }
    if (this.creatednewyesterday === false) {
      if (this.oldyesterdaytask.description != '') {
        var ts = new Task();
        ts = this.initializeNew(ts);
        this.oldyesterdaytask = ts;
        this.MockYesterdayTasks.push(ts);
        this.creatednewyesterday = false;
        setTimeout(() => { document.getElementById('description' + ts.taskId).focus() });
      }

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

    if (this.userEmail == this.datachanged.email) {
      var currentDate = new Date(newDate)
      var currentDateShort = this.datepipe.transform(currentDate, "dd-MM-yyyy");
      var myAddDateArray = this.datachanged.addedDate.split("-")
      var myAddDate = new Date(+myAddDateArray[2], +(myAddDateArray[1]) - 1, +myAddDateArray[0])
      var myAddDateShort = this.datepipe.transform(myAddDate, "dd-MM-yyyy");
      if (this.datachanged.isActive && currentDate >= myAddDate) {
        if (currentDateShort === myAddDateShort) {
          this.editable1 = false
          this.editable2 = true
        } else {
          this.editable1 = true
          this.editable2 = true
        }
      } else {
        this.editable1 = false
        this.editable2 = false
      }
    } else {
      this.editable1 = false
      this.editable2 = false
    }
  }

  getNextDate() {
    var d1 = new Date(this.newDate);
    if (d1.toDateString() !== this.maxDate.toDateString()) {
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
    if (d1.toDateString() !== this.minDate.toDateString()) {
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

  newTodayTask($event) {
    this.task1 = $event;
    var editTime = new Date()
    var formateditTime = editTime.toString()
    if (this.newOld(this.task1, this.TodayTasks)) {
      //insert
      if (this.task1.taskDate == '') {
        this.task1.taskDate = this.todayTaskDate;
        this.task1.projectId = this.projectId;
        this.task1.lastEdit = formateditTime
        this.taskservice.addNewTask(this.task1)
          .subscribe(msg => console.log(msg));
          this.checkbox2 = false
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
    this.calculateTotalTime(this.MockTodayTasks, 2)
  }

  //Add new task: Yesterday
  newYesterdayTask(newtask) {
    this.task1 = newtask
    var editTime = new Date()
    var formateditTime = editTime.toString()

    if (this.newOld(newtask, this.YesterdayTasks)) {
      //insert
      if (this.task1.taskDate == '') {
        this.task1.taskDate = this.yesterdayTaskDate;
        this.task1.projectId = this.projectId;
        this.task1.lastEdit = formateditTime
        this.taskservice.addNewTask(this.task1).subscribe(
          msg => console.log(msg));
        this.checkbox1 = false
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
    this.calculateTotalTime(this.MockYesterdayTasks, 1)
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
        let month = this.months_short[lastEdit.getMonth()]

        monthDate = month + " " + date
      }
      var time = lastEdit.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      if (value == 1) {
        if (inweek) {
          this.lastEditString1 = weekday + " " + time
        } else {
          this.lastEditString1 = monthDate + ", " + time
        }
      } else {
        if (inweek) {
          this.lastEditString2 = weekday + " " + time
        } else {
          this.lastEditString2 = monthDate + ", " + time
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
      var index = taskArray.indexOf(task);
      taskArray.splice(index, 1);
      this.oldyesterdaytask.description = undefined;
      this.oldtodaytask.description = undefined;
      // taskArray.pop();
    }
    if (taskArray == this.MockTodayTasks) {
      this.creatednewtoday = false
    } else {
      this.creatednewyesterday = false
    }
  }

  viewAllTasks(): void {
    var sdate = localStorage.getItem("startDate")
    var thePName = localStorage.getItem('currentProject')
    this.router.navigate(['/task-page-admin', this.projectId, thePName, sdate])
    // this.router.navigate(['/task-page-admin', this.projectId, this.currentProject]);
  }

  changeEmail(taskMember) {
    this.setMinMaxDate(taskMember)
    if (this.userEmail == taskMember.email) {
      this.setEditable(taskMember)
    } else {
      this.editable1 = false
      this.editable2 = false
      if (taskMember.name == '') {
        taskMember.name = 'Unnamed'
      }
      this.taskHolderName = taskMember.name;
    }
    this.email = taskMember.email;
    this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
  }

  setLocalStorage(memobj) {
    localStorage.setItem('taskEmail', memobj.email)
    localStorage.setItem('taskName', memobj.name)
    localStorage.setItem('addedDate', memobj.addedDate)
    localStorage.setItem("deletedDate", memobj.deletedDate)
    localStorage.setItem("isActive", memobj.isActive)
  }

  setEditable(member) {
    var myAddDateArray = member.addedDate.split("-")
    var myAddDate = new Date(+myAddDateArray[2], +(myAddDateArray[1]) - 1, +myAddDateArray[0])
    var myAddDateShort = this.datepipe.transform(myAddDate, "dd-MM-yyyy");
    var currentDate = new Date()
    var currentDateShort = this.datepipe.transform(currentDate, "dd-MM-yyyy");
    this.taskHolderName = 'My Tasks'
    if (member.isActive && currentDate >= myAddDate) {
      if (myAddDateShort === currentDateShort) {
        this.editable1 = false
        this.editable2 = true
      } else {
        this.editable1 = true;
        this.editable2 = true;
      }
    } else {
      this.editable1 = false
      this.editable2 = false
    }
  }

  setMinMaxDate(member) {
    var parts1 = member.addedDate.split('-');
    this.minDate = new Date(+parts1[2], +(parts1[1]) - 1, +parts1[0]);
    if (member.deletedDate == '') {
      this.maxDate = new Date();
    } else {
      var parts2 = member.deletedDate.split('-');
      this.maxDate = new Date(+parts2[2], +(parts2[1]) - 1, +parts2[0]);
    }
    this.myDateValue = this.maxDate;
  }

  deleteTask(taskArray, task, value) {
    var index = taskArray.indexOf(task);
    taskArray.splice(index, 1);
    this.selectAll(taskArray, value)
    this.taskservice.deleteTask(task)
      .subscribe(msg => console.log(msg));
    this.calculateTotalTime(taskArray, value)
  }

  //   open(){
  //     var template = document.getElementById('template')
  //     this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  //   }
  //   decline(): void {
  //     this.modalRef.hide();
  // }

  copy(selectedTasksArray) {
    let text: string = '';
    console.log(selectedTasksArray)
    if (selectedTasksArray.length > 0) {
      for (let task of selectedTasksArray) {
        text += task.description + '\n';
      }
    } else {
      text = ''
    }
    var txtArea = document.createElement("textarea");
    txtArea.id = 'txt';
    txtArea.style.position = 'fixed';
    txtArea.style.top = '0';
    txtArea.style.left = '0';
    txtArea.style.opacity = '0';
    txtArea.value = text;
    document.body.appendChild(txtArea);
    txtArea.select();
    document.execCommand("copy");
  }

  selectedTasks(task, value) {
    switch (value) {
      case 1: var exist = this.selectedYesterdaysTasks.find(function (element) {
        return element.taskId == task.taskId;
      });
        if (exist == null) {
          this.selectedYesterdaysTasks.push(task);
        }
        if (this.selectedYesterdaysTasks.length == this.MockYesterdayTasks.length) {
          this.checkbox1 = true;
        } else {
          this.checkbox1 = false
        }
        break;
      case 2: var exist = this.selectedYesterdaysTasks.find(function (element) {
        return element.taskId == task.taskId;
      });
        if (exist == null) {
          this.selectedTodaysTasks.push(task);
        }
        if (this.selectedTodaysTasks.length == this.MockTodayTasks.length) {
          this.checkbox2 = true;
        } else {
          this.checkbox2 = false
        }
        break;
    }
  }

  unselectedTasks(task, value) {
    switch (value) {
      case 1: var index = this.selectedYesterdaysTasks.indexOf(task);
        this.selectedYesterdaysTasks.splice(index, 1);
        if (this.selectedYesterdaysTasks.length == this.MockYesterdayTasks.length) {
          this.checkbox1 = true;
        } else {
          this.checkbox1 = false
        }
        break;
      case 2: var index = this.selectedTodaysTasks.indexOf(task);
        this.selectedTodaysTasks.splice(index, 1);
        if (this.selectedTodaysTasks.length == this.MockTodayTasks.length) {
          this.checkbox2 = true;
        } else {
          this.checkbox2 = false
        }
        break;
    }
  }

  selectAll(taskArray, value) {
    switch (value) {
      case 1: this.selectedYesterdaysTasks = [];
        for (let task of taskArray) {
          this.selectedYesterdaysTasks.push(task);
        }
        this.emitEventToChild(true, value);
        break;
      case 2: this.selectedTodaysTasks = [];
        for (let task of taskArray) {
          this.selectedTodaysTasks.push(task)
        }
        this.emitEventToChild(true, value);
        break;
    }
  }

  unselectAll(value) {
    switch (value) {
      case 1: this.selectedYesterdaysTasks = [];
        this.emitEventToChild(false, value);
        break;
      case 2: this.selectedTodaysTasks = [];
        this.emitEventToChild(false, value);
        break;
    }
  }

  emitEventToChild(selectAllvalue, value) {
    switch (value) {
      case 1: this.eventsSubject1.next(selectAllvalue)
        break;
      case 2: this.eventsSubject2.next(selectAllvalue)
        break;
    }
  }
}
