import { Component, OnInit } from '@angular/core';
import { Member } from "../model/member-model";
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService,
    public router: Router,
    private loginservice: LoginService) {
    this.routeEvent(this.router);
  }



  ngOnInit() {
    this.initializeMember();
  }

  member: Member;

  initializeMember() {
    this.member = {
      employeeID: '',
      name: '',
      email: '',
      userType: '',
      imageurl: '',
      idToken: ''
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
          userType: 'User',
          imageurl: userData.image,
          idToken: userData.idToken
        }
        this.loginservice.loginMember(userData.idToken)
          .subscribe(msg => {
            console.log(msg);
            if (msg.email === this.member.email) {
              localStorage.setItem("logged", "true");
              localStorage.setItem("email", msg.email);
              localStorage.setItem("userType", msg.userType);
              localStorage.setItem("image", msg.imageurl);
              localStorage.setItem("token", userData.idToken);
              this.router.navigate(['/dashboard']);
            }

          });
      }
    );
  }

  members: Member[];
  getMembers(): void {
    this.loginservice.getMembers()
      .subscribe(members => console.log(members));
  }

  getDetails(): Member {
    return this.member;
  }
  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(e);
        if ((e['url'] === '/login') && (localStorage.getItem("logged") == 'true')) {
          console.log(e);
          this.router.navigate(['/dashboard']);
        }

      }
    });
  }
}