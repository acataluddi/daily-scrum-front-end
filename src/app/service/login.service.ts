import { Injectable } from '@angular/core';
import { Member, MemberT,Hero } from "../model/member-model";
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

  loginMember(member1: Member) {
    this.member = member1;
    this.API(this.member.employeeID,this.member.name,this.member.email,this.member.userType)
    this.router.navigate(['/dashboard']);
    localStorage.setItem("logged", "true");
    
  }

  
  getMember(): Member {
    return this.member;
  }
  getlogin(){
    return this.loggedIn;
  }

  API (id,name,mail,des){
    var params = {
      employeeID:id,
      name:name,
      email:mail,
      userType:des
    }
    var http = new XMLHttpRequest()
    http.open('POST','http://10.4.6.82:8081/DailyScrum-BackEnd/CRUDController')
    // http.setRequestHeader('Content-type', 'application/json')
    http.send(JSON.stringify(params))
    var body = http.response;
    console.log(body);
    http.onload = function() {
        console.log(http.responseText);
        // alert(http.responseText);
    }
  }

  private heroesUrl = 'http://10.4.6.82:8081/DailyScrum-BackEnd/CRUDController?page=2';
  getHeroes (): Observable<MemberT[]> {
    return this.http.get<MemberT[]>(this.heroesUrl)
  }

  private posturl='http://10.4.6.82:8081/DailyScrum-BackEnd/CRUDController';
  addHero (hero: Hero): Observable<any> {
    var ms = this.http.post<any>(this.posturl, 
      JSON.stringify(hero)
      // hero,
      // httpOptions
    );
    console.log(ms);
    return ms;
  }
}
