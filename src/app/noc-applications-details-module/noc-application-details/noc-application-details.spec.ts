import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetails } from './noc-application-details';

describe('NocApplicationDetails', () => {
  let component: NocApplicationDetails;
  let fixture: ComponentFixture<NocApplicationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
