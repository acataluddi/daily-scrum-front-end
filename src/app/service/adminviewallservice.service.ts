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
  p = 1;

  apiURL = 'http://localhost:8080/DailyScrum/CRUDControllerUser?page=1';

  private posturl='http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=1';




  getMembers(): Observable<any> {
    return this.http.get<any>(this.apiURL)
  }
 

  
  putmember(member: Member) : Observable<any> {

    // this.newmember=member;
    var newmember = {

          name: member.name,
          email: member.email,
          userType: member.userType,
          
          }
    console.log(JSON.stringify(newmember));
    
    return this.http.put<any>(this.posturl, 
      JSON.stringify(newmember)
    );
  }

}

