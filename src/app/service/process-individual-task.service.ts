import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProjectUpdated } from '../model/projectupdated-model';

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {
  constructor(
    private http: HttpClient
  ) { }
  private geturlP = 'http://localhost:8080/DailyScrum/TaskController?taskDate=2018-05-06&memberEmail=neerajd@qburst.com';
  private geturl = 'http://localhost:8080/DailyScrum/TaskController';
  private newListSource = new Subject<ProjectUpdated>();
  newList = this.newListSource.asObservable();
  getYesterdays(): Observable<Task[]> {
    return this.http.get<Task[]>(this.geturlP)
  }
  getTodays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
    return this.http.get<Task[]>(this.geturl, { params: params })
  }
  changeProjectTask(currentProject: ProjectUpdated) {
    this.newListSource.next(currentProject)
  }
}
