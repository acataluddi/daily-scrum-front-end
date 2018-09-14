import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
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

    getallURL = "http://10.4.6.58:8081/DailyScrum/CRUDControllerUser?page=0";
    getURL = "http://10.4.6.58:8081/DailyScrum/ProjectController";

    getMembers(): Observable<any> {
        return this.http.get<any>(this.getallURL)
      }
   
    
    getProjects(): Observable<Project[]> {
        // console.log(localStorage.getItem("token"));

        // let params = new HttpParams().set('memberEmail', 'getall');
        const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
        return this.http.get<Project[]>(this.getURL,{headers})

    //     if (this.UserType =="Admin"){

    //     return this.http.get<Project[]>(this.getURL,{params:params},{})

    //     }else{

    //         let params = new HttpParams().set('memberEmail', localStorage.getItem("email"));
    //         return this.http.get<Project[]>(this.getURL,{params:params})      
    //     }
      }
      deleteProjects(project):Observable<any> {
         
          return this.http.delete<any>(this.getURL +"?projectId="+ project)
       
      }     
  
      

}