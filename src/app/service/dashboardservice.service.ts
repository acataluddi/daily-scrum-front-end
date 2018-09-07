import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from "@angular/common/http";
import { Project } from '../model/project-model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    newproject:Project;
    UserType:string;

    constructor(private http: HttpClient ) { 

        this.UserType =localStorage.getItem("userType");
        console.log(this.UserType);
        
    }

    getURL = "http://10.4.6.58:8081/DailyScrum/ProjectController";
    
    getProjects(): Observable<Project[]> {

        if (this.UserType =="Admin"){

            let params = new HttpParams().set('memberEmail', 'getall');
            return this.http.get<Project[]>(this.getURL,{params:params})

        }else{

            let params = new HttpParams().set('memberEmail', localStorage.getItem("email"));
            return this.http.get<Project[]>(this.getURL,{params:params})
            
        }

        
      }

      deleteProjects(project):Observable<any> {
         
          return this.http.delete<any>(this.getURL +"?projectId="+ project)
       
      }     
  
      

}