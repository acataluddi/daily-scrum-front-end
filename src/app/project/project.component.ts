import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";
import {AuthService} from 'angular-6-social-login';
import { LoginService } from "../service/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {



  constructor(private socialAuthService: AuthService, private loginservice: LoginService, public router: Router ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log("user:");
      console.log(user);
      if (user != null) {
        this.loginservice.loginMember(user.idToken)
          .subscribe(msg => {
            msg.userType;
            if (msg.userType != "Admin" && msg.userType != "Manager") {
              // this.flag = true;
              // console.log("flag:"+this.flag);
              this.router.navigate(['/dashboard']);
            }

          });
      }
      });
  }

}
