import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";
import { Http, Response, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

  MockYesterdaytask: Task[] = [
    {
      memberId: "Patrick Cunningham",
      taskId: "19082018101030",
      hourSpent: 0,
      minuteSpent: 56,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      taskCompleted: true,
      projectId: null,
      taskDate: ''
    },
    {
      memberId: "Patrick Cunningham",
      taskId: "19082018101500",
      hourSpent: 2,
      minuteSpent: 34,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      taskCompleted: false,
      projectId: null,
      taskDate: ''
    },
    {
      memberId: "Patrick Cunningham",
      taskId: "19082018122020",
      hourSpent: 0,
      minuteSpent: 0,
      impediments: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      taskCompleted: true,
      projectId: null,
      taskDate: ''
    },
    {
      memberId: "Patrick Cunningham",
      taskId: "19082018134030",
      hourSpent: 0,
      minuteSpent: 50,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      taskCompleted: true,
      projectId: null,
      taskDate: ''
    },
    {
      memberId: "Patrick Cunningham",
      taskId: "19082018153005",
      hourSpent: 2,
      minuteSpent: 0,
      impediments: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      taskCompleted: false,
      projectId: null,
      taskDate: ''
    }
  ];

  MockTodaytask: Task[] = [
    {
      memberId: "Patrick Cunningham",
      taskId: "20082018101110",
      hourSpent: 0,
      minuteSpent: 56,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna.",
      taskCompleted: true,
      projectId: null,
      taskDate: ''
    },
    {
      memberId: "Patrick Cunningham",
      taskId: "20082018114030",
      hourSpent: 2,
      minuteSpent: 34,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      taskCompleted: false,
      projectId: null,
      taskDate: ''
    },
    {
      memberId: "Patrick Cunningham",
      taskId: "20082018121020",
      hourSpent: 0,
      minuteSpent: 0,
      impediments: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. ",
      taskCompleted: true,
      projectId: null,
      taskDate: ''
    }
  ];


  constructor(
    private http: Http
  ) { }

  private geturlP = 'http://10.4.6.71:8080/DailyScrum/TaskController?taskDate=2018-05-05&employeeId=123';
  private geturlT = 'http://10.4.6.71:8080/DailyScrum/TaskController?taskDate=2018-05-06&employeeId=123';
  Todaystask: Task[];
  PreviousDaytask: Task[];


  getYesterdayTasks(): Task[] {
    return this.MockYesterdaytask;
  }

  getTodayTasks(): Task[] {
    return this.MockTodaytask;
  }

  getPreviousDay():Task[] {
    this.http.get(this.geturlP)
      .subscribe(
        (res: Response) => {
          this.PreviousDaytask = res.json();
          console.log(this.PreviousDaytask);
        })
        return this.PreviousDaytask;
  }

  getTodays(): Task[] {
    this.http.get(this.geturlT)
      .subscribe(
        (res: Response) => {
          this.Todaystask = res.json();
          console.log(this.Todaystask);
        })
    return this.Todaystask;
  }

}
