import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocDashboard } from './noc-dashboard';

describe('NocDashboard', () => {
  let component: NocDashboard;
  let fixture: ComponentFixture<NocDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
