import { Component, OnInit, Input } from '@angular/core';
import { Goal } from '../model/goal-model';

@Component({
  selector: 'app-individual-goal',
  templateUrl: './individual-goal.component.html',
  styleUrls: ['./individual-goal.component.css']
})
export class IndividualGoalComponent implements OnInit {

  @Input() goal:Goal;
  constructor() { }

  ngOnInit() {
  }

}
