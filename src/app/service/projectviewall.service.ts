import { Injectable } from '@angular/core';
import { ProjectUpdated } from '../model/projectupdated-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectviewallService {
  constructor(
    private http: HttpClient
  ) { }
  private geturl = 'http://10.4.6.22:8080/DailyScrum/ProjectController';
  getLoggedProjects(memberEmail): Observable<ProjectUpdated[]> {
    let params = new HttpParams()
      .set("memberEmail", memberEmail)
    return this.http.get<ProjectUpdated[]>(this.geturl, { params: params })
  }
}
