import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'text/plain',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': ' PUT',
  })
};


@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  
  constructor(private http: HttpClient ) { 
  
  }
  newmember:Member;

  apiURL = 'http://10.4.6.71:8080/DailyScrum/CRUDControllerUser?page=1';
  private posturl='http://10.4.6.71:8080/DailyScrum/CRUDControllerUser?page=1';
  putmember(member: Member) : Observable<any> {

    // this.newmember=member;
    var newmember = {

          name: member.name,
          email: member.email,
          userType: member.userType,
          
          }
    console.log(JSON.stringify(newmember));
    
    return this.http.post<any>("http://10.4.6.71:8080/DailyScrum/CRUDControllerUser?page=1", 
      JSON.stringify(newmember)
    );
  }

}

