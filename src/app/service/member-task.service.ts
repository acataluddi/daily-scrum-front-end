import { Injectable } from '@angular/core';
import { MemberTask,Task } from "../model/task-model";


@Injectable({
  providedIn: 'root'
})
export class MemberTaskService {

    constructor() { }
    MockMember1: MemberTask[] = [
        {
          member_name:"Patrick Cunningham",
          imageurl:"../../assets/Google_logo.png",
          hours_spent: 6,
          minutes_spent: 32,
          
          
          task1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
         
          task2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.  "
        },
        {
          member_name:"Julia Peterson",
          imageurl:"../../assets/Google_logo.png",
          hours_spent: 6,
          minutes_spent: 32,
          
          task1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. ",
          task2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "

        },
        {
          member_name:"Rachel Walter",
          imageurl:"../../assets/Google_logo.png",
          hours_spent: 5,
          minutes_spent: 12,
          
          task1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. ",
          task2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nunc eget leo urna."
        },
        {
          member_name:"Rachel Walter",
          imageurl:"../../assets/Google_logo.png",
          hours_spent: 5,
          minutes_spent: 12,
          
          task1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna.Pellentesque malesuada tincidunt nisi a pharetra. ",
          task2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          member_name:"Rachel Walter",
          imageurl:"../../assets/Google_logo.png",
          hours_spent: 5,
          minutes_spent: 12,
          
          task1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. ",
          task2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          member_name:"Rachel Walter",
          imageurl:"../../assets/Google_logo.png",
          hours_spent: 5,
          minutes_spent: 12,
          
          task1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget leo urna. ",
          task2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
        
      ];
    
 getMember1(): MemberTask[] {
    return this.MockMember1;
  } 
}