import { TestBed } from '@angular/core/testing';

import { AisResourceService } from './ais-resource.service';

describe('AisResourceService', () => {
  let service: AisResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AisResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
