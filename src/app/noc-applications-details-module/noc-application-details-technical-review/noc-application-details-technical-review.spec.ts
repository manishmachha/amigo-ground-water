import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsTechnicalReview } from './noc-application-details-technical-review';

describe('NocApplicationDetailsTechnicalReview', () => {
  let component: NocApplicationDetailsTechnicalReview;
  let fixture: ComponentFixture<NocApplicationDetailsTechnicalReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsTechnicalReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsTechnicalReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
