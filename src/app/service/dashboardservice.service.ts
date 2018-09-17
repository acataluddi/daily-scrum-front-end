import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from "@angular/common/http";
import { Project } from '../model/project-model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    private readonly baseUrl = environment.apiBase;

    newproject: Project;
    UserType: string;
    selected;

    private newListSource = new Subject<Project>();
    newList = this.newListSource.asObservable();

    constructor(private http: HttpClient) {
        this.UserType = localStorage.getItem("userType");
        console.log(this.UserType);
        
        
    }

    private getallURL = this.baseUrl + '/CRUDControllerUser?page=0';
    private getURL = this.baseUrl + '/ProjectController';


    getMembers(): Observable<any> {
        return this.http.get<any>(this.getallURL,{headers})
      }
   
    
    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.getURL,{headers})

    
      }
      deleteProjects(project):Observable<any> {
         
          return this.http.delete<any>(this.getURL +"?projectId="+ project,{headers})
       
      }     
  
      

    setSelected(projectList) {
        this.newListSource.next(projectList)
    }
}