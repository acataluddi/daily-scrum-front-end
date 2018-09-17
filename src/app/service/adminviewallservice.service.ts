import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  private readonly baseUrl = environment.apiBase;
  constructor(private http: HttpClient) {

  }
  newmember: Member;
  p = 1;

  private apiURL = this.baseUrl + '/CRUDControllerUser?page=1';

  getMembers(): Observable<any> {

    return this.http.get<any>(this.apiURL)
  }
  getPageNum(Pagenum) {

    this.p = Pagenum;
    this.apiURL = this.baseUrl + 'CRUDControllerUser?page=' + this.p;
  }


  putmember(member: Member): Observable<any> {

    var newmember = {

      name: member.name,
      email: member.email,
      userType: member.userType,

    }
    console.log(JSON.stringify(newmember));

    return this.http.put<any>(this.apiURL, JSON.stringify(newmember)
    );
  }

}
