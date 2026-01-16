import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RigOwnerVoilation } from './rig-owner-voilation';

describe('RigOwnerVoilation', () => {
  let component: RigOwnerVoilation;
  let fixture: ComponentFixture<RigOwnerVoilation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RigOwnerVoilation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RigOwnerVoilation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
