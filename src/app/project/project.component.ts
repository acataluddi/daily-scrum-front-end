import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectmemberService } from "../service/projectmember.service";
import { Project } from "../model/project-model"
import { ProjectService } from "../service/project.service";
import { ProjectMember } from '../model/ProjectMembers';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild('des') des: ElementRef;
  @ViewChild('email') email: ElementRef;
  
  projectmembers:ProjectMember[];
  projectmember:ProjectMember;

  public project:Project;
  count:number;

  public show1:boolean = true;
  public show2:boolean = true;

  constructor(private projectmemberservice: ProjectmemberService, private projectservice: ProjectService) {  }
  

  ngOnInit() {

    this.count = 0;
    this.getProjectMembers();
  }

  changeVisibility1() {
    this.show1 = !this.show1;
  }

  setpromem(){
    if(this.count == 0)
      this.changeVisibility2();
    else
      this.addProjectMember();
  }
  changeVisibility2() {
    this.show2 = !this.show2;
    this.count++;
  }

  set(): void {

    var proname = (<HTMLInputElement>document.getElementById("projectname")).value;
    var prodesc = this.des.nativeElement.innerText;

    this.project = new Project(proname, prodesc);
    this.projectservice.addProject(this.project).subscribe(pro => {});

    console.log(this.project.name);
    console.log(this.project.projectdescription);

  }

  getProjectMembers(): void {
      this.projectmemberservice.getProjectMembers()
    .subscribe(projectmembers => this.projectmembers = projectmembers);
  }

  addProjectMember(): void {

    var email = (<HTMLInputElement>document.getElementById("emailvalue")).value;
    var role = (<HTMLInputElement>document.getElementById("rolevalue")).value;

    if(email!='' || role!=''){
    this.projectmember = new ProjectMember(email, role);

    if (!this.projectmember) { return; }
    this.projectmemberservice.addProjectMember(this.projectmember)
      .subscribe(projectmember => {
        this.projectmembers.push(projectmember);
      });

      this.getProjectMembers();

      (<HTMLInputElement>document.getElementById("emailvalue")).value = null;
      (<HTMLInputElement>document.getElementById("rolevalue")).value = "None";
    }
  }

  delete(projectmember:ProjectMember): void {
    this.projectmembers = this.projectmembers.filter(h => h !== projectmember);
    this.projectmemberservice.deleteProjectMember(projectmember).subscribe();
  }

  cancel(): void {
    (<HTMLInputElement>document.getElementById("projectname")).value = null;
    if(this.show1 != true){
    (<HTMLInputElement>document.getElementById("projectdescription")).value = null;
    }
    (<HTMLInputElement>document.getElementById("emailvalue")).value = null;
    (<HTMLInputElement>document.getElementById("rolevalue")).value = "None";

    this.show1 = true;
    this.show2 = true;
    this.count--;

    for ( let promem of this.projectmembers) { 
      this.delete(promem);
   }
  }
  addproject(): void{
    this.set();

    this.getProjectMembers()

    console.log(this.projectmembers);
    // this.addProjectMember();
  }
  change(projectmember:ProjectMember): void{

    var id = projectmember.id;

    var emailaddress = (<HTMLInputElement>document.getElementById("email"+id.toString())).value;
    var memberole = (<HTMLInputElement>document.getElementById("role"+id.toString())).value;
    
    console.log(emailaddress);

    if(emailaddress!='' && memberole!=''){
      projectmember = new ProjectMember(emailaddress, memberole);
    }

    projectmember.id = id;

    this.projectmemberservice.updateProjectMember(projectmember).subscribe();

    this.getProjectMembers()

  }
}
