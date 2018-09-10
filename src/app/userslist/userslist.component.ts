import { Component, OnInit } from '@angular/core';
import { MemberTaskService } from '../service/member-task.service'
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Member } from '../model/member-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  public members: Member[];
  memberArray: Member[];

  constructor(private membertaskservice : MemberTaskService, public router: Router, private viewallservice: AdminviewallserviceService) { }

  ngOnInit() {
    console.log("this is a hi")
    this.viewallservice.getMembers()
    .subscribe(membersArr => this.getMembers(membersArr));
  }

  getMembers(membersArr): void {
    this.members = membersArr;
    console.log("hiii");
    console.log(this.members);
  }

  gotoDailyStatus(membername:string) {
    console.log(membername);
    this.router.navigateByUrl('/daily-status');
  }
  changeCSS(){
    document.getElementById("search_name").style.display = "flex";
    document.getElementById("userslist").style.display = "block";
    for(var i in this.members)
    document.getElementById("member_name"+i).style.display = "flex";
  }
}
