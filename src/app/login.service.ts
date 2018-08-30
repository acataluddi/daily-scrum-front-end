import { Injectable } from '@angular/core';
import { Member } from "./model/member-model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public router: Router) { }
  member: Member;

  loginMember(member1: Member) {
    this.member = member1;
    this.router.navigate(['/dashboard']);
  }

  getMember(): Member {
    return this.member;
  }
}
