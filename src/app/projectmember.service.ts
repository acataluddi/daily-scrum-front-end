import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectMember } from './model/ProjectMembers';

@Injectable({
  providedIn: 'root'
})
export class ProjectmemberService {

  private projectmembersUrl = 'api/projectmembers';  

  projectmembers:ProjectMember[];
  
  constructor(private http: HttpClient) { }

  // setProject (project: Project): Observable<Project>{
  //   return this.http.post<Project>(this.projectmembersUrl, project)
  // }

  getProjectMembers (): Observable<ProjectMember[]> {
    this.http.get<ProjectMember[]>(this.projectmembersUrl).subscribe(projectmembers => this.projectmembers = projectmembers)
    console.log(this.projectmembers);
    return this.http.get<ProjectMember[]>(this.projectmembersUrl);
  }

  addProjectMember (promem: ProjectMember): Observable<ProjectMember> {
    return this.http.post<ProjectMember>(this.projectmembersUrl, promem)
  }

  deleteHero (promem: ProjectMember): Observable<ProjectMember> {
    if(promem.id != 0){
    console.log(promem.id);
    const id = typeof promem === 'number' ? promem : promem.id;
    const url = `${this.projectmembersUrl}/${id}`;
    return this.http.delete<ProjectMember>(url);
    }
    return EMPTY;
  }
}
