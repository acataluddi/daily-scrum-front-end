import { Injectable } from '@angular/core';
import { Task } from "../model/task-model";

@Injectable({
  providedIn: 'root'
})
export class ProcessIndividualTaskService {

  MockYesterdaytask: Task[] = [
    {
      task_id: 1,
      hours_spent: 0,
      minutes_spent: 56,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: true
    },
    {
      task_id: 2,
      hours_spent: 2,
      minutes_spent: 34,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: false
    },
    {
      task_id: 3,
      hours_spent: 0,
      minutes_spent: 0,
      impediments: null,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: true
    },
    {
      task_id: 4,
      hours_spent: 0,
      minutes_spent: 50,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: null,
      task_completed: true
    },
    {
      task_id: 5,
      hours_spent: 2,
      minutes_spent: 0,
      impediments: null,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: false
    }
  ];

  MockTodaytask: Task[] = [
    {
      task_id: 1,
      hours_spent: 0,
      minutes_spent: 56,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: true
    },
    {
      task_id: 2,
      hours_spent: 2,
      minutes_spent: 34,
      impediments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
      task_completed: false
    },
    {
      task_id: 3,
      hours_spent: 0,
      minutes_spent: 0,
      impediments: null,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. Pellentesque malesuada tincidunt nisi a pharetra. Donec nunc neque, malesuada sit amet accumsan quis, egestas et risus. Vestibulum elementum erat vel convallis porttitor. Quisque eu commodo lacus, quis facilisis elit. Pellentesque volutpat nibh et orci blandit volutpat. Cras eleifend neque non mattis lacinia. Aenean ac mauris sed ex volutpat malesuada ac eu eros.",
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
