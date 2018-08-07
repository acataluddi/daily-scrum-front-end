import { Injectable } from '@angular/core';
import { Member } from "./model/member-model";
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public router: Router,
    private http: HttpClient) { }
  member: Member;

  loginMember(member1: Member) {
    this.member = member1;
    this.API(this.member.employeeID,this.member.name,this.member.email,this.member.userType)
    this.router.navigate(['/dashboard']);
  }
  // apiurl="http://localhost:8081/DailyScrum/CRUDController";
  // loginMember(member1: Member): Observable<{}> {
  //   this.member = member1;
  //   var x=this.http.post<Member>(this.apiurl, this.member, httpOptions);
  //   console.log(x);
  //   // return this.http.post<Member>(this.apiurl, this.member, this.httpOptions)
  //   return x;
  //   // this.router.navigate(['/dashboard']);
  // }

  getMember(): Member {
    return this.member;
  }

  displayMessage(): void {
    console.log("In service now..");
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
        alert(http.responseText);
    }
}
}
