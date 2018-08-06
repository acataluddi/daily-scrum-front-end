import { Injectable } from '@angular/core';
import { Member } from "./model/member-model";
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedin;

  constructor(public router: Router , private localSt:LocalStorageService) { 
    this.loggedin = false;
  }
  member: Member;
  
  

  loginMember(member1: Member) {
    this.member = member1;
    this.router.navigate(['/dashboard']);
    this.loggedin = true;
    
  }

  
  getMember(): Member {
    return this.member;
  }
  getLoginStatus() {
    return this.loggedin;
  }
}
