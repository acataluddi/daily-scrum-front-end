import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPageAdminComponent } from './task-page-admin.component';

describe('TaskPageAdminComponent', () => {
  let component: TaskPageAdminComponent;
  let fixture: ComponentFixture<TaskPageAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPageAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
