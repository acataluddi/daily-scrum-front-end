import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Project } from '../model/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

 
  constructor(
    private http: HttpClient,
    // private currentProject: Project
  ) { }
  // current: Project;
  private url = 'http://10.4.6.71:8080/DailyScrum/TaskController';
  private newListSource = new Subject<Project>();  
  newList = this.newListSource.asObservable();

  getYesterdays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
      // console.log(params)
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
  // private posturl = 'http://10.4.6.71:8080/DailyScrum/TaskController';
  // addTask(member: Member): Observable<any> {
  //   this.member = member;
  //   return this.http.post<any>(this.posturl,
  //     JSON.stringify(member)
  //   );
  // }

  // setProject(currentProject){
  //   this.current = currentProject;
  //   console.log(this.current)
  // }

  changeProject(currentProject: Project){

    this.newListSource.next(currentProject)
  }
}
