import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { member } from '../model/project-model';

@Injectable(

)
export class NavigationdataService {

  taskemail = localStorage.getItem('taskEmail')
  taskName = localStorage.getItem('taskName')
  email = localStorage.getItem('email')
  addedDate = localStorage.getItem('addedDate')
  isActive = localStorage.getItem('isActive')
  isActivebool = JSON.parse(this.isActive)
  deletedDate = localStorage.getItem('deletedDate')
  dummy: member = { email: this.taskemail, role: '', name: this.taskName, image: '', addedDate: this.addedDate, deletedDate: this.deletedDate, isActive: this.isActivebool, roleSelected: null, invalidMemberEmail: null, invalidRole: null }
  private dataSource = new BehaviorSubject<member>(this.dummy);
  currentdata$ = this.dataSource.asObservable();

  constructor() { }

  changedata(data: member) {
    this.dataSource.next(data)
  }
}
