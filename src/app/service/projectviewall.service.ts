import { Injectable } from '@angular/core';
import { ProjectUpdated } from '../model/projectupdated-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders().set("token", localStorage.getItem("token"));

@Injectable({
  providedIn: 'root'
})
export class ProjectviewallService {
  constructor(
    private http: HttpClient
  ) { }
  private geturl = 'http://10.4.6.58:8081/DailyScrum/ProjectController';
  getLoggedProjects(): Observable<ProjectUpdated[]> {
    return this.http.get<ProjectUpdated[]>(this.geturl, { headers })
  }
}
