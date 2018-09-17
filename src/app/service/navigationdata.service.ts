import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable(

)
export class NavigationdataService {

  email = localStorage.getItem('email')
  private dataSource = new BehaviorSubject<string>(this.email);
  currentdata$ = this.dataSource.asObservable();


  constructor() { }

  changedata(data: string) {
    this.dataSource.next(data)
  }

}
