import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { Project } from '../model/project-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

  private readonly baseUrl = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }
  private url = this.baseUrl + '/TaskController';
  private newListSource = new Subject<Project>();
  newList = this.newListSource.asObservable();
  private selectedSource1 = new Subject<Project>();
  selected1 = this.selectedSource1.asObservable();
  private selectedSource2 = new Subject<Project>();
  selected2 = this.selectedSource2.asObservable();
  selectedProject;

  getYesterdays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
      .set("token", localStorage.getItem("token"))
    return this.http.get<Task[]>(this.url, { params: params })
  }

  getTodays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
      .set("token", localStorage.getItem("token"))
    return this.http.get<Task[]>(this.url, { params: params })
  }

  addNewTask(newTask): Observable<any> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.post<any>(this.url, JSON.stringify(newTask), { headers })
  }

  updateOldTask(task): Observable<any> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.put<any>(this.url, JSON.stringify(task), { headers })
  }

  deleteTask(task: Task): Observable<any> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    var taskId = task.taskId;
    var memberEmail = task.memberEmail;
    let params = new HttpParams()
      .set("taskId", taskId)
      .set("memberEmail", memberEmail)
      .set("token", localStorage.getItem("token"))
    return this.http.delete<any>(this.url, { params })
  }

  changeProject(currentProject: Project) {
    localStorage.setItem("projectId", currentProject.projectId);
    localStorage.setItem("currentProject", currentProject.projectName);
    this.newListSource.next(currentProject)
  }

  getSelectedProject(selected) {
    this.selectedProject = selected;
    this.selectedSource1.next(selected);
  }

  setSelectedProject() {
    return this.selectedProject;
  }
}
