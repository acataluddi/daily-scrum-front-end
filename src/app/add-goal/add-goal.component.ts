import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from "../service/login.service";
import { GoalService } from "../service/goal.service";
import { Goal } from '../model/goal-model'
import { NavBarMember } from '../model/nav-bar-member'
import { forEach } from '@angular/router/src/utils/collection';


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
  name:string
  userName:string
  showSign1:boolean
  showSign2:boolean
  members: NavBarMember[];
  dropDown:boolean
  searchText:string
  hide:boolean

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            console.log(msg)
            this.userName = msg.name;
          });
      }
    });
   this.goalService.getNavigationBarList("getStatusList").subscribe(data => {
     console.log(data);
      this.setProjects(data)
    });
    this.showSign1 = true;
    this.showSign2 = true;
    this.dropDown = false;
    this.hide = false;
  }
  show1() {
    this.showSign1 = !this.showSign1;
    console.log(this.showSign1)
  }
  show2() {
    this.showSign2 = !this.showSign2;
  }
  list() {
    this.dropDown = !this.dropDown;
  }
  setProjects(members){
    this.members = members;
    // this.getProjects();
  }
  changeProject(newMemberName,newImage) {
    if (newMemberName!==null){
    this.name = newMemberName;
    this.image = newImage
    this.dropDown=false;
    this.visible();
    }
  }
  visible() {
    this.hide = true;
  }

}

