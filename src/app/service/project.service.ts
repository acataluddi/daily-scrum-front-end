import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project} from '../model/project-model'
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type':  'application/json',
  'Authorization': 'my-auth-token' })
};

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private projectUrl = 'http://localhost:8080/DailyScrum/ProjectController';  

  constructor(private http: HttpClient) { }

  addProject(pro: Project): Observable<Project> {

    console.log(JSON.stringify(pro));

    return this.http.post<Project>(this.projectUrl, JSON.stringify(pro), httpOptions)
  }
}
