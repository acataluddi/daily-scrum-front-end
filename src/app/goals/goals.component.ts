import { Component, OnInit } from '@angular/core';
import { GoalUserList } from '../model/goalUserList-model';
import { GoalMember } from '../model/goal-model';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  UserType;
  goalMember: GoalMember;
  firstMember: GoalMember = {
    id:'1010', userName:'N', lastUpdate:'10/10/2018', 
    userEmail: 'n@gmail.com', userId: '101', 
    userImage: localStorage.getItem('image'), hasNewUpdates: false,
    goals:[
      {
        goalId: 'g101', goalTitle:'Goal 1', goalDescription: 'Goal 1 by A', goalTime: '1/1/2019',
        managerName:'A', managerEmail: 'a@gmail.com', managerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaFfIZjtmUjzI94KOcU50tSXMguL8gnWvQZiOZXBLpqvAhMJ5K', 
        userEmail: 'n@gmail.com', hasNewUpdates: false, 
        comments: [
        ]
      },
      {
        goalId: 'g102', goalTitle:'Goal 2', goalDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 
        goalTime: '1/1/2019', managerName:'A', 
        managerEmail: 'a@gmail.com', managerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaFfIZjtmUjzI94KOcU50tSXMguL8gnWvQZiOZXBLpqvAhMJ5K', 
        userEmail: 'n@gmail.com', hasNewUpdates: false, 
        comments: [
        ]
      }
    ]
  };
  userList: GoalUserList[] = [
    { memberId: '101', memberEmail:'n@gmail.com', memberImage: localStorage.getItem('image'), memberName:'N', hasNewUpdates: true},
    { memberId: '102', memberEmail:'i@gmail.com', memberImage: localStorage.getItem('image'), memberName:'I', hasNewUpdates: false},
    { memberId: '103', memberEmail:'s@gmail.com', memberImage: localStorage.getItem('image'), memberName:'S', hasNewUpdates: true},
    { memberId: '104', memberEmail:'h@gmail.com', memberImage: localStorage.getItem('image'), memberName:'H', hasNewUpdates: false},
    { memberId: '105', memberEmail:'u@gmail.com', memberImage: localStorage.getItem('image'), memberName:'U', hasNewUpdates: true}
  ]
  constructor(private socialAuthService: AuthService,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.goalMember = this.firstMember;
    this.socialAuthService.authState.subscribe((user) => {
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            this.UserType = msg.userType;
          });
      }
    });
  }

  selectedMember(member: GoalUserList){
    //get req to server
    this.goalMember.userImage = member.memberImage;
    this.goalMember.userName = member.memberName;
    this.goalMember.lastUpdate = '20/10/2018'
  }

  AddGoal() {
    alert("We are working on it!")
  }
}
