import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpParams} from "@angular/common/http";
import { newProject } from '../model/project-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    newproject:newProject;
    UserType:string;

    constructor(private http: HttpClient) { 

        this.UserType =localStorage.getItem("userType");
        console.log(this.UserType);
    }

    getURL = "http://localhost:8080/DailyScrum/ProjectController";
    
    getProjects(): Observable<newProject[]> {

        if (this.UserType =="Admin"){

        let params = new HttpParams().set('usertype', 'Admin');
        return this.http.get<newProject[]>(this.getURL,{params:params})

        }else{

            let params = new HttpParams().set('usertype', 'getAll');
            return this.http.get<newProject[]>(this.getURL,{params:params})
            
        }

        
      }

}