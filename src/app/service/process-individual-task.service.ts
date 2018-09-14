import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Project } from '../model/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://10.4.6.22:8080/DailyScrum/TaskController';
  private newListSource = new Subject<Project>();  
  newList = this.newListSource.asObservable();

  getYesterdays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
    return this.http.get<Task[]>(this.url,{params:params})
  }

  getTodays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
    return this.http.get<Task[]>(this.url,{params:params})
  }

  addNewTask(newTask):Observable<any>{
    return this.http.post<any>(this.url, JSON.stringify(newTask))
  }

  updateOldTask(task): Observable<any>{
    return this.http.put<any>(this.url, JSON.stringify(task))
  }

  changeProject(currentProject: Project){
    this.newListSource.next(currentProject)
  }



  
  // changeProjectTask(currentProject: Project) {
  //   this.newListSource.next(currentProject)
  // }
}
