import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable(
//   {
//   providedIn: 'root'
// }
)
export class NavigationdataService {

  private dataSource = new BehaviorSubject<string>('default');
  currentdata$ = this.dataSource.asObservable();
  
  // public messages: string = "";

  constructor() { }

  changedata(data: string) {
    // this.messages = message;
    this.dataSource.next(data)
    // console.log(this.messages)
    // this.getmsg(this.messages)
  }
  // getmsg():string{
  //   console.log(this.messages)
  //   return this.messages;
  // }
}
