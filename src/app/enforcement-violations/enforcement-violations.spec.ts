import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnforcementViolations } from './enforcement-violations';

describe('EnforcementViolations', () => {
  let component: EnforcementViolations;
  let fixture: ComponentFixture<EnforcementViolations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnforcementViolations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnforcementViolations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
