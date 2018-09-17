import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Project } from '../model/project-model';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    newproject: Project;
    UserType: string;
    selected;

    private newListSource = new Subject<Project>();
    newList = this.newListSource.asObservable();

    constructor(private http: HttpClient) {
        this.UserType = localStorage.getItem("userType");
        console.log(this.UserType);
    }

    getallURL = "http://10.4.6.71:8080/DailyScrum/CRUDControllerUser?page=0";
    getURL = "http://10.4.6.71:8080/DailyScrum/ProjectController";

    getMembers(): Observable<any> {
        return this.http.get<any>(this.getallURL)
    }



    getProjects(): Observable<Project[]> {

        if (this.UserType == "Admin") {
            let params = new HttpParams().set('memberEmail', 'getall');
            return this.http.get<Project[]>(this.getURL, { params: params })
        } else {
            let params = new HttpParams().set('memberEmail', localStorage.getItem("email"));
            return this.http.get<Project[]>(this.getURL, { params: params })
        }
    }

    deleteProjects(project): Observable<any> {
        return this.http.delete<any>(this.getURL + "?projectId=" + project)
    }

    setSelected(projectList) {
        this.newListSource.next(projectList)
    }
}