import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplications } from './noc-applications';

describe('NocApplications', () => {
  let component: NocApplications;
  let fixture: ComponentFixture<NocApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
