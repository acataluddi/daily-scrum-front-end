import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  MockMember: Member[] = [
    { Name: "Mila Kunis", Email: "mila@kunis.com", Password: "mila@123", EmployeeId: "", UserType: "Admin" },
    { Name: "Robert Jancer", Email: "rob@gos.com", Password: "rob@123", EmployeeId: "", UserType: "Manager" },
    { Name: "Miley Kapoor", Email: "miley@kp.com", Password: "miley@123", EmployeeId: "", UserType: "Admin" },
    { Name: "Reny Gosling", Email: "reny@gos.com", Password: "reny@123", EmployeeId: "", UserType: "Manager" },
    { Name: "Minnu Kunis", Email: "minnu@kunis.com", Password: "minnu@123", EmployeeId: "", UserType: "Admin" },
    { Name: "Rockart Gosling", Email: "rockt@gos.com", Password: "rocky@123", EmployeeId: "", UserType: "Manager" },
    { Name: "Manu Kunis", Email: "manu@kunis.com", Password: "manu@123", EmployeeId: "", UserType: "Admin" },
    { Name: "Renu Gosling", Email: "renu@gos.com", Password: "renu@123", EmployeeId: "", UserType: "Manager" },
    { Name: "Ryan Gosling", Email: "ryan@gos.com", Password: "ryan@123", EmployeeId: "", UserType: "User" }
  ];
  constructor() { }

  getMember(): Member[] {
    return this.MockMember;
  }
}

