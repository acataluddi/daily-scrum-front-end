import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../model/project-model'
import { Observable, EMPTY } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private readonly baseUrl = environment.apiBase;
  private projectUrl = this.baseUrl + '/ProjectController';
  url: string;
  private project: Project;
  private newproject: Project[];
  reqType = 'add';
  private projectToBeUpdated: Project;
  constructor(private http: HttpClient) {
    this.projectToBeUpdated = this.initializeTempProject(this.projectToBeUpdated);
  }

  setRequestType(rtype: string) {
    this.reqType = rtype;
    localStorage.setItem('reqType', this.reqType);
  }

  setProjectArray(newproject: Project[]) {
    this.newproject = newproject;
  }

  getProjectArray(): Project[] {
    return (this.newproject);
  }

  getRequestType(): string {
    this.reqType = localStorage.getItem('reqType')
    return this.reqType;
  }

  getMembers() {
    return this.http.get("../../assets/QbEmployee.json")
  }
  setProjectToBeUpdated(p: Project) {
    this.projectToBeUpdated = p;
    localStorage.setItem('changeProjectID', this.projectToBeUpdated.projectId);
  }

  getProjectToBeUpdated(): String {
    var pid = localStorage.getItem('changeProjectID');
    return pid;
  }

  addProject(pro: Project): Observable<Project> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    this.project = pro;
    return this.http.post<Project>(this.projectUrl,
      JSON.stringify(this.project), { headers }
    );
  }

  updateProject(pro: Project): Observable<any> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    this.project = pro;
    return this.http.put<any>(this.projectUrl,
      JSON.stringify(this.project), { headers }
    );
  }

  initializeTempProject(newProject: Project): Project {
    newProject = {
      projectId: '',
      projectDesc: '',
      members: [],
      projectName: '',
      startDate: '',
      endDate: ''
    }
    return newProject;
  }
}
