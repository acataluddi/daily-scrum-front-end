import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  MockMember: Member[] = [
    { name: "Mila Kunis", email: "mila@kunis.com", imageurl:'', employeeID: "", userType: "Admin" },
    { name: "Robert Jancer", email: "rob@gos.com", imageurl:'', employeeID: "", userType: "Manager" },
    { name: "Miley Kapoor", email: "miley@kp.com", imageurl:'', employeeID: "", userType: "Admin" },
    { name: "Reny Gosling", email: "reny@gos.com", imageurl:'', employeeID: "", userType: "Manager" },
    { name: "Minnu Kunis", email: "minnu@kunis.com", imageurl:'', employeeID: "", userType: "Admin" },
    { name: "Rockart Gosling", email: "rockt@gos.com", imageurl:'', employeeID: "", userType: "Manager" },
    { name: "Manu Kunis", email: "manu@kunis.com", imageurl:'', employeeID: "", userType: "Admin" },
    { name: "Renu Gosling", email: "renu@gos.com", imageurl:'', employeeID: "", userType: "Manager" },
    { name: "Ryan Gosling", email: "ryan@gos.com", imageurl:'', employeeID: "", userType: "User" },
    { name: "Milly Kunis", email: "milly@kunis.com", imageurl:'', employeeID: "", userType: "Admin" },
    { name: "Robin Jancer", email: "robin@gos.com", imageurl:'', employeeID: "", userType: "Manager" },
    { name: "Mindy Kapoor", email: "mindy@kp.com", imageurl:'', employeeID: "", userType: "Admin" },
    { name: "Renner Gosling", email: "renner@gos.com", imageurl:'', employeeID: "", userType: "Manager" },
    { name: "Minny Kunis", email: "minny@kunis.com", imageurl:'', employeeID: "", userType: "Admin" },
    { name: "Rocky Gosling", email: "rocky@gos.com", imageurl:'', employeeID: "", userType: "Manager" }
  ];
  constructor() { }

  getMember(): Member[] {
    return this.MockMember;
  }
}

