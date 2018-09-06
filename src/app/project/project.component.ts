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

  @ViewChild('des')'des': ElementRef;
  @ViewChild('email') email: ElementRef;
  
  projectmembers:ProjectMember[];
  projectmember:ProjectMember;

  public project:Project;
  count:number;
  posted:number;

  public show1:boolean = true;
  public show2:boolean = true;


  constructor(private projectmemberservice: ProjectmemberService, private projectservice: ProjectService) {  }
  
  id:string;

  ngOnInit() {

    this.count = 0;
    this.posted = 0;
    this.id = this.generateId();
    console.log(this.id)
    // this.getProjectMembers();
  }

  generateId(){
    var date = new Date();
    var concat;
    concat = date.getFullYear().toString();
    concat += date.getMonth().toString();
    concat += date.getDate().toString();
    concat += date.getHours().toString();
    concat += date.getMinutes().toString();
    concat += date.getSeconds().toString();
    concat += date.getMilliseconds().toString();

    // console.log(concat);

    return concat;

  }

  changeVisibility1() {
    this.show1 = !this.show1;
    setTimeout(() => { this.des.nativeElement.focus(); });
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

  set(): void{
    // this.getProjectMembers()
    var proname = (<HTMLInputElement>document.getElementById("projectname")).value;
    var prodesc = this.des.nativeElement.innerText;

    console.log("inside set");

    if(proname!='' || prodesc!=''){

      this.project = new Project(this.id, proname, prodesc);
      if(this.posted == 0){
        this.addProject(this.project);
      }
      else{
        this.editProject(this.project);
      }
    }
    console.log(this.projectmembers);
    // this.addProjectMember();
  }
  
  addProject(project:Project): void {
    console.log("inside add");
      this.projectservice.addProject(this.project).subscribe(
        (data:any) => {
          console.log(data);
        }
      );
      this.posted++;
      console.log(this.project.projectName);
      console.log(this.project.projectDesc);
  }

  editProject(project:Project): void{
    console.log("inside edit");
    this.projectservice.updateProject(project).subscribe();
  }

  getProjectMembers(): void {
      this.projectmemberservice.getProjectMembers()
    .subscribe(projectmembers => this.projectmembers = projectmembers);
  }

  addProjectMember(): void {

    var email = (<HTMLInputElement>document.getElementById("emailvalue")).value;
    var role = (<HTMLInputElement>document.getElementById("rolevalue")).value;

    console.log(email)
    console.log(role)


    if(email!='' || role!=''){
    this.projectmember = new ProjectMember(email, role);

    if (!this.projectmember) { return; }
    this.projectmemberservice.addProjectMember(this.projectmember)
      .subscribe(projectmember => {
        this.projectmembers.push(projectmember);
      });

      console.log(this.projectmembers);
      // this.getProjectMembers();

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

    // this.getProjectMembers()

  }
}
