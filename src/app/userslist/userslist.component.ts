import { Component, OnInit } from '@angular/core';
import { MemberTaskService } from '../service/member-task.service'
import { MemberTask } from '../model/task-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  public members: MemberTask[];

  constructor(private membertaskservice : MemberTaskService, public router: Router) { }

  ngOnInit() {
    // console.log("this is a hi")
    this.members = this.membertaskservice.getMember1();
    // console.log(this.members);
  }

  gotoDailyStatus(membername:string) {
    console.log(membername);
    this.router.navigateByUrl('/daily-status');
  }
  // changeCSS(){
  //   document.getElementById("search_name").setAttribute("class","searching_name")
  //   document.getElementById("member").style.visibility = "hidden";
  // }

}
