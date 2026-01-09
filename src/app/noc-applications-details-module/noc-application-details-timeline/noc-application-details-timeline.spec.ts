import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsTimeline } from './noc-application-details-timeline';

describe('NocApplicationDetailsTimeline', () => {
  let component: NocApplicationDetailsTimeline;
  let fixture: ComponentFixture<NocApplicationDetailsTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsTimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
