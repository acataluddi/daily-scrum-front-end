import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from '../service/project.service'
import { Project, member } from '../model/project-model'
import { Member } from '../model/member-model';
import { Router } from '@angular/router';
import { NavigationdataService } from '../service/navigationdata.service'
import { Subscription } from 'rxjs';
import { DashboardService } from '../service/dashboardservice.service';
import { ProcessIndividualTaskService } from '../service/process-individual-task.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  @Output() selectedEmailEvent = new EventEmitter();
  @Input() childProject: string;
  // childProject: string;
  op:number = 0;
  ngOnChanges(...args: any[]) {
    if(this.op>0){
    console.log('onChange fired');
    console.log('changing', args);
    console.log(this.childProject)
    this.getProMem();
  }
  this.op++;
}
  public members: Member[] = [];
  public loggedmembers: Member[];
  public projects: Project[];
  checker: boolean = false;
  public projectmembers: member[];
  subscription: Subscription;
  constructor(public router: Router,
    private dashboardservice: DashboardService,
    private projectservice: ProjectService,
    private data: NavigationdataService,
    private taskservice:ProcessIndividualTaskService) {
      // this.getProName()
        // console.log(this.childProject)
        // this.subscription = this.taskservice.newList.subscribe(
        //   data => {
        //     this.childProject = data.projectName;
        //     this.childProject = localStorage.getItem("currentProject");
        //   });
        //   console.log(this.childProject)
        // this.getProMem()
  }
ngOnInit() {
  // this.getProName()
  this.getProMem()
  
  }

  getProMem(){
    this.dashboardservice.getMembers()
      .subscribe(membersArr => this.getMembers(membersArr));


  }
  getMembers(membersArr): void {
    this.loggedmembers = membersArr;
    console.log(this.loggedmembers);

    this.projectservice.getallProjects()
      .subscribe(projectsArr => this.getProjects(projectsArr));

  }

  getProjects(projectsArr): void {
    this.projects = projectsArr;
    // this.getProName();
    console.log(this.childProject)
    for (let pro of this.projects) {
      if (pro.projectName == this.childProject) {
        this.projectmembers = pro.members;
        console.log(this.projectmembers)
      }
    }
    this.getThisProjectMembers()
  }
  
  getThisProjectMembers() {
    this.members = [];
    for (let promem of this.projectmembers) {
      for (let mem of this.loggedmembers) {
        if (promem.email == mem.email) {
          this.members.push(mem)
        }
      }
    }
    console.log(this.members)
  }

  gotoDailyStatus(memberemail: string) {
    console.log(memberemail)

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
