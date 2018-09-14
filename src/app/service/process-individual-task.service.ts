import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Project } from '../model/project-model';

const headers = new HttpHeaders().set("token", localStorage.getItem("token"));

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

  constructor(
    private http: HttpClient,
  ) { }

  private url = 'http://10.4.6.58:8081/DailyScrum/TaskController';
  private newListSource = new Subject<Project>();  
  newList = this.newListSource.asObservable();

  getYesterdays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
      .set("token",localStorage.getItem("token"))
    return this.http.get<Task[]>(this.url,{params:params})
  }

  getTodays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
      .set("token",localStorage.getItem("token"))
    return this.http.get<Task[]>(this.url,{params:params})
  }

  addNewTask(newTask):Observable<any>{
    return this.http.post<any>(this.url, JSON.stringify(newTask),{headers})
  }

  updateOldTask(task): Observable<any>{
    return this.http.put<any>(this.url, JSON.stringify(task),{headers})
  }

  changeProject(currentProject: Project){
    this.newListSource.next(currentProject)
  }



  
  // changeProjectTask(currentProject: Project) {
  //   this.newListSource.next(currentProject)
  // }
}
