import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';
import { Http , Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {


 apiURL = 'http://localhost:8080/DailyScrum/CRUDControllerUser?page=1';
 

}

