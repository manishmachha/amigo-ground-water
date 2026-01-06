import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellRegister } from './well-register';

describe('WellRegister', () => {
  let component: WellRegister;
  let fixture: ComponentFixture<WellRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
