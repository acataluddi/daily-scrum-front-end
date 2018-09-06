import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project} from '../model/project-model'
import { ProjectMember } from '../model/ProjectMembers';
import { Observable, EMPTY } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept',
//     'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
//     'Authorization' : 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private projectUrl = 'http://localhost:8080/DailyScrum/ProjectController';  

  private projectmembersUrl = 'http://localhost:8080/DailyScrum/ProjectController';

  projectmembers:ProjectMember[];

  constructor(private http: HttpClient) { }

  addProject(pro: Project): Observable<Project> {

    console.log(JSON.stringify(pro));

    return this.http.post<Project>(this.projectUrl, JSON.stringify(pro))
  }

  updateProject(pro: Project):Observable<any>{

      return this.http.put(this.projectUrl, pro);
  
  }
  getProjectMembers (): Observable<ProjectMember[]> {
    this.http.get<ProjectMember[]>(this.projectmembersUrl).subscribe(projectmembers => this.projectmembers = projectmembers)

    return this.http.get<ProjectMember[]>(this.projectmembersUrl);
    }

  addProjectMember (promem: ProjectMember): Observable<ProjectMember> {

    return this.http.post<ProjectMember>(this.projectmembersUrl, promem)
  }

  deleteProjectMember (promem: ProjectMember): Observable<ProjectMember> {
    if(promem.id != 0){
    const id = typeof promem === 'number' ? promem : promem.id;
    const url = `${this.projectmembersUrl}/${id}`;
    return this.http.delete<ProjectMember>(url);
    }
    return EMPTY;
  }

  updateProjectMember (promem: ProjectMember): Observable<any> {


    return this.http.put(this.projectmembersUrl, promem);


  }
}
