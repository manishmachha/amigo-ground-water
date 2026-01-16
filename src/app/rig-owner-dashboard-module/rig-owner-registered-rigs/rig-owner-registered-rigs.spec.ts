import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigOwnerRegisteredRigs } from './rig-owner-registered-rigs';

describe('RigOwnerRegisteredRigs', () => {
  let component: RigOwnerRegisteredRigs;
  let fixture: ComponentFixture<RigOwnerRegisteredRigs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigOwnerRegisteredRigs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigOwnerRegisteredRigs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
