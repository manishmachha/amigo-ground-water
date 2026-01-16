import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigOwnerDashboard } from './rig-owner-dashboard';

describe('RigOwnerDashboard', () => {
  let component: RigOwnerDashboard;
  let fixture: ComponentFixture<RigOwnerDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigOwnerDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigOwnerDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
