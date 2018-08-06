import { Component, OnInit, NgZone } from '@angular/core';
import { Member } from "../model/member-model";
import { Router } from '@angular/router';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,
    private loginservice: LoginService, ngZone: NgZone) { 
      window['onSignIn'] = (googleUser) => ngZone.run(() => this.onSignIn(googleUser));
      // window['renderButton'] = () => ngZone.run(() => this.renderButton());
      window['onFailure'] = (error) => ngZone.run(() => this.onFailure(error));
    }

  ngOnInit() {
    this.initializeMember();
    // (<any>window).onSignIn = this.onSignIn;
    // (<any>window).loginservice = this.loginservice;
    (<any>window).signOut = this.signOut;
    (<any>window).renderButton = this.renderButton;
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
    console.log('in init');
    this.loginservice.displayMessage();
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      // 'width': 240,
      // 'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
      'onfailure': this.onFailure
    });
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log('Token: ' + googleUser.getAuthResponse().id_token);
    // this.initializeMember();
    this.member = {
      Id: profile.getId(),
      Name: profile.getName(),
      Email: profile.getEmail(),
      Imageurl: profile.getImageUrl(),
      Token: googleUser.getAuthResponse().id_token,
      UserType: null
    }
    this.loginservice.loginMember(this.member);
    // this.loginservice.displayMessage();
  }
  onFailure(error) {
    console.log(error);
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
}
