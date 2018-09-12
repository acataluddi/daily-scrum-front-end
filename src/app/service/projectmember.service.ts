import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectMember } from '../model/ProjectMembers';

@Injectable({
  providedIn: 'root'
})
export class ProjectmemberService {

  private projectmembersUrl = 'http://localhost:8080/DailyScrum/ProjectController';

  projectmembers:ProjectMember[];
  
  constructor(private http: HttpClient) { }

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
