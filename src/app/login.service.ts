import { Injectable } from '@angular/core';
import { Member } from "./model/member-model";
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
 

  constructor(public router: Router , private localSt:LocalStorageService) { 
  
  }
  member: Member;
  loggedIn;
  
  getStatus(){
    localStorage.setItem("logged", "false");
   
  }

  loginMember(member1: Member) {
    this.member = member1;
    this.router.navigate(['/dashboard']);
    localStorage.setItem("logged", "true");
    
  }

  
  getMember(): Member {
    return this.member;
  }
  getlogin(){
    return this.loggedIn;
  }
}
