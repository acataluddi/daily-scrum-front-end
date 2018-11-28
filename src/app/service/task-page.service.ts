import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IndividualMember } from '../model/user-task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskPageService {

  private readonly baseUrl = environment.apiBase;
  private readonly taskPageURL = this.baseUrl + '/TaskPageController';
  constructor(private http: HttpClient) { }

  getMembersTask(taskDate, projectId): Observable<IndividualMember[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("projectId", projectId)
      .set("token", localStorage.getItem("token"))
    return this.http.get<IndividualMember[]>(this.taskPageURL, { params: params })
  }

}
