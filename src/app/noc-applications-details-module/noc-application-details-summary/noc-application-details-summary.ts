import { Component, inject, OnInit, signal } from '@angular/core';
import { NocScreenData } from '../../models/noc-application-details-summary-model';
import { CommonModule } from '@angular/common';
import { NocApplicationDetails } from '../../services/noc-application-details';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';

@Component({
  selector: 'app-noc-application-details-summary',
  imports: [CommonModule],
  templateUrl: './noc-application-details-summary.html',
  styleUrl: './noc-application-details-summary.css',
})
export class NocApplicationDetailsSummary implements OnInit {


  nocApplicationDetails = inject(NocApplicationDetailsService)

  applicantSummary = signal<any[]>([])

  ngOnInit(): void {
    this.loadApplicantSummary();
  }

  application: NocScreenData = {
    title: 'Green Valley Apartments Phase-2',
    status: 'Under Scrutiny',
    applicationId: 'APP/2024/0235',
    submittedOn: '10/2/2024',

    project: [
      { label: 'Fresh Groundwater', daily: 168, annual: 61320 },
      { label: 'Saline Groundwater', daily: 0, annual: 0 },
      { label: 'Dewatering', daily: 0, annual: 0 }
    ],

    info: {
      name: 'Green Valley Apartments Phase-2',
      category: 'Residential Apartments',
      nocType: 'New',
      projectStatus: 'Under Construction',
      flats: 420,
      population: 1680
    },

    location: {
      district: 'Hyderabad',
      mandal: 'Serilingampally',
      village: 'Gandipet',
      survey: '456, 457, 458/1',
      assessment: 'Critical',
      watershed: 'HYD-MUSI-03'
    },

    extraction: [
      { type: 'Bore Well', specs: '250m depth • 200mm • 15HP Submersible', badge: 'Proposed' },
      { type: 'Bore Well', specs: '250m depth • 200mm • 15HP Submersible', badge: 'Proposed' }
    ],

    recharge: [
      { type: 'RTRWH', specs: 'Count: 8 • Capacity: 500m³ each', badge: 'Proposed' },
      { type: 'Recharge Shaft', specs: 'Count: 4 • Capacity: 200m³ each', badge: 'Proposed' }
    ],

    piezometers: '2 units – DWLR with telemetry • Monthly monitoring'
  };

  loadApplicantSummary() {

    const applicantId = "6e60aebc-ae10-4452-a599-e211ab54da2b"

    this.nocApplicationDetails.nocApplicantDetails(applicantId).subscribe({
      next: (res: any) => {
        console.log('applicantSummary response', res);
        this.applicantSummary.set([res.data])
        console.log('applicantSummary res:', this.applicantSummary());
      },
      error: (err) => {
        console.error('Failed to load applicant Data', err);
      }
    });
  }

  takeAction() {
    alert('action');
  }

}
