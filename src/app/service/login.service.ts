import { Injectable } from '@angular/core';
import { Member } from "../model/member-model";
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


const headers = new HttpHeaders().set("token", localStorage.getItem("token"));

@Injectable({
  providedIn: 'root'
})
export class LoginService {




  constructor(public router: Router, private localSt: LocalStorageService,
    private http: HttpClient) {

  }
  member: Member;
  loggedIn;

  getStatus() {
    localStorage.setItem("logged", "false");
  }
  private posturl='http://10.4.6.58:8081/DailyScrum/CRUDControllerUser';
  loginMember(UserToken: string) : Observable<any> {
    
    

    return this.http.post<any>(this.posturl, 
      JSON.stringify("Login"),{headers}
    );
  }

  getMember(): Member {
    return this.member;
  }
  getlogin() {
    return this.loggedIn;
  }

  private geturl = 'http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=1';
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.geturl,{headers})
  }

  logoutMember() {
    this.router.navigate(['/login']);
    localStorage.setItem("logged", "false");
    localStorage.setItem("email", '');
    localStorage.setItem("image", '');
    localStorage.setItem("token",'');
    localStorage.setItem("userType",'');
  }
}
