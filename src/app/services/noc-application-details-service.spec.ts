import { TestBed } from '@angular/core/testing';

import { NocApplicationDetailsService } from './noc-application-details-service';

describe('NocApplicationDetailsService', () => {
  let service: NocApplicationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NocApplicationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
