import { TestBed } from '@angular/core/testing';

import { AccommodationRequestService } from './accommodation-request.service';

describe('AccomodationRequestService', () => {
  let service: AccommodationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
