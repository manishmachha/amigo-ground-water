import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroundwaterRequirement, NocScreenData, RechargeData, Structure } from '../../models/noc-application-details-summary-model';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-noc-application-details-summary',
  imports: [CommonModule],
  templateUrl: './noc-application-details-summary.html',
  styleUrl: './noc-application-details-summary.css',
})
export class NocApplicationDetailsSummary implements OnInit {

  nocApplicationDetails = inject(NocApplicationDetailsService);

  applicantSummary = signal<NocScreenData[]>([]);
  route = inject(ActivatedRoute);

  groundwaterRequirement: GroundwaterRequirement[] = [
    {
      type: 'Fresh Groundwater'
      // freshWaterDaily: 168,
      // freshWaterAnnual: 61320
    },
    {
      type: 'Saline Groundwater',
      freshWaterDaily: 0,
      freshWaterAnnual: 0
    },
    {
      type: 'Dewatering',
      freshWaterDaily: 0,
      freshWaterAnnual: 0
    }
  ];

  // Extraction Structures
  extractionStructures: Structure[] = [
    {
      type: 'Bore Well',
      specs: '250m depth • 200mm • 15HP Submersible',
      badge: 'Proposed'
    },
    {
      type: 'Bore Well',
      specs: '250m depth • 200mm • 15HP Submersible',
      badge: 'Proposed'
    }
  ];

  // Recharge Structures + Piezometers
  rechargeData: RechargeData = {
    structures: [
      {
        type: 'RTRWH',
        specs: 'Count: 8 • Capacity: 500m³ each',
        badge: 'Proposed'
      },
      {
        type: 'Recharge Shaft',
        specs: 'Count: 4 • Capacity: 200m³ each',
        badge: 'Proposed'
      }
    ],
    piezometers: '2 units – DWLR with telemetry • Monthly monitoring'
  };

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    console.log('Clicked Application ID:', id);

    if (id) {
      this.loadApplicantSummary(id);
    }
  }

  loadApplicantSummary(id: string) {
    // const applicantId = '036d17d3-d0a5-4b30-91ad-60781fa000f7';

    this.nocApplicationDetails.nocApplicantionDetails(id).subscribe({
      next: (res: any) => {
        // console.log('applicantSummary response', res);
        this.applicantSummary.set([res.data]);
        console.log('applicantSummary res', this.applicantSummary());
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
