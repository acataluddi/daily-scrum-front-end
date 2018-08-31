import { Injectable } from '@angular/core';
import { Member} from "../model/member-model";
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
 

  constructor( public router: Router , private localSt:LocalStorageService,
    private http: HttpClient ) { 
  
  }
  member: Member;
  loggedIn;
  
  getStatus(){
    localStorage.setItem("logged", "false");   
  }

  private posturl='http://10.4.6.22:8080/DailyScrum/CRUDControllerUser';
  loginMember(member: Member) : Observable<any> {
    this.member=member;
    return this.http.post<any>(this.posturl, 
      JSON.stringify(member)
    );
  }

  
  getMember(): Member {
    return this.member;
  }
  getlogin(){
    return this.loggedIn;
  }

  private geturl = 'http://10.4.6.22:8080/DailyScrum/CRUDControllerUser?page=1';
  getMembers (): Observable<Member[]> {
    return this.http.get<Member[]>(this.geturl)
  }

  logoutMember(){
    this.router.navigate(['/login']);
    localStorage.setItem("logged","false");
    localStorage.setItem("email",'');
    localStorage.setItem("image",'');
  }
}
