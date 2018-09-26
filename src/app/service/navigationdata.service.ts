import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { member } from '../model/project-model';


@Injectable(

)
export class NavigationdataService {

  taskemail = localStorage.getItem('taskEmail')
  taskName = localStorage.getItem('taskName')
  dummy: member = {email:this.taskemail, role:'', name:this.taskName, image:'', roleSelected: null, invalidMemberEmail: null, invalidRole: null} 
  private dataSource = new BehaviorSubject<member>(this.dummy);
  currentdata$ = this.dataSource.asObservable();

  constructor() { }

  changedata(data:member) {
    this.dataSource.next(data)
  }

}
