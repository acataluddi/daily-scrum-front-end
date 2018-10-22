import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Feedback, FeedbackMember } from "../model/feedback-model";
import { GoalMember } from "../model/goalmember-model";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly baseUrl = environment.apiBase;
  private posturl = this.baseUrl + '/FeedbackController';
  private geturl = this.baseUrl + '/FeedbackController';
  feedback: Feedback;

  constructor(
    private http: HttpClient
  ) { }

  sendFeedback(userFeedback: Feedback): Observable<Feedback> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.post<Feedback>(this.posturl,
      JSON.stringify(userFeedback), { headers }
    );
  }

  getFeedbacks(userEmail: string): Observable<FeedbackMember> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    let listUrl = this.geturl+"?feedbackParam="+userEmail;
    return this.http.get<FeedbackMember>(listUrl, { headers })
  }

  getFeedBackStatusList(): Observable<GoalMember[]>{
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    let listUrl = this.geturl+"?feedbackParam=getStatusList";
    return this.http.get<GoalMember[]>(listUrl, { headers })
  }

  updateFeedbackStatus(userEmailToUpdate: string): Observable<GoalMember>{
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    let putUrl = this.geturl+"?updateEmail="+userEmailToUpdate;
    return this.http.put<any>(putUrl,null ,{ headers }
    );
  }
}
