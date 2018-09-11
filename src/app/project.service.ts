import { Injectable } from '@angular/core';
import { Project } from '../app/model/project-model';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  projects: Project[] = [
    {projectId: '', projectDesc:'', projectName: 'Daily Scrum', members:[] },
    {projectId: '', projectDesc:'', projectName: 'Adastria Project I - Studio Application', members:[] },
    {projectId: '', projectDesc:'', projectName: 'Adastria Project III - Maintanence', members:[] },
    {projectId: '', projectDesc:'', projectName: 'FR Project LXI - Core Order Microservices ', members:[] },
    {projectId: '', projectDesc:'', projectName: 'FR Project LXX - EU Design Phase II', members:[] },
    {projectId: '', projectDesc:'', projectName: 'Leecare QA T&M', members:[] },
    {projectId: '', projectDesc:'', projectName: 'EverFi - T&M ', members:[] },
    {projectId: '', projectDesc:'', projectName: 'Adastria Project V - Static Webpages', members:[] },
    {projectId: '', projectDesc:'', projectName: 'Adastria Project VI- URL Shortner ', members:[] },
    {projectId: '', projectDesc:'', projectName: 'SRAM - Messaging Application', members:[] },
    {projectId: '', projectDesc:'', projectName: 'SuccessFlow Salesforce Customization', members:[] },
    {projectId: '', projectDesc:'', projectName: 'Hospitals app', members:[] },
    ];

  private geturl = 'http://10.4.6.71:8080/DailyScrum/ProjectController';


  getProjects(memberEmail): Observable<Project[]> {
    let params = new HttpParams()
      .set("memberEmail", memberEmail)
    return this.http.get<Project[]>(this.geturl,{params:params})
  }

  

}
