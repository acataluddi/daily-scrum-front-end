import { Component, OnInit } from '@angular/core';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';
import { LoginService } from "../service/login.service";

@Component({
  selector: 'app-adminviewall',
  templateUrl: './adminviewall.component.html',
  styleUrls: ['./adminviewall.component.css']
})
export class AdminviewallComponent implements OnInit {


  member: Member;
  memberArray: Member[];
  loggedin;
  p: number;
  total: number;
  
  constructor(private viewallservice: AdminviewallserviceService , private loginservice: LoginService) { }
  userTypes = ['Admin', 'Manager', 'User'];

  ngOnInit() {
    this.getData();
    
    
    localStorage.getItem("logged");
    console.log(localStorage.getItem("logged"));
    
  }

  getData() {
    this.memberArray = this.viewallservice.getMember();
    this.total = this.memberArray.length;
  }

  onChange(newType, email) {
    for (let member of this.memberArray) {
      if (member.email == email) {
        member.userType = newType;
        console.log(member);
        console.log("User type changed");
      }
    }
  }

  getPagenum(pagenum){
    console.log(pagenum);
    this.p=pagenum;
  }

}


