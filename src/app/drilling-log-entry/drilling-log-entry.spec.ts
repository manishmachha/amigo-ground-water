import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillingLogEntry } from './drilling-log-entry';

describe('DrillingLogEntry', () => {
  let component: DrillingLogEntry;
  let fixture: ComponentFixture<DrillingLogEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrillingLogEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrillingLogEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
