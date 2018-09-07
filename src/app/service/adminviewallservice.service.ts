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

  apiURL = 'http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=1';

  private posturl='http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=1';


  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiURL)
  }

}

