import { TestBed, inject } from '@angular/core/testing';

import { AdminviewallserviceService } from './adminviewallservice.service';

describe('AdminviewallserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminviewallserviceService]
    });
  });

  it('should be created', inject([AdminviewallserviceService], (service: AdminviewallserviceService) => {
    expect(service).toBeTruthy();
  }));
});
