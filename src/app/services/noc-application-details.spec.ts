import { TestBed } from '@angular/core/testing';

import { NocApplicationDetails } from './noc-application-details';

describe('NocApplicationDetails', () => {
  let service: NocApplicationDetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NocApplicationDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
