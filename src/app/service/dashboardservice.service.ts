import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
import { Project } from '../model/project-model';
import { Observable } from 'rxjs';

const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
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

    getallURL = "http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=0";
    getURL = "http://10.4.6.58:8081/DailyScrum/ProjectController";

    getMembers(): Observable<any> {
        return this.http.get<any>(this.getallURL,{headers})
      }
   
    
    getProjects(): Observable<Project[]> {
      
        // const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
        return this.http.get<Project[]>(this.getURL,{headers})

    
      }
      deleteProjects(project):Observable<any> {
         
          return this.http.delete<any>(this.getURL +"?projectId="+ project,{headers})
       
      }     
  
      

}