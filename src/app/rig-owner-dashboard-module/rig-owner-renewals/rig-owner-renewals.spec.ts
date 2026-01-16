import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigOwnerRenewals } from './rig-owner-renewals';

describe('RigOwnerRenewals', () => {
  let component: RigOwnerRenewals;
  let fixture: ComponentFixture<RigOwnerRenewals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigOwnerRenewals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigOwnerRenewals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
