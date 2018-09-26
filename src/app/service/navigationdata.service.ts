import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { member } from '../model/project-model';


@Injectable(

)
export class NavigationdataService {

  email = localStorage.getItem('email')
  dummy: member = {email:this.email, role:'', name:'', image:'', roleSelected: null, invalidMemberEmail: null, invalidRole: null} 
  private dataSource = new BehaviorSubject<member>(this.dummy);
  currentdata$ = this.dataSource.asObservable();

  constructor() { }

  changedata(data:member) {
    this.dataSource.next(data)
  }

}
