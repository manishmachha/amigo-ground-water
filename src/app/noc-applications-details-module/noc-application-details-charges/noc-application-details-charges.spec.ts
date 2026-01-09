import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsCharges } from './noc-application-details-charges';

describe('NocApplicationDetailsCharges', () => {
  let component: NocApplicationDetailsCharges;
  let fixture: ComponentFixture<NocApplicationDetailsCharges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsCharges]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsCharges);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
