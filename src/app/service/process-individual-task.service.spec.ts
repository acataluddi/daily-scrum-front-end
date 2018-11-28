import { TestBed, inject } from '@angular/core/testing';

import { ProcessIndividualTaskService } from './process-individual-task.service';

describe('ProcessIndividualTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessIndividualTaskService]
    });
  });

  it('should be created', inject([ProcessIndividualTaskService], (service: ProcessIndividualTaskService) => {
    expect(service).toBeTruthy();
  }));
});
