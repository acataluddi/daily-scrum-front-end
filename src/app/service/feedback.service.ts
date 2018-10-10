import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Feedback } from "../model/feedback-model";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  p = 1;

  private readonly baseUrl = environment.apiBase;
  private posturl = this.baseUrl + '/FeedbackController';
  private geturl = this.baseUrl + '/FeedbackController?page=' + this.p;
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

  getFeedbacks(): Observable<Feedback[]> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.get<Feedback[]>(this.geturl, { headers })
  }
}
