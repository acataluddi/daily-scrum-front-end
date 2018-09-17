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
    private http: HttpClient
  ) { }

  private url = 'http://10.4.6.22:8080/DailyScrum/TaskController';
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
    return this.http.get<Task[]>(this.url, { params: params })
  }

  getTodays(taskDate, memberEmail, projectId): Observable<Task[]> {
    let params = new HttpParams()
      .set("taskDate", taskDate)
      .set("memberEmail", memberEmail)
      .set("projectId", projectId)
    return this.http.get<Task[]>(this.url, { params: params })
  }

  addNewTask(newTask): Observable<any> {
    return this.http.post<any>(this.url, JSON.stringify(newTask))
  }

  updateOldTask(task): Observable<any> {
    return this.http.put<any>(this.url, JSON.stringify(task))
  }

  changeProject(currentProject: Project) {
    this.newListSource.next(currentProject)
  }

  getSelectedProject(selected) {
    this.selectedProject = selected;
    this.selectedSource1.next(selected);
  }

  setSelectedProject() {
    console.log(this.selectedProject)
    return this.selectedProject;
  }

}
