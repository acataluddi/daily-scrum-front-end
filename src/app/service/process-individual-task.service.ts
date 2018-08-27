import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

  MockYesterdaytask: Task[] = [
    {
      member_name:"Patrick Cunningham",
      task_id: 19082018101030,
      hours_spent: 0,
      minutes_spent: 56,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: true
    },
    {
      member_name:"Patrick Cunningham",
      task_id: 19082018101500,
      hours_spent: 2,
      minutes_spent: 34,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: false
    },
    {
      member_name:"Patrick Cunningham",
      task_id: 19082018122020,
      hours_spent: 0,
      minutes_spent: 0,
      impediments: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: true
    },
    {
      member_name:"Patrick Cunningham",
      task_id: 19082018134030,
      hours_spent: 0,
      minutes_spent: 50,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: true
    },
    {
      member_name:"Patrick Cunningham",
      task_id: 19082018153005,
      hours_spent: 2,
      minutes_spent: 0,
      impediments: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: false
    }
  ];

  MockTodaytask: Task[] = [
    {
      member_name:"Patrick Cunningham",
      task_id: 20082018101110,
      hours_spent: 0,
      minutes_spent: 56,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna.",
      task_completed: true
    },
    {
      member_name:"Patrick Cunningham",
      task_id: 20082018114030,
      hours_spent: 2,
      minutes_spent: 34,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      task_completed: false
    },
    {
      member_name:"Patrick Cunningham",
      task_id: 20082018121020,
      hours_spent: 0,
      minutes_spent: 0,
      impediments: '',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. ",
      task_completed: true
    }
  ];


  constructor() { }


  getYesterdayTasks(): Task[] {
    return this.MockYesterdaytask;
  }

  getTodayTasks(): Task[] {
    return this.MockTodaytask;
  }


}
