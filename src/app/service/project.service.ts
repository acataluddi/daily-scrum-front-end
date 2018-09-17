import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project } from '../model/project-model'
import { ProjectMember } from '../model/ProjectMembers';
import { Observable, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';

const headers = new HttpHeaders().set("token", localStorage.getItem("token"));


@Injectable({
  providedIn: 'root'
})


export class ProjectService {

  private readonly baseUrl = environment.apiBase;

  private projectUrl = this.baseUrl + '/ProjectController';
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
