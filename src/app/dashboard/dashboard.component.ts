import { Component, OnInit } from '@angular/core';
import { Project } from "../model/project-model";
import { Member } from "../model/member-model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
