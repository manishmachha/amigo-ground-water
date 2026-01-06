import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitGreviance } from './submit-greviance';

describe('SubmitGreviance', () => {
  let component: SubmitGreviance;
  let fixture: ComponentFixture<SubmitGreviance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitGreviance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitGreviance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
