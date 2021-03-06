import { Injectable } from '@angular/core';
import { ProjectUpdated } from '../model/projectupdated-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectviewallService {

  private readonly baseUrl = environment.apiBase;
  constructor(
    private http: HttpClient
  ) { }
  private geturl = this.baseUrl + '/ProjectController';
  getLoggedProjects(memberEmail): Observable<ProjectUpdated[]> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.get<ProjectUpdated[]>(this.geturl, { headers })
  }
}
