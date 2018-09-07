import { Injectable } from '@angular/core';
// import { Response } from '@angular/http';
import { HttpClient, HttpParams} from "@angular/common/http";
import { newProject } from '../model/project-model';
// import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    headers: Headers;
    options: RequestOptions;

   

    newproject:newProject;
    UserType:string;

    constructor(private http: HttpClient, private https: HttpClient ) { 

        this.UserType =localStorage.getItem("userType");
        console.log(this.UserType);
        
    }

    getURL = "http://10.4.6.22:8080/DailyScrum/ProjectController";
    
    getProjects(): Observable<newProject[]> {

        if (this.UserType =="Admin"){

        let params = new HttpParams().set('userEmail', localStorage.getItem("email"));
        return this.http.get<newProject[]>(this.getURL,{params:params})

        }else{

            let params = new HttpParams().set('userEmail', 'getAll');
            return this.http.get<newProject[]>(this.getURL,{params:params})
            
        }

        
      }

      deleteProjects(project):Observable<any> {
          console.log(project);
          console.log(this.getURL +"?projectId="+ project);
          return this.http.delete<any>(this.getURL +"?projectId="+ project)
        //   .map(this.extractData)
      }     
  
      private extractData(res: Response) {
          let body = res.json();
          return body || {};
      }
      

}