import { Component, OnInit } from '@angular/core';
import { Member } from "../model/member-model";
import {AuthService,GoogleLoginProvider} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { LoginService } from "../login.service";


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
      Id: '',
      Name: '',
      Email: '',
      Imageurl: '',
      Token: '',
      UserType: ''
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
          Id: userData.id,
          Name: userData.name,
          Email: userData.email,
          Imageurl: userData.image,
          Token: userData.token,
          UserType: null
        }
        this.loginservice.loginMember(this.member);
      }
    );
  }
}
