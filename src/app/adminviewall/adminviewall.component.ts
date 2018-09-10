import { Component, OnInit } from '@angular/core';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


import { Observable, observable } from 'rxjs';

const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/json',
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


  constructor(public router: Router, private viewallservice: AdminviewallserviceService, private http: HttpClient) {

    if (localStorage.getItem("userType") != 'Admin' && localStorage.getItem("userType") != 'Manager') {
      this.router.navigateByUrl('/dashboard');
    }
  }
  userTypes = ['Admin', 'Manager', 'User'];

  ngOnInit() {

    this.viewallservice.getMembers()
    .subscribe(membersArr => this.getMembers(membersArr));
  }


  getMembers(membersArr): void {
    this.memberArray = membersArr;
    console.log(this.memberArray);
  }
 

  private postURL = 'http://localhost:8080/DailyScrum/CRUDControllerUser';
  putUpdate(member: Member) {
    let cpHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials': true
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    // let options = new RequestOptions({ headers: cpHeaders , method: RequestMethod.Put});
    var newmember = {

      name: member.name,
      email: member.email,
      userType: member.userType,

    }

    console.log(JSON.stringify(newmember));
    return this.http.put(this.postURL, JSON.stringify(newmember))
      .toPromise()
      // .then(res => res.json().data());


  }

  onChange(newType, mem: Member) {
    mem.userType = newType;
    console.log(mem.userType);
    console.log(mem);
    console.log("User type changed");
    // this.putUpdate(mem).then((res) => console.log(res));
    // .subscribe((res:Response)=> console.log(res.json()));  

  }
  getPagenum(pagenum) {
    console.log(pagenum);
    this.p = pagenum;

  }

}
