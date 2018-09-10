import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

  // MockYesterdaytask: Task[] = [
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "19082018101030",
  //     hourSpent: 0,
  //     minuteSpent: 56,
  //     impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
  //     taskCompleted: true,
  //     projectId: null,
  //     taskDate: ''
  //   },
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "19082018101500",
  //     hourSpent: 2,
  //     minuteSpent: 34,
  //     impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
  //     taskCompleted: false,
  //     projectId: null,
  //     taskDate: ''
  //   },
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "19082018122020",
  //     hourSpent: 0,
  //     minuteSpent: 0,
  //     impediments: '',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
  //     taskCompleted: true,
  //     projectId: null,
  //     taskDate: ''
  //   },
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "19082018134030",
  //     hourSpent: 0,
  //     minuteSpent: 50,
  //     impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
  //     taskCompleted: true,
  //     projectId: null,
  //     taskDate: ''
  //   },
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "19082018153005",
  //     hourSpent: 2,
  //     minuteSpent: 0,
  //     impediments: '',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
  //     taskCompleted: false,
  //     projectId: null,
  //     taskDate: ''
  //   }
  // ];

  // MockTodaytask: Task[] = [
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "20082018101110",
  //     hourSpent: 0,
  //     minuteSpent: 56,
  //     impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna.",
  //     taskCompleted: true,
  //     projectId: null,
  //     taskDate: ''
  //   },
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "20082018114030",
  //     hourSpent: 2,
  //     minuteSpent: 34,
  //     impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     taskCompleted: false,
  //     projectId: null,
  //     taskDate: ''
  //   },
  //   {
  //     memberId: "Patrick Cunningham",
  //     taskId: "20082018121020",
  //     hourSpent: 0,
  //     minuteSpent: 0,
  //     impediments: '',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. ",
  //     taskCompleted: true,
  //     projectId: null,
  //     taskDate: ''
  //   }
  // ];

  // getYesterdayTasks(): Task[] {
  //   return this.MockYesterdaytask;
  // }

  // getTodayTasks(): Task[] {
  //   return this.MockTodaytask;
  // }

  constructor(
    private http: HttpClient
  ) { }

  private geturlP = 'http://localhost:8080/DailyScrum/TaskController?taskDate=2018-05-06&memberEmail=neerajd@qburst.com';
  private geturl = 'http://localhost:8080/DailyScrum/TaskController'; 

  getYesterdays(): Observable<Task[]> {
    return this.http.get<Task[]>(this.geturlP)
  }

  getTodays(taskDate, memberEmail,projectId): Observable<Task[]> {
    let params = new HttpParams()
    .set("taskDate", taskDate)
    .set("memberEmail", memberEmail)
    .set("projectId",projectId)
    return this.http.get<Task[]>(this.geturl,{params:params})
    }

  // private posturl = 'http://10.4.6.71:8080/DailyScrum/TaskController';
  // addTask(member: Member): Observable<any> {
  //   this.member = member;
  //   return this.http.post<any>(this.posturl,
  //     JSON.stringify(member)
  //   );
  // }

}
