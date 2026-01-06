import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViolation } from './report-violation';

describe('ReportViolation', () => {
  let component: ReportViolation;
  let fixture: ComponentFixture<ReportViolation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportViolation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportViolation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
