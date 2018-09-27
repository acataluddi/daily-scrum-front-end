import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { member } from '../model/project-model';
import { LoginService } from './login.service';


@Injectable(

)
export class NavigationdataService {
  demo: member;
  taskemail = localStorage.getItem('taskEmail')
  taskName = localStorage.getItem('taskName')
  addDate = localStorage.getItem('addDate')
  deleteDate = localStorage.getItem("deleteDate")
  isActive = localStorage.getItem("isActive")

  // email 
  userType = localStorage.getItem('userType')
  // dummy: member = {email:this.taskemail, role:'', name:this.taskName, image:'', roleSelected: null, invalidMemberEmail: null, invalidRole: null} 
  dummy: member = {email:this.taskemail, role:'', name:this.taskName, image:'',addedDate:this.addDate, deletedDate:this.deleteDate, isActive: false, roleSelected: null, invalidMemberEmail: null, invalidRole: null} 
  private dataSource = new BehaviorSubject<member>(this.dummy);
  currentdata$ = this.dataSource.asObservable();

  constructor(loginservice: LoginService) { }

  changedata(data:member) {
    // this.demo = data
    localStorage.setItem("taskEmail", data.email)
    localStorage.setItem("taskName", data.name)
    this.dataSource.next(data)
  }

  updateDummy(mem){
    this.dummy = mem
  }
}
