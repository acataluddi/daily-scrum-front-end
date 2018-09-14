import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../model/project-model'
import { ProjectMember } from '../model/ProjectMembers';
import { Observable, EMPTY } from 'rxjs';

const headers = new HttpHeaders().set("token", localStorage.getItem("token"));


@Injectable({
  providedIn: 'root'
})


export class ProjectService {

  private projectUrl = 'http://10.4.6.58:8081/DailyScrum/ProjectController';
  private project: Project;
  // reqType: string;
  reqType= 'add';
  private projectToBeUpdated: Project;
  constructor(private http: HttpClient) { 
    this.projectToBeUpdated=this.initializeTempProject(this.projectToBeUpdated);
  }

  setRequestType(rtype: string) {
    this.reqType = rtype;
  }

  getRequestType(): string {
    return this.reqType;
  }

  setProjectToBeUpdated(p: Project) {
    this.projectToBeUpdated = p;
  }

  getProjectToBeUpdated(): Project {
    return this.projectToBeUpdated;
  }

  addProject(pro: Project): Observable<Project> {
    this.project = pro;
    return this.http.post<Project>(this.projectUrl,
      JSON.stringify(this.project),{headers}
    );
  }

  updateProject(pro: Project): Observable<any> {
    this.project = pro;
    console.log(JSON.stringify(this.project));
    return this.http.put<any>(this.projectUrl,
      JSON.stringify(this.project),{headers}
    );
  }

  private geturl = 'http://10.4.6.58:8081/DailyScrum/ProjectController';


  // getProjects(memberEmail): Observable<Project[]> {
  //   let params = new HttpParams()
  //     .set("memberEmail", memberEmail)
  //   return this.http.get<Project[]>(this.geturl,{params:params})
  // }

  //Temporary


  initializeTempProject(newProject: Project): Project {
    newProject = {
      projectId: '',
      projectDesc: '',
      members: [],
      projectName: ''
    }
    return newProject;
  }
}
