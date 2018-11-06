import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Goal, GoalMember, Comment } from "../model/goal-model";
import { NavBarMember } from "../model/nav-bar-member";
import { Member } from "../model/member-model";

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private readonly baseUrl = environment.apiBase;
  private goalsApiUrl = this.baseUrl + '/GoalController';

  constructor(
    private http: HttpClient
  ) { }

  addGoal(goal: Goal): Observable<Goal>{
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.post<Goal>(this.goalsApiUrl,
      JSON.stringify(goal), { headers }
    );
  }

  addComment(comment: Comment): Observable<Comment>{
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    return this.http.put<any>(this.goalsApiUrl,
      JSON.stringify(comment), { headers }
    );
  }

  getNavigationBarList(goalParam: string): Observable<NavBarMember[]> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    let params = new HttpParams()
      .set("goalParam", goalParam)
    return this.http.get<NavBarMember[]>(this.goalsApiUrl, { headers })
  }

  getMembersUnderManager(goalParam: string): Observable<Member[]> {
    const headers = new HttpHeaders().set("token", localStorage.getItem("token"));
    let params = new HttpParams()
      .set("goalParam", goalParam)
    return this.http.get<Member[]>(this.goalsApiUrl+'?goalParam='+goalParam,  { headers })
  }
}
