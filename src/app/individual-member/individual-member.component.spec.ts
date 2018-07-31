import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMemberComponent } from './individual-member.component';

describe('IndividualMemberComponent', () => {
  let component: IndividualMemberComponent;
  let fixture: ComponentFixture<IndividualMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
