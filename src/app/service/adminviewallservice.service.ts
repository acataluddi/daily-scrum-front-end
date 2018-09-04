import { Injectable } from '@angular/core';
import { Member } from '../model/member-model';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminviewallserviceService {


  apiURL = 'http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=1';


}

