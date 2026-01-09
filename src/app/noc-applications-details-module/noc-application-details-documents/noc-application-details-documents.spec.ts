import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocApplicationDetailsDocuments } from './noc-application-details-documents';

describe('NocApplicationDetailsDocuments', () => {
  let component: NocApplicationDetailsDocuments;
  let fixture: ComponentFixture<NocApplicationDetailsDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NocApplicationDetailsDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NocApplicationDetailsDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
