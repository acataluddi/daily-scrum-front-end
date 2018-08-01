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
  roles = ['Admin', 'Manager', 'User'];

  ngOnInit() {
    this.getData();
    

  }

  getData() {
    this.memberArray = this.viewallservice.getMember();
  }

  /*
  getRoles() {
    var j = 0;
    for (let member of this.memberArray) {
      this.roles = ['Admin', 'Manager', 'User'];
      if (j < 3) {
        if (member.Role == this.roles[j]){
          delete this.roles[j];
          console.log("this.roles");
        }
      j += 1;
      }
    }
  }*/

}
