import { Component, OnInit, Injectable } from '@angular/core';
import { member, Project } from "../model/project-model";
import { Task } from '../model/task-model';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NavigationdataService } from '../service/navigationdata.service'
import { DatePipe } from '@angular/common';
import { Subscription, Subject } from 'rxjs';
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
  TodayTasks: Task[] = [];
  YesterdayTasks: Task[] = [];
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
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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
  numOfSelected = ''
  copyCard = false
  getElementStatus1 = false
  getElementStatus2 = false
  copied1 = false;
  copied2 = false;
  deselectCopiedtext = 'DESELECT';
  blockCopyDelete1 = true;
  blockCopyDelete2 = true;
  showUserList = (localStorage.getItem('showUsers')=='true');
  private eventsSubject1 = new Subject<boolean>();
  private eventsSubject2 = new Subject<boolean>();
  private HideSaved1 = new Subject<boolean>();
  private HideSaved2 = new Subject<boolean>();
  changeProjectsubscription: Subscription;
  routeparamsub: any;
  selectmem: Subscription;
  sevenDaysFlagLeft = false;
  sevenDaysFlagRight = false;
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
        this.showUserList=this.isProjectManager(data);
        localStorage.setItem('showUsers', this.showUserList.toString());
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

          var addedDateParts = myMemobj.addedDate.split('-');
          var addedDate = new Date(+addedDateParts[2], +(addedDateParts[1]) - 1, +addedDateParts[0]);
          if (this.getSelectedDate() > addedDate) {
            this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
          } else {
            localStorage.setItem('selectedDate', myMemobj.addedDate);
            this.myDateValue = addedDate;
          }
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
          var addedDateParts = firstMember.addedDate.split('-');
          var addedDate = new Date(+addedDateParts[2], +(addedDateParts[1]) - 1, +addedDateParts[0]);
          if (this.getSelectedDate() > addedDate) {
            this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
          } else {
            localStorage.setItem('selectedDate', firstMember.addedDate);
            this.myDateValue = addedDate;
          }
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
    this.oldtodaytask = new Task;
    this.oldyesterdaytask = new Task;
    this.month = this.months[this.d.getMonth()];
    this.date = this.d.getDate();
    this.year = this.d.getFullYear();
    this.myvalue = true;
    this.onDateChange(this.getSelectedDate())
    this.projectId = localStorage.getItem("projectId")
    this.currentProject = localStorage.getItem("currentProject")
    this.numOfSelected = '0'
  }

  ngOnDestroy() {
    this.routeparamsub.unsubscribe();
  }

  getTodaysTask(Todays) {
    this.MockTodayTasks = Todays;
    if (Todays.length != 0) {
      Todays.forEach(element => {
        this.TodayTasks.push(element)
      });
    } else {
      this.TodayTasks = []
    }
    this.status = true;
  }

  getYesterdaysTask(Yesterdays) {
    this.MockYesterdayTasks = Yesterdays;
    if (Yesterdays.length != 0) {
      Yesterdays.forEach(element => {
        this.YesterdayTasks.push(element)
      });
    } else {
      this.YesterdayTasks = []
    }
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
      alert('Total time worked cannot be more than 16 hours.');

      switch (value) {
        case 1: this.creatednewyesterday = true
          this.total_hours_spent1 = this.totalhour;
          this.total_minutes_spent1 = this.totalminute;
          this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
          this.selectedYesterdaysTasks = []
          this.checkbox1 = false
          if (this.selectedYesterdaysTasks.length == 0) {
            this.blockCopyDelete1 = true;
          } else {
            this.blockCopyDelete1 = false;
          }
          break;
        case 2: this.creatednewtoday = true
          this.total_hours_spent2 = this.totalhour;
          this.total_minutes_spent2 = this.totalminute;
          this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
          this.selectedTodaysTasks = []
          this.checkbox2 = false;
          if (this.selectedTodaysTasks.length == 0) {
            this.blockCopyDelete2 = true;
          } else {
            this.blockCopyDelete2 = false;
          }
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
    this.sevenDaysFlagLeft = false;
    this.sevenDaysFlagRight = false;
    this.checkbox1 = false;
    this.checkbox2 = false;
    this.selectedTodaysTasks = [];
    this.selectedYesterdaysTasks = [];
    this.blockCopyDelete1 = true;
    this.blockCopyDelete2 = true;
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
      this.todayval = this.days[newDate.getDay()] + ", " + this.month + " " + this.date + ", " + this.year;
      this.yesterdayval = this.days[d1.getDay()] + ", " + this.months[d1.getMonth()] + " " + d1.getDate() + ", " + d1.getFullYear();
    }
    this.getData(newDate);
    this.saveSelectedDate(newDate)
    // }

    if (this.userEmail == this.datachanged.email) {
      this.setEditable(this.datachanged);
    } else {
      this.editable1 = false;
      this.editable2 = false;
      this.sevenDaysFlagLeft = false;
      this.sevenDaysFlagRight = false;
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
        this.todayval = this.days[d1.getDay()] + ", " + this.month + " " + this.date + ", " + this.year;
        this.yesterdayval = this.days[this.newDate.getDay()] + ", " + this.months[this.newDate.getMonth()] + " " + this.newDate.getDate() + ", " + this.newDate.getFullYear();
      }

      this.newDate = d1;
      this.myDateValue = d1;
      this.saveSelectedDate(this.myDateValue);
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
        this.todayval = this.days[this.newDate.getDay()] + ", " + this.month + " " + this.date + ", " + this.year;
        this.yesterdayval = this.days[d1.getDay()] + ", " + this.months[d1.getMonth()] + " " + d1.getDate() + ", " + d1.getFullYear();
      }
      this.newDate = d1;
      this.myDateValue = d1;
      this.saveSelectedDate(this.myDateValue);
    }
  }

  newTodayTask($event) {
    this.task1 = $event;
    var editTime = new Date()
    var formateditTime = editTime.toString()
    if (this.newOld(this.task1, this.TodayTasks)) {
      //insert
      this.task1.taskDate = this.todayTaskDate;
      this.task1.projectId = this.projectId;
      this.task1.lastEdit = formateditTime
      this.taskservice.addNewTask(this.task1)
        .subscribe(msg => console.log(msg));
      this.checkbox2 = false
      this.TodayTasks.push(this.task1)
    }
    else {
      //update 
      this.task1.lastEdit = formateditTime
      this.taskservice.updateOldTask(this.task1)
        .subscribe(msg => console.log(msg));
      var index = this.TodayTasks.findIndex(element => element.taskId == this.task1.taskId)
      this.TodayTasks[index] = this.task1
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
      this.task1.taskDate = this.yesterdayTaskDate;
      this.task1.projectId = this.projectId;
      this.task1.lastEdit = formateditTime
      this.taskservice.addNewTask(this.task1).subscribe(
        msg => console.log(msg));
      this.checkbox1 = false
      this.YesterdayTasks.push(this.task1)
    } else {
      //update
      this.task1.lastEdit = formateditTime
      this.taskservice.updateOldTask(this.task1)
        .subscribe(msg => console.log(msg));
      var index = this.YesterdayTasks.findIndex(element => element.taskId == this.task1.taskId)
      this.YesterdayTasks[index] = this.task1
    }
    this.getLastEdit(this.YesterdayTasks, 1)
    this.calculateTotalTime(this.MockYesterdayTasks, 1)
  }

  newOld(keyTask, taskArray) {
    var flag = true;
    if (taskArray.length == 0) {
      flag = true
    } else {
      var taskInArray = taskArray.find(function (element) {
        return element.taskId == keyTask.taskId;
      })

      if (taskInArray != null) {
        flag = false
      } else {
        flag = true
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
      var edit = new Array()
      for (let task of taskArray) {
        let datevar = new Date(task.lastEdit)
        edit.push(datevar)
      }
      edit.sort()
      var lastEdit = edit[edit.length - 1]
      if (value == 1) {
        this.lastEditString1 = lastEdit;
      } else {
        this.lastEditString2 = lastEdit;
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
        this.getLastEdit(this.MockTodayTasks, 2)
      });
    this.taskservice.getYesterdays(yesterday, email, projectId)
      .subscribe(data => {
        this.getYesterdaysTask(data);
        this.calculateTotalTime(this.MockYesterdayTasks, 1)
        this.getLastEdit(this.MockYesterdayTasks, 1)
      });
  }

  popTask(taskArray, task) {
    var value;
    if (task.description == null || task.description == '') {
      var index = taskArray.indexOf(task);
      taskArray.splice(index, 1);
    }
    if (taskArray == this.MockTodayTasks) {
      value = 2;
      this.creatednewtoday = false;
      this.oldtodaytask = taskArray[taskArray.length-1]
    } else {
      value = 1;
      this.creatednewyesterday = false;
      this.oldyesterdaytask = taskArray[taskArray.length-1]
    }
  }

  viewAllTasks(): void {
    var sdate = localStorage.getItem("startDate")
    var thePName = localStorage.getItem('currentProject')
    this.router.navigate(['/task-page-admin', this.projectId, thePName, sdate])
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
    var addedDateParts = taskMember.addedDate.split('-');
    var addedDate = new Date(+addedDateParts[2], +(addedDateParts[1]) - 1, +addedDateParts[0]);
    if (this.getSelectedDate() > addedDate) {
      this.getTask(this.todayTaskDate, this.yesterdayTaskDate, this.email, this.projectId)
    } else {
      localStorage.setItem('selectedDate', taskMember.addedDate);
      this.onDateChange(addedDate)
    }
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

    var lowerlimitdate = new Date()
    lowerlimitdate.setDate(currentDate.getDate() - 7)
    var selectedDate = localStorage.getItem("selectedDate")
    var selectedDateArray = selectedDate.split("-")
    var upperlimitdate = new Date(+selectedDateArray[2], +(selectedDateArray[1]) - 1, +selectedDateArray[0])
    var diff = Math.round((upperlimitdate.getTime() - lowerlimitdate.getTime()) / (1000 * 60 * 60 * 24));
    if (member.isActive && currentDate >= myAddDate) {
      if (diff <= 7 && diff > 0) {
        if (currentDateShort === myAddDateShort) {
          this.editable1 = false
          this.editable2 = true
        } else {
          this.editable1 = true;
          this.editable2 = true;
        }
      } else if (diff == 0) {
        this.editable1 = false;
        this.editable2 = true;
      } else {
        this.editable1 = false;
        this.editable2 = false;
      }
    } else {
      this.editable1 = false
      this.editable2 = false
    }

    if (this.editable1 && this.editable2) {
      this.sevenDaysFlagLeft = false;
      this.sevenDaysFlagRight = false;
    } else if (!this.editable1 && this.editable2) {
      this.sevenDaysFlagLeft = true;
      this.sevenDaysFlagRight = false;
    } else {
      this.sevenDaysFlagLeft = true;
      this.sevenDaysFlagRight = true;
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
    this.myDateValue = this.getSelectedDate();
    this.newDate = this.maxDate;
  }

  copy(selectedTasksArray, value) {
    let text: string = '';
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

    switch (value) {
      case 1: this.HideSaved1.next(true);
        if (this.selectedYesterdaysTasks.length > 0) {
          this.copied1 = true;
        }
        setTimeout(() => {
          this.copied1 = false;
        }, 1000);
        break;
      case 2: this.HideSaved2.next(true);
        if (this.selectedTodaysTasks.length > 0) {
          this.copied2 = true;
        }
        setTimeout(() => {
          this.copied2 = false;
          this.deselectCopiedtext = 'DESELECT'
        }, 1000);
        break;
    }
  }

  selectedTasks(task, value) {

    switch (value) {
      case 1: 
        var exist = this.selectedYesterdaysTasks.find(function (element) {
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
        this.blockCopyDelete1 = false;
        break;
      case 2: 
        var exist = this.selectedTodaysTasks.find(function (element) {
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
        this.numOfSelected = this.selectedTodaysTasks.length.toString()
        if (this.selectedTodaysTasks.length != 0) {
          this.copyCard = true
        } else {
          this.copyCard = false
        }
        this.blockCopyDelete2 = false;
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
        if (this.selectedYesterdaysTasks.length == 0) {
          this.blockCopyDelete1 = true;
        } else {
          this.blockCopyDelete1 = false;
        }
        break;
      case 2: var index = this.selectedTodaysTasks.indexOf(task);
        this.selectedTodaysTasks.splice(index, 1);
        if (this.selectedTodaysTasks.length == this.MockTodayTasks.length) {
          this.checkbox2 = true;
        } else {
          this.checkbox2 = false
        }
        this.numOfSelected = this.selectedTodaysTasks.length.toString()
        if (this.selectedTodaysTasks.length != 0) {
          this.copyCard = true;
          this.blockCopyDelete2 = false;
        } else {
          this.copyCard = false;
          this.blockCopyDelete2 = true;
        }
        break;
    }
  }

  selectAll(taskArray, value) {
    switch (value) {
      case 1: 
        this.selectedYesterdaysTasks = [];
        for (let task of taskArray) {
          this.selectedYesterdaysTasks.push(task);
        }
        this.emitEventToChild(true, value);
        this.blockCopyDelete1 = false;
        break;
      case 2: 
        this.selectedTodaysTasks = [];
        for (let task of taskArray) {
          this.selectedTodaysTasks.push(task)
        }
        this.numOfSelected = this.selectedTodaysTasks.length.toString()
        this.copyCard = true
        this.emitEventToChild(true, value);
        this.blockCopyDelete2 = false;
        break;
    }
  }

  unselectAll(value) {
    switch (value) {
      case 1: this.selectedYesterdaysTasks = [];
        this.emitEventToChild(false, value);
        this.blockCopyDelete1 = true;
        break;
      case 2: this.selectedTodaysTasks = [];
        this.checkbox2 = false
        this.emitEventToChild(false, value);
        this.numOfSelected = this.selectedTodaysTasks.length.toString()
        this.copyCard = false;
        this.blockCopyDelete2 = true;
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

  deleteSelected(selectedTaskArray, taskArray, value) {
    selectedTaskArray.forEach(element => {
      var index = taskArray.indexOf(element);
      taskArray.splice(index, 1);
      this.taskservice.deleteTask(element)
        .subscribe(msg => console.log(msg));
      if (value == 1) {
        this.YesterdayTasks.splice(index, 1);
        if (this.YesterdayTasks.length > 0) {
          var task = this.YesterdayTasks[0];
          var editTime = new Date();
          var formateditTime = editTime.toString();
          task.lastEdit = formateditTime;
          this.taskservice.updateOldTask(task)
            .subscribe(msg => console.log(msg));
          this.getLastEdit(this.YesterdayTasks, value)
        }
      } else {
        this.TodayTasks.splice(index, 1);
        if (this.TodayTasks.length > 0) {
          var task = this.TodayTasks[0];
          var editTime = new Date();
          var formateditTime = editTime.toString();
          task.lastEdit = formateditTime;
          this.taskservice.updateOldTask(task)
            .subscribe(msg => console.log(msg));
          console.log(task.description)
          this.getLastEdit(this.TodayTasks, value)
        }
      }
    });
    this.calculateTotalTime(taskArray, value)
    if (value == 1) {
      this.checkbox1 = false;
      this.selectedYesterdaysTasks = [];
      this.blockCopyDelete1 = true;
    } else {
      this.checkbox2 = false;
      this.selectedTodaysTasks = [];
      this.blockCopyDelete2 = true;
    }
    this.copyCard = false;
  }

  getSelectedDate(): Date {
    var selectedDate = localStorage.getItem('selectedDate');
    var selectedDateparts = selectedDate.split('-');
    var seldate = new Date(+selectedDateparts[2], +(selectedDateparts[1]) - 1, +selectedDateparts[0]);
    return seldate;
  }

  saveSelectedDate(newSelectedDate) {
    var nday = '';
    var nmonth = '';
    var selectedDate = '';
    if (newSelectedDate.getDate() < 10) {
      nday += '0' + newSelectedDate.getDate();
    } else {
      nday += newSelectedDate.getDate();
    }
    if ((newSelectedDate.getMonth() + 1) < 10) {
      nmonth += '0' + (newSelectedDate.getMonth() + 1);
    } else {
      nmonth += (newSelectedDate.getMonth() + 1);
    }
    selectedDate += nday + '-' + nmonth + '-' + newSelectedDate.getFullYear();
    localStorage.setItem("selectedDate", selectedDate);
  }

  isProjectManager(project: Project) {
    if (this.UserType == 'Admin') {
      return true;
    } else {
      var id = this.userEmail;
      var myMemobj = project.members.find(function (element) {
        return element.email == id;
      });
      if (myMemobj.role == 'Project Manager') {
        return true;
      }
      return false;
    }
  }
}
