import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from '../service/project.service'
import { Project, member } from '../model/project-model'
import { Member } from '../model/member-model';
import { Router } from '@angular/router';
import { NavigationdataService } from '../service/navigationdata.service'
import { HostListener } from "@angular/core";
import { DashboardService } from '../service/dashboardservice.service';
@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  @Output() selectedEmailEvent = new EventEmitter();
  @Input() childProject: Project;
  public members: Member[] = [];
  public loggedmembers: Member[];
  public projects: Project[];
  checker: boolean = false;
  public projectmembers: member[];
  constructor(public router: Router,
    private dashboardservice: DashboardService,
    private projectservice: ProjectService,
    private data: NavigationdataService) {
  }
ngOnInit() {
    this.dashboardservice.getMembers()
      .subscribe(membersArr => this.getMembers(membersArr));
  }

  getMembers(membersArr): void {
    this.loggedmembers = membersArr;
    console.log(this.loggedmembers);

    this.projectservice.getProjects()
      .subscribe(projectsArr => this.getProjects(projectsArr));

  }

  getProjects(projectsArr): void {
    this.projects = projectsArr;
    for (let pro of this.projects) {
      if (pro.projectName == this.childProject.projectName) {
        this.projectmembers = pro.members;

      }
    }
    this.getThisProjectMembers()
  }

  getThisProjectMembers() {
    for (let promem of this.projectmembers) {
      for (let mem of this.loggedmembers) {
        if (promem.email == mem.email) {
          this.members.push(mem)
        }
      }
    }

  }

  gotoDailyStatus(memberemail: string) {
    this.selectedEmailEvent.emit(memberemail)
    this.data.changedata(memberemail)
    this.router.navigateByUrl('/daily-status');
  }

  changeCSS(){
    if(!this.checker){
      document.getElementById("userslist").classList.add("block")
      document.getElementById("search_name").classList.add("flexed")
      // for (var i in this.members)
        // document.getElementById("member_name" + i).classList.add("flex")
        document.getElementById("userslist").classList.add("flex")

        
    this.checker = !this.checker
    }
    else{
      document.getElementById("userslist").classList.remove("block")
      document.getElementById("search_name").classList.remove("flexed")
      // for (var i in this.members)
      //   document.getElementById("member_name" + i).classList.remove("flex")
      document.getElementById("userslist").classList.remove("flex")

      this.checker = !this.checker
    }
    
  }


}
