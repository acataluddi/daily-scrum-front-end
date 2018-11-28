import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalUserlistComponent } from './goal-userlist.component';

describe('GoalUserlistComponent', () => {
  let component: GoalUserlistComponent;
  let fixture: ComponentFixture<GoalUserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalUserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
