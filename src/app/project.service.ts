import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project} from './model/project-model'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = 'api/project';  

  constructor(private http: HttpClient) { }

  addProject(pro: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, pro)
  }
}
