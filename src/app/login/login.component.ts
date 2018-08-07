import { Component, OnInit } from '@angular/core';
import { Member } from "../model/member-model";
import {AuthService,GoogleLoginProvider} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { LoginService } from "../service/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService,
    public router: Router,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.initializeMember();
    
  }
  
  member: Member;
  initializeMember() {
    this.member = {
      employeeID: '',
      name: '',
      email: '',
      imageurl: '',
      // Token: '',
      userType: ''
    }
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        this.member = {
          employeeID: userData.id,
          name: userData.name,
          email: userData.email,
          imageurl: userData.image,
          // Token: userData.token,
          userType: "user"
        }
        this.loginservice.loginMember(this.member);
      }
    );
  }
}
