import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsApplicant } from './noc-application-details-applicant';

describe('NocApplicationDetailsApplicant', () => {
  let component: NocApplicationDetailsApplicant;
  let fixture: ComponentFixture<NocApplicationDetailsApplicant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsApplicant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsApplicant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
