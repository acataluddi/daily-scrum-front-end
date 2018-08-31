import { Component, OnInit } from '@angular/core';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';
import { Http , Response, Headers, RequestOptions ,RequestMethod, RequestOptionsArgs} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';


import { Observable, observable } from 'rxjs';

const httpOptions = {
  headers: new Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-adminviewall',
  templateUrl: './adminviewall.component.html',
  styleUrls: ['./adminviewall.component.css']
})
export class AdminviewallComponent implements OnInit {

  member: Member;
  memberArray: Member[];
  p: number;
  total: number;
  
 
  constructor(private viewallservice: AdminviewallserviceService , private http:Http) {}
  userTypes = ['Admin', 'Manager', 'User'];

  ngOnInit() {
    this.getNames();
    // console.log(this.p);
    
  }

  getNames(){
    this.http.get(this.viewallservice.apiURL)
    .subscribe(
        (res:Response) =>{
           this.memberArray= res.json();
           this.total = this.memberArray.length;
           console.log(this.memberArray);    
    })
  }
  private postURL= 'http://10.4.6.58:8081/DailyScrum/CRUDControllerUser';
  putUpdate(member:Member):Promise<Member>{
    let cpHeaders = new Headers({ 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    // let options = new RequestOptions({ headers: cpHeaders , method: RequestMethod.Put});
    var newmember = {

      name: member.name,
      email: member.email,
      userType: member.userType,
      
      }
  
      console.log(JSON.stringify(newmember));
       return this.http.put(this.postURL, JSON.stringify(newmember),{headers:cpHeaders})
       .toPromise()
       .then(res => res.json().data());
         
      
  }
  
  onChange(newType, mem: Member) {
        mem.userType=newType;
        console.log(mem.userType);
        console.log(mem);
        console.log("User type changed");
        this.putUpdate(mem).then((res)=> console.log(res));
        // .subscribe((res:Response)=> console.log(res.json()));  

  }
  getPagenum(pagenum){
    console.log(pagenum);
    this.p=pagenum;
    
  }

}


