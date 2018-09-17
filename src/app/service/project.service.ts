import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../model/project-model'
import { ProjectMember } from '../model/ProjectMembers';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private projectUrl = 'http://10.4.6.71:8080/DailyScrum/ProjectController';
  url: string;
  private project: Project;
  reqType = 'add';
  private projectToBeUpdated: Project;
  constructor(private http: HttpClient) {
    this.projectToBeUpdated = this.initializeTempProject(this.projectToBeUpdated);
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
      JSON.stringify(this.project)
    );
  }

  updateProject(pro: Project): Observable<any> {
    this.project = pro;
    console.log(JSON.stringify(this.project));
    return this.http.put<any>(this.projectUrl,
      JSON.stringify(this.project)
    );
  }

  getallProjects(): Observable<Project[]> {
    console.log(this.projectUrl)
    this.url = this.projectUrl.concat('?memberEmail=getall')
    console.log(this.url)
    return this.http.get<Project[]>(this.url)
  }


  getProjects(memberEmail): Observable<Project[]> {
    let params = new HttpParams()
      .set("memberEmail", memberEmail)
    return this.http.get<Project[]>(this.projectUrl, { params: params })
  }

  //Temporary


  initializeTempProject(newProject: Project): Project {
    newProject = {
      projectId: '20188714303243',
      projectDesc: 'This project aims at creating a Back-end Basket API for Adastria.',
      members: [
        {
          email: 'sanjo@qburst.com',
          role: 'Developer'
        }
      ],
      projectName: "Adastria Basket"
    }
    return newProject;
  }
}
