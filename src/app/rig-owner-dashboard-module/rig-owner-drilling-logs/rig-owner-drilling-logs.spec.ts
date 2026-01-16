import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigOwnerDrillingLogs } from './rig-owner-drilling-logs';

describe('RigOwnerDrillingLogs', () => {
  let component: RigOwnerDrillingLogs;
  let fixture: ComponentFixture<RigOwnerDrillingLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigOwnerDrillingLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigOwnerDrillingLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
