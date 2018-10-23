import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualGoalComponent } from './individual-goal.component';

describe('IndividualGoalComponent', () => {
  let component: IndividualGoalComponent;
  let fixture: ComponentFixture<IndividualGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
