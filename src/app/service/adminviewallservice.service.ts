import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  MockMember: Member[] = [
    { name: "Mila Kunis", email: "mila@kunis.com",employeeID: "", userType: "Admin" },
    { name: "Robert Jancer", email: "rob@gos.com",employeeID: "", userType: "Manager" },
    { name: "Miley Kapoor", email: "miley@kp.com",employeeID: "", userType: "Admin" },
    { name: "Reny Gosling", email: "reny@gos.com",employeeID: "", userType: "Manager" },
    { name: "Minnu Kunis", email: "minnu@kunis.com",employeeID: "", userType: "Admin" },
    { name: "Rockart Gosling", email: "rockt@gos.com",employeeID: "", userType: "Manager" },
    { name: "Manu Kunis", email: "manu@kunis.com",employeeID: "", userType: "Admin" },
    { name: "Renu Gosling", email: "renu@gos.com",employeeID: "", userType: "Manager" },
    { name: "Ryan Gosling", email: "ryan@gos.com",employeeID: "", userType: "User" },
    { name: "Milly Kunis", email: "milly@kunis.com",employeeID: "", userType: "Admin" },
    { name: "Robin Jancer", email: "robin@gos.com",employeeID: "", userType: "Manager" },
    { name: "Mindy Kapoor", email: "mindy@kp.com",employeeID: "", userType: "Admin" },
    { name: "Renner Gosling", email: "renner@gos.com",employeeID: "", userType: "Manager" },
    { name: "Minny Kunis", email: "minny@kunis.com",employeeID: "", userType: "Admin" },
    { name: "Rocky Gosling", email: "rocky@gos.com",employeeID: "", userType: "Manager" }

  ];
  constructor() { }

  getMember(): Member[] {
    return this.MockMember;
  }
}

