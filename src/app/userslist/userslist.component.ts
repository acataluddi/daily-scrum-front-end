import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from '../service/project.service'
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Project } from '../model/project-model'
import { Member } from '../model/member-model';
import { Router } from '@angular/router';
import { NavigationdataService } from '../service/navigationdata.service'
import { TaskPageAdminComponent } from '../task-page-admin/task-page-admin.component'
@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  @Output() selectedEmailEvent = new EventEmitter();
  public members: Member[];
  public projects: Project[];
  memberArray: Member[];

  constructor(public router: Router, private viewallservice: AdminviewallserviceService, private projectservice: ProjectService,private data: NavigationdataService) { }

  ngOnInit() {
    console.log("this is a hi")
    this.viewallservice.getMembers()
    .subscribe(membersArr => this.getMembers(membersArr));

    this.projectservice.getProjects()
    .subscribe(projectsArr => this.getProjects(projectsArr));
  }

  getMembers(membersArr): void {
    this.members = membersArr;
    console.log("hiii");
    console.log(this.members);
  }

  getProjects(projectsArr): void {
    this.projects = projectsArr;
    console.log(this.projects)
  }

  gotoDailyStatus(memberemail:string) {
    console.log(memberemail);
    // this.selectedEmailEvent.emit(memberemail)
    this.data.changedata(memberemail)
    this.router.navigateByUrl('/daily-status');
  }
  changeCSS(){
    document.getElementById("search_name").style.display = "flex";
    document.getElementById("userslist").style.display = "block";
    for(var i in this.members)
    document.getElementById("member_name"+i).style.display = "flex";
  }
}
