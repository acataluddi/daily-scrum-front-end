import { Component, OnInit } from '@angular/core';
import { Member,MemberT,Hero } from "../model/member-model";
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
    // this.getHeroes();
    this.addHeroes();
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

  members: MemberT[];
  getHeroes(): void {
    this.loginservice.getHeroes()
        .subscribe(members => console.log(members));
  }


  hero: Hero;
  addHeroes(): void {
    this.hero = {
      employeeID:'34576888542',
      name:'Neeraj', 
      email:'yyyy@gmail.com', 
      userType:'admin'
    }
    this.loginservice.addHero(this.hero)
        .subscribe(msg => console.log(msg));
  }
}
