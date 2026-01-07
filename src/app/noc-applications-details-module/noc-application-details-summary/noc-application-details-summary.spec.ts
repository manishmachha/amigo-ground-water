import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsSummary } from './noc-application-details-summary';

describe('NocApplicationDetailsSummary', () => {
  let component: NocApplicationDetailsSummary;
  let fixture: ComponentFixture<NocApplicationDetailsSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
