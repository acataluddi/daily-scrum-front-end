import { Component, OnInit } from '@angular/core';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';
import { Http, Response, Headers} from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


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


  constructor(public router: Router, private viewallservice: AdminviewallserviceService, private http: Http) {

    if (localStorage.getItem("userType") != 'Admin' && localStorage.getItem("userType") != 'Manager') {
      this.router.navigateByUrl('/dashboard');
    }
  }
  userTypes = ['Admin', 'Manager', 'User'];

  ngOnInit() {
    this.getNames();
    // console.log(this.p);

  }

  getNames() {
    this.http.get(this.viewallservice.apiURL)
      .subscribe(
        (res: Response) => {
          this.memberArray = res.json();
          this.total = this.memberArray.length;
          console.log(this.memberArray);
        })
  }
  
  
  onChange(newType, mem: Member) {
        mem.userType=newType;
        console.log(mem.userType);
        console.log(mem);
        console.log("User type changed"); 
        this.viewallservice.putmember(mem)
        .subscribe((res:Response) => {
          console.log(res);
        })

  }
  getPagenum(pagenum) {
    console.log(pagenum);
    this.p = pagenum;

  }

}


