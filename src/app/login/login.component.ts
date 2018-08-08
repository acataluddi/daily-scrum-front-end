import { Component, OnInit } from '@angular/core';
import { Member} from "../model/member-model";
import {AuthService,GoogleLoginProvider} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { LoginService } from "../service/login.service";
import { GMember} from "../model/member-model";


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
    // this.getMembers();
  }
  
  member: Member;
  gmember: GMember;
  initializeMember() {
    this.member = {
      memberID: '',
      name: '',
      email: '',
      userType: ''
    }
    this.gmember={
      id_token: ''
    }
  }

  id_token;
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.id_token=userData.idToken;
        this.gmember.id_token=this.id_token;
        this.member = {
          memberID:userData.id,
          name:userData.name, 
          email:userData.email, 
          userType:'user'
        }
        this.loginservice.loginMember(this.gmember,this.member)
        .subscribe(msg => {
          console.log(msg.message);
          if(msg.message === "registered" || msg.message === "User exists"){
            localStorage.setItem("logged", "true");
            this.router.navigate(['/dashboard']);
          }
        });
        // console.log(this.id_token);
        // this.logmember(this.id_token);
        // this.member = {
        //   memberID:userData.id,
        //   name:userData.name, 
        //   email:userData.email, 
        //   userType:'user'
        // }
        // this.loginservice.loginMember(this.member)
        //     .subscribe(msg => {
        //       console.log(msg.message);
        //       if(msg.message === "registered" || msg.message === "User exists"){
        //         localStorage.setItem("logged", "true");
        //         this.router.navigate(['/dashboard']);
        //       }
        //     });
      }
    );
  }

  members: Member[];
  getMembers(): void {
    this.loginservice.getMembers()
        .subscribe(members => console.log(members));
  }



}
