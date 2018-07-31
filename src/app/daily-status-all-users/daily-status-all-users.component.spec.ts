import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStatusAllUsersComponent } from './daily-status-all-users.component';

describe('DailyStatusAllUsersComponent', () => {
  let component: DailyStatusAllUsersComponent;
  let fixture: ComponentFixture<DailyStatusAllUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyStatusAllUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyStatusAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
