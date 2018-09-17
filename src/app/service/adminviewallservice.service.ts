import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


const headers = new HttpHeaders().set("token", localStorage.getItem("token"));

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

private readonly baseUrl = environment.apiBase;
  constructor(private http: HttpClient ) {}

  newmember:Member;
  p = 1;
  apiURL :string;
  
  getMembers(): Observable<any> {
    this.apiURL = this.baseUrl + '/CRUDControllerUser?page=' + this.p;
    console.log(this.apiURL);
    return this.http.get<any>(this.apiURL,{headers})
  }

  getPageNum(Pagenum) { 
    this.p = Pagenum;
  }
  
  putmember(member: Member) : Observable<any> {
    var newmember = {
          name: member.name,
          email: member.email,
          userType: member.userType,       
          }
    console.log(JSON.stringify(newmember));
    
    return this.http.put<any>(this.apiURL, 
      JSON.stringify(newmember),{headers}
    );
  }
}
