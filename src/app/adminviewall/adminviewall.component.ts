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

   onChange(newRole, email) {
    //  this.viewallservice.updateRole(newRole, email);
     for(let member of this.memberArray){
        if(member.Email == email){
          member.Role = newRole;
          console.log(member);
          console.log("Role changed");
        }
      }
   }

  
  }


