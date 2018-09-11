import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from '../service/project.service'
import { AdminviewallserviceService } from '../service/adminviewallservice.service';
import { Project, member } from '../model/project-model'
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
  @Input() childProject: Project;
  public members: Member[] = [];
  public loggedmembers: Member[];
  public projects: Project[];
  // memberArray: Member[];
  public projectmembers: member[];
  constructor(public router: Router, private viewallservice: AdminviewallserviceService, private projectservice: ProjectService,private data: NavigationdataService) { }

  ngOnInit() {
    console.log("this is a hi")
    this.viewallservice.getMembers()
    .subscribe(membersArr => this.getMembers(membersArr));

    
    console.log(this.childProject)

    
  }

  getMembers(membersArr): void {
    this.loggedmembers = membersArr;
    console.log("hiii");
    console.log(this.loggedmembers);
    
    this.projectservice.getProjects()
    .subscribe(projectsArr => this.getProjects(projectsArr));

  }

  getProjects(projectsArr): void {
    this.projects = projectsArr;
    console.log(this.projects)
    for(let pro of this.projects){
      // console.log(pro.members)
      console.log(pro.projectName)
      if(pro.projectName == this.childProject.projectName){
        console.log(pro.members)
        this.projectmembers = pro.members;
        console.log(this.projectmembers)

      }
    }
    this.getThisProjectMembers()
  }

  getThisProjectMembers(){
    for(let promem of this.projectmembers){
      for(let mem of this.loggedmembers){
        if(promem.email == mem.email){
          console.log(mem)
          this.members.push(mem)
        }
    }
    }
    console.log(this.members)
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
