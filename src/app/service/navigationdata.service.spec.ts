import { TestBed, inject } from '@angular/core/testing';

import { NavigationdataService } from './navigationdata.service';

describe('NavigationdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationdataService]
    });
  });

  it('should be created', inject([NavigationdataService], (service: NavigationdataService) => {
    expect(service).toBeTruthy();
  }));
});
