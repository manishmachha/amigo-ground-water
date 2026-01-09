import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsFieldInvestigation } from './noc-application-details-field-investigation';

describe('NocApplicationDetailsFieldInvestigation', () => {
  let component: NocApplicationDetailsFieldInvestigation;
  let fixture: ComponentFixture<NocApplicationDetailsFieldInvestigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsFieldInvestigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsFieldInvestigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
