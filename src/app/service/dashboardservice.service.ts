import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from "@angular/common/http";
import { newProject } from '../model/project-model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    newproject:newProject;
    UserType:string;

    constructor(private http: HttpClient ) { 

        this.UserType =localStorage.getItem("userType");
        console.log(this.UserType);
        
    }

    getallURL = "http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=0";
    getURL = "http://10.4.6.58:8081/DailyScrum/ProjectController";

    getMembers(): Observable<any> {
        return this.http.get<any>(this.getallURL)
      }
    
    getProjects(): Observable<newProject[]> {

        if (this.UserType =="Admin"){

        let params = new HttpParams().set('memberEmail', 'getall');
        return this.http.get<newProject[]>(this.getURL,{params:params})

        }else{

            let params = new HttpParams().set('memberEmail', localStorage.getItem("email"));
            return this.http.get<newProject[]>(this.getURL,{params:params})
            
        }

        
      }

      deleteProjects(project):Observable<any> {
         
          return this.http.delete<any>(this.getURL +"?projectId="+ project)
       
      }     
  
      

}