import { TestBed, inject } from '@angular/core/testing';

import { TaskPageService } from './task-page.service';

describe('TaskPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskPageService]
    });
  });

  it('should be created', inject([TaskPageService], (service: TaskPageService) => {
    expect(service).toBeTruthy();
  }));
});
