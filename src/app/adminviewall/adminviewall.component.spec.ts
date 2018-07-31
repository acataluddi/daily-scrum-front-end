import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewallComponent } from './adminviewall.component';

describe('AdminviewallComponent', () => {
  let component: AdminviewallComponent;
  let fixture: ComponentFixture<AdminviewallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminviewallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
