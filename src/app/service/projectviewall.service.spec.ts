import { TestBed, inject } from '@angular/core/testing';
import { ProjectviewallService } from './projectviewall.service';
describe('ProjectviewallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectviewallService]
    });
  });

  it('should be created', inject([ProjectviewallService], (service: ProjectviewallService) => {
    expect(service).toBeTruthy();
  }));
});
