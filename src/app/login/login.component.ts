import { Component, OnInit } from '@angular/core';
import { Member} from "../model/member-model";
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
    // this.getMembers();
  }
  
  member: Member;
  
  initializeMember() {
    this.member = {
      memberID: '',
      name: '',
      email: '',
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
          memberID:userData.id,
          name:userData.name, 
          email:userData.email, 
          userType:'user'
        }
        // this.loginservice.loginMember(this.member)
        //     .subscribe(msg => {
        //       console.log(msg.message);
        //       if(msg.message === "registered" || msg.message === "User exists"){
                localStorage.setItem("logged", "true");
                this.router.navigate(['/dashboard']);
            //   }
            // });
      }
    );
  }

  members: Member[];
  getMembers(): void {
    this.loginservice.getMembers()
        .subscribe(members => console.log(members));
  }
}
