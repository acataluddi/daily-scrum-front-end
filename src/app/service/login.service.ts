import { Injectable } from '@angular/core';
import { Member } from "../model/member-model";
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = environment.apiBase;
  private readonly loginURL = environment.loginURL;
  constructor(public router: Router, private localSt: LocalStorageService,
    private http: HttpClient) {

  }
  member: Member;
  loggedIn;

  getStatus() {
    localStorage.setItem("logged", "false");
  }



  private posturl = this.baseUrl + '/CRUDControllerUser';
  loginMember(UserToken: string): Observable<any> {
    const headers = new HttpHeaders().set("token", UserToken);
    return this.http.post<any>(this.posturl,
      JSON.stringify("Login"), { headers }
    );
  }

  getMember(): Member {
    return this.member;
  }
  getlogin() {
    return this.loggedIn;
  }

  private geturl = this.baseUrl + '/CRUDControllerUser?page=1';
  getMembers(): Observable<Member[]> {

    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.get<Member[]>(this.geturl, { headers })
  }

  logoutMember() {
    localStorage.setItem("logged", "false");
    localStorage.setItem("email", '');
    localStorage.setItem("image", '');
    localStorage.setItem("currentProject", '');
    localStorage.setItem("userType", '');
    localStorage.setItem("token", '');
    localStorage.setItem("projectId", '');
    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + this.loginURL;
  }
}
