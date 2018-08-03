import { Component, OnInit } from '@angular/core';
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';


@Component({
  selector: 'app-adminviewall',
  templateUrl: './adminviewall.component.html',
  styleUrls: ['./adminviewall.component.css']
})
export class AdminviewallComponent implements OnInit {

  member: Member;
  memberArray: Member[];
  constructor(private viewallservice: AdminviewallserviceService) { }
  userTypes = ['Admin', 'Manager', 'User'];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.memberArray = this.viewallservice.getMember();
  }

  onChange(newType, email) {
    for (let member of this.memberArray) {
      if (member.Email == email) {
        member.UserType = newType;
        console.log(member);
        console.log("User type changed");
      }
    }
  }


}


