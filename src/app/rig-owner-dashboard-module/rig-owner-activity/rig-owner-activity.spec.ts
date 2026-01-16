import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigOwnerActivity } from './rig-owner-activity';

describe('RigOwnerActivity', () => {
  let component: RigOwnerActivity;
  let fixture: ComponentFixture<RigOwnerActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigOwnerActivity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigOwnerActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
