import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Member } from '../model/member-model';
import { Injectable } from '@angular/core';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { IndividualMember } from '../model/user-task-model'
import { Subscription } from 'rxjs';
import { AuthService } from 'angular-6-social-login';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from "../service/login.service";
import { TaskPageService } from "../service/task-page.service";
import { NavigationdataService } from '../service/navigationdata.service';
import { member } from '../model/project-model';

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
  datePickerConfig: Partial<BsDatepickerConfig>;
  subscription: Subscription;
  flag = false;
  view_my_task_flag = false;
  total_hours_spent = 0;
  total_minutes_spent = 0;
  showDatePicker = false;
  myDateValue: Date;
  todayval;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  email;
  todayTaskDate;
  projectId;
  memberEmployee: Member;
  memberEmployeeArray: Member[];
  IndMembArray: IndividualMember[];
  selectedDate: Date;
  minDate: Date;
  maxDate: Date;


  constructor(
    private taskservice: ProcessIndividualTaskService,
    private socialAuthService: AuthService,
    private route: ActivatedRoute,
    private navservice: NavigationdataService,
    public router: Router,
    private loginservice: LoginService,
    private taskPageService: TaskPageService

  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-orange',
      showWeekNumbers: false
    });
    this.sub = this.route.params.subscribe(params => {
      this.currentProject = params['name']
      this.projectId = +params['projectId'];
      var dt = new Date();
      this.myDateValue = dt;
    });
    this.subscription = taskservice.newList.subscribe(
      data => {
        this.currentProject = data.projectName;
        this.projectId = data.projectId;
        this.view_my_task_flag = false;
        var dt = new Date();
        this.myDateValue = dt;
      });
  }
  ngOnInit() {
    this.minDate = new Date(2018, 8, 10);
    this.maxDate = new Date();
    this.myDateValue = new Date();
    this.projectId = localStorage.getItem("projectId");
    this.currentProject = localStorage.getItem("currentProject");
    this.view_my_task_flag = false;
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            msg.userType;
            if (msg.userType === "Admin" || msg.userType === "Manager") {
              this.flag = true;
            }
          });
      }
    });

  }

  getTaskPageData(taskDate, projectId) {
    this.total_hours_spent = 0;
    this.total_minutes_spent = 0;
    this.taskPageService.getMembersTask(taskDate, projectId)
      .subscribe(memberTasks => {
        this.IndMembArray = memberTasks;
        // console.log(this.IndMembArray.length)
        console.log(this.IndMembArray[2].tasks[0].impediments)

        this.calculateTotalTime(this.IndMembArray);
        if (this.IndMembArray.filter(m => m.email === localStorage.getItem("email")).length != 0) {
          this.view_my_task_flag = true;
        }
      });
  }
  calculateTotalTime(tasksArray: IndividualMember[]) {
    var totalHour = 0;
    var totalMinute = 0;
    for (let task of tasksArray) {
      totalHour += task.hour;
      totalMinute += task.minute;
    }
    var extrahour = 0;
    if (totalMinute >= 60) {
      extrahour = Math.floor(totalMinute / 60);
      totalMinute = totalMinute % 60;
    }
    totalHour += extrahour;
    this.total_hours_spent = totalHour;
    this.total_minutes_spent = totalMinute;
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
    this.selectedDate = newDate;
    var nday = '';
    var nmonth = '';
    var ndate = '';
    var d = new Date();
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
    this.todayval = ndate;
    var month = this.months[newDate.getMonth()];
    var date = newDate.getDate();
    var year = newDate.getFullYear();
    if ((newDate.getMonth() === d.getMonth()) && (newDate.getDate() === d.getDate()) && (newDate.getFullYear() === d.getFullYear())) {
      this.todayval = "Today, " + month + " " + date + ", " + year;
    }
    else {
      this.todayval = month + " " + date + ", " + year;
    }
    this.getTaskPageData(ndate, this.projectId)
  }
  getNextDate() {
    var d1 = new Date(this.selectedDate);
    if (d1.getDate() !== this.maxDate.getDate() &&
      d1.getMonth() === this.maxDate.getMonth() &&
      d1.getFullYear() === this.maxDate.getFullYear()) {
      (d1.setDate(d1.getDate() + 1));
      this.myDateValue = d1;
    }
  }
  getPreviousDate() {
    var d1 = new Date(this.selectedDate);
    if (d1.getDate() !== this.minDate.getDate() &&
      d1.getMonth() === this.minDate.getMonth() &&
      d1.getFullYear() === this.minDate.getFullYear()) {
      (d1.setDate(d1.getDate() - 1));
      this.myDateValue = d1;
    }
  }
  viewMyTasks(): void {
    var email = localStorage.getItem("email");
    let projectMember: member ={email:email, role:'', name:'', image:'', roleSelected: null, invalidMemberEmail: null, invalidRole: null}
    this.navservice.changedata(projectMember);
    this.router.navigate(['/daily-status', this.projectId, this.currentProject]);
  }

  gotoDailyStatus(IndMemOb){
    this.navservice.changedata(IndMemOb)
    this.router.navigate(['/daily-status', this.projectId, this.currentProject]);
  }

}
