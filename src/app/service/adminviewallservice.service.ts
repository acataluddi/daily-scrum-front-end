import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {

  MockMember: Member[] = [
    { Name: "Mila Kunis", Email: "mila@kunis.com", Token:'', Imageurl:'', Id: "", UserType: "Admin" },
    { Name: "Robert Jancer", Email: "rob@gos.com", Token:'', Imageurl:'', Id: "", UserType: "Manager" },
    { Name: "Miley Kapoor", Email: "miley@kp.com", Token:'', Imageurl:'', Id: "", UserType: "Admin" },
    { Name: "Reny Gosling", Email: "reny@gos.com", Token:'', Imageurl:'', Id: "", UserType: "Manager" },
    { Name: "Minnu Kunis", Email: "minnu@kunis.com", Token:'', Imageurl:'', Id: "", UserType: "Admin" },
    { Name: "Rockart Gosling", Email: "rockt@gos.com", Token:'', Imageurl:'', Id: "", UserType: "Manager" },
    { Name: "Manu Kunis", Email: "manu@kunis.com", Token:'', Imageurl:'', Id: "", UserType: "Admin" },
    { Name: "Renu Gosling", Email: "renu@gos.com", Token:'', Imageurl:'', Id: "", UserType: "Manager" },
    { Name: "Ryan Gosling", Email: "ryan@gos.com", Token:'', Imageurl:'', Id: "", UserType: "User" },
    { Name: "Milly Kunis", Email: "milly@kunis.com", Token:'', Imageurl:'', Id: "", UserType: "Admin" },
    { Name: "Robin Jancer", Email: "robin@gos.com", Token:'', Imageurl:'', Id: "", UserType: "Manager" },
    { Name: "Mindy Kapoor", Email: "mindy@kp.com", Token:'', Imageurl:'', Id: "", UserType: "Admin" },
    { Name: "Renner Gosling", Email: "renner@gos.com", Token:'', Imageurl:'', Id: "", UserType: "Manager" },
    { Name: "Minny Kunis", Email: "minny@kunis.com", Token:'', Imageurl:'', Id: "", UserType: "Admin" },
    { Name: "Rocky Gosling", Email: "rocky@gos.com", Token:'', Imageurl:'', Id: "", UserType: "Manager" }
  ];
  constructor() { }

  getMember(): Member[] {
    return this.MockMember;
  }
}

