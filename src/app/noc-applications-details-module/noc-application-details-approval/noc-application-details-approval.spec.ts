import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsApproval } from './noc-application-details-approval';

describe('NocApplicationDetailsApproval', () => {
  let component: NocApplicationDetailsApproval;
  let fixture: ComponentFixture<NocApplicationDetailsApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
