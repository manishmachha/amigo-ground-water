import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellAssets } from './well-assets';

describe('WellAssets', () => {
  let component: WellAssets;
  let fixture: ComponentFixture<WellAssets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellAssets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellAssets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
