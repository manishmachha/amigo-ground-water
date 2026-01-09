import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictOfficer } from './district-officer';

describe('DistrictOfficer', () => {
  let component: DistrictOfficer;
  let fixture: ComponentFixture<DistrictOfficer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictOfficer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictOfficer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
