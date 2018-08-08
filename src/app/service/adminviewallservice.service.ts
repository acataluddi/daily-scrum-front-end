import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  MockMember: Member[] = [
    { name: "Mila Kunis", email: "mila@kunis.com", memberID: "", userType: "Admin" },
    { name: "Robert Jancer", email: "rob@gos.com", memberID: "", userType: "Manager" },
    { name: "Miley Kapoor", email: "miley@kp.com", memberID: "", userType: "Admin" },
    { name: "Reny Gosling", email: "reny@gos.com", memberID: "", userType: "Manager" },
    { name: "Minnu Kunis", email: "minnu@kunis.com", memberID: "", userType: "Admin" },
    { name: "Rockart Gosling", email: "rockt@gos.com", memberID: "", userType: "Manager" },
    { name: "Manu Kunis", email: "manu@kunis.com", memberID: "", userType: "Admin" },
    { name: "Renu Gosling", email: "renu@gos.com", memberID: "", userType: "Manager" },
    { name: "Ryan Gosling", email: "ryan@gos.com", memberID: "", userType: "User" },
    { name: "Milly Kunis", email: "milly@kunis.com", memberID: "", userType: "Admin" },
    { name: "Robin Jancer", email: "robin@gos.com", memberID: "", userType: "Manager" },
    { name: "Mindy Kapoor", email: "mindy@kp.com", memberID: "", userType: "Admin" },
    { name: "Renner Gosling", email: "renner@gos.com", memberID: "", userType: "Manager" },
    { name: "Minny Kunis", email: "minny@kunis.com", memberID: "", userType: "Admin" },
    { name: "Rocky Gosling", email: "rocky@gos.com", memberID: "", userType: "Manager" }

  ];
  constructor() { }

  getMember(): Member[] {
    return this.MockMember;
  }
}

