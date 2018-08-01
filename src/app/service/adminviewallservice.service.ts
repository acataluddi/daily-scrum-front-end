import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  MockMember: Member[] = [
    {Name: "Mila Kunis", Email: "mila@kunis.com", Password: "mila@123", EmployeeId: "123" , Role: "Admin"},
    {Name: "Ryan Gosling", Email: "ryan@gos.com", Password: "ryan@123", EmployeeId: "54654", Role: "Manager"},
    {Name: "Ryan Gosling", Email: "ryan@gos.com", Password: "ryan@123", EmployeeId: "54654", Role: "User"}
  ];
  constructor() { }

  getMember(): Member[]{
    console.log("inside getmem");

    return this.MockMember;
    }
}
