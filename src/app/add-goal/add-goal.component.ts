import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from "../service/login.service";
import { GoalService } from "../service/goal.service";
import { Goal } from '../model/goal-model'
import { DashboardService } from '../service/dashboardservice.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  constructor( private socialAuthService: AuthService,
    private loginservice: LoginService,
    private goalService: GoalService) { }

  image:string
  userName:string
  showSign1:boolean
  showSign2:boolean
  members: Goal[];

  ngOnInit() {

    this.image = localStorage.getItem('image') ;
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            console.log(msg)
            this.userName = msg.name;
          });
      }
    });
   this.goalService.getMembersUnderManager("getMembersUnderManager").subscribe(data => {
     console.log(data);
      this.setProjects(data)
    });
    this.showSign1 = true;
    this.showSign2 = true;
  }
  show1() {
    this.showSign1 = !this.showSign1;
    console.log(this.showSign1)
  }
  show2() {
    this.showSign2 = !this.showSign2;
  }
  setProjects(members){
    this.members = members;
    // this.getProjects();
  }
  // getProjects(): void {
  //   // this.projects = this.projectservice.getProjectArray()
  //   for (let pro of this.projects) {
  //     if (pro.projectName == this.childProject) {
  //       this.projectmembers = pro.members;
  //     }
  //   }
  // }

}

