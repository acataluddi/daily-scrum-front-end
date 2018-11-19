import { Component, OnInit, Injectable, TemplateRef } from '@angular/core';
import { Member } from '../model/member-model';
import { Http, } from '@angular/http';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';
import { Project } from '../model/project-model';
import { DashboardService } from '../service/dashboardservice.service';
import { Router, NavigationStart } from '@angular/router';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';
import { ActivatedRoute } from "@angular/router";
import { ProjectviewallService } from '../service/projectviewall.service';
import { ProjectUpdated } from '../model/projectupdated-model';
import { TaskPageAdminComponent } from '../task-page-admin/task-page-admin.component';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FeedbackService } from "../service/feedback.service";
import { Feedback } from '../model/feedback-model';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  modalRef: BsModalRef;
  member: Member;
  image: String;
  projects: Project[];
  title: string;
  email = localStorage.getItem("email");
  subscription: Subscription;
  sub;
  pid
  selected: Project = { projectId: "", projectName: "", projectDesc: "", startDate: "", endDate: "", members: [] }
  operation: string;
  show_dailyscrum;
  show_arrow;
  show_scrum;
  show_dash;
  show_signout;
  show_projectlist;
  showTooltip;
  show_feedback;
  feedback: Feedback;
  invalidDescription;

  length;
  constructor(
    private viewallservice: ProjectviewallService,
    private socialAuthService: AuthService,
    private router: Router,
    private loginservice: LoginService,
    private projectService: DashboardService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private taskService: ProcessIndividualTaskService,
    private dashboardService: DashboardService,
    private feedbackService: FeedbackService) {
    this.subscription = taskService.selected1.subscribe(
      data => {
        this.setSelected(data)
      });

    this.subscription = dashboardService.getProjects().subscribe(data => {
      this.setProjects(data)
    });

  }

  ngOnInit() {
    this.invalidDescription = false;
    this.operation = localStorage.getItem("currentOperation");
    this.showTooltip = false;
    this.show_dailyscrum = false
    this.show_arrow = false
    this.show_scrum = true
    this.show_dash = true
    this.show_signout = false
    this.show_projectlist = false
    this.show_feedback = false

    if (this.router.url.search('daily-status/') || this.router.url.search('task-page-admin/')) {
      var name = localStorage.getItem("currentProject")
      this.selected.projectName = name;
    }
    this.initializeMember();
    this.getUserDetails();
    this.toggle(this.router.url);

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.operation = localStorage.getItem("currentOperation");
        this.toggle(event['url']);
      }
    });

    this.selected.projectName = localStorage.getItem("currentProject")
  }
  total: number

  initializeMember() {
    this.member = {
      employeeID: '',
      name: '',
      email: '',
      imageurl: '',
      userType: '',
      idToken: ''
    }
    this.title = '';
  }

  getUserDetails() {
    this.member.email = localStorage.getItem("email");
    this.member.imageurl = localStorage.getItem("image");
  }

  setProjects(userProjects) {
    this.projects = userProjects;
    this.length = this.projects.length;
  }

  setSelected(projectSelected) {
    this.selected = projectSelected
  }

  getImage(): String {
    this.member.imageurl = localStorage.getItem("image");
    return this.member.imageurl;
  }

  logout() {
    this.socialAuthService.signOut();
    this.loginservice.logoutMember();
  }
  changeProject(newProject) {
    this.selected = newProject;
    localStorage.setItem("currentProject", this.selected.projectName);
    localStorage.setItem("projectId", this.selected.projectId);
    this.taskService.changeProject(this.selected);

  }

  openModal(template: TemplateRef<any>) {
    this.feedback = this.initializeNewFeedback(this.feedback);
    this.invalidDescription = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  decline(): void {
    this.modalRef.hide();
  }
  toggle(currenturl) {
    if (currenturl == '/dashboard') {
      this.title = '';
      this.show_dailyscrum = false
      this.show_arrow = false
      this.show_scrum = true
      this.show_dash = true
    } else if (currenturl == '/project') {

      if (this.operation === "AddProject") {
        this.title = 'New Project';
      }
      if (this.operation === "EditProject") {
        this.title = 'Edit Project';
      }

      this.show_dailyscrum = false
      this.show_arrow = false
      this.show_scrum = true
    } else if (currenturl == '/admin-view-all') {
      this.show_dailyscrum = false
      this.show_arrow = false
      this.show_scrum = true
      this.show_dash = false
    } else if (currenturl == '/addGoal') {
      this.show_dailyscrum = false
      this.show_arrow = false
      this.show_scrum = true
      this.title = 'New Goal'
    }
    else {
      this.dashboardService.getProjects()
        .subscribe(projectArr => {
          if (projectArr != null) {
            this.setProjects(projectArr)
          }
        });
      this.show_dailyscrum = true
      this.show_arrow = true
      this.show_scrum = false
      this.show_dash = false
    }
  }
  openDashboardPage() {
    this.router.navigate(['/dashboard']);
  }

  show(e) {
    if (e.target.className == "arrow2" || e.target.className == "button desktop" ||
      e.target.className == "dp") {
      this.show_feedback = false;
      if (this.show_signout == false) {
        this.show_signout = true
      } else {
        this.show_signout = false
      }
    }
    else if (e.target.id == "arrow" || e.target.id == "dailyscrumclass") {
      if (this.show_projectlist == false) {
        this.show_projectlist = true
      } else {
        this.show_projectlist = false
      }
    }
    else {
      this.show_projectlist = false
      this.show_signout = false
    }
  }

  fetchFeedbacks() {
    this.feedbackService.getFeedbacks()
      .subscribe(feedbacks => {
        console.log(feedbacks);
      });
  }

  postFeedback(userFeedback: Feedback) {
    userFeedback.feedbackDescription = userFeedback.feedbackDescription.trim();
    if (userFeedback.feedbackDescription === '') {
      this.invalidDescription = true;
      setTimeout(() => { document.getElementById("feedbackDesc").focus(); });
    }
    if (this.invalidDescription == false) {
      this.feedbackService.sendFeedback(userFeedback)
        .subscribe(feedbacks => {
          console.log(feedbacks);
        });
      this.modalRef.hide();
    }
  }

  initializeNewFeedback(feedback: Feedback): Feedback {
    feedback = {
      feedbackId: '',
      feedbackDate: new Date(),
      feedbackDescription: '',
      userEmail: '',
      userId: '',
      userImage: '',
      userName: ''
    }
    return feedback;
  }
}
