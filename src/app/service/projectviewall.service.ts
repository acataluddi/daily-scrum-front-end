import { Injectable } from '@angular/core';
import { ProjectUpdated } from '../model/projectupdated-model';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    let params = new HttpParams()
      .set("memberEmail", memberEmail)
    return this.http.get<ProjectUpdated[]>(this.geturl, { params: params })
  }
}
