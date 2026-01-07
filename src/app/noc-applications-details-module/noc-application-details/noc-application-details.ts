import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';

export interface NocApplication {

  id: string;
  projectName: string;
  projectCategory: string;
  applicantId: string;
  createdAt: string;

 
    name?: string;
    designation?: string;

    currentStage: string;
    status: string;

    category?: string;
    district: string;

    freshWaterDaily: string;
    freshWaterAnnual: string;


}

@Component({
  selector: 'app-noc-application-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './noc-application-details.html',
  styleUrl: './noc-application-details.css',
})
export class NocApplicationDetails implements OnInit {

  applicantData = signal<NocApplication[]>([]);

  nocApplicationDetails = inject(NocApplicationDetailsService);

  ngOnInit(): void {
    this.loadApplicantData();
  }

  application: NocApplication = {
    id: '1',
    projectName: 'Green Valley Apartments Phase-2',
    projectCategory: 'Under Scrutiny',
    applicantId: 'APP/2024/0235',
    createdAt: '10/2/2024',

      name: 'K. Ramesh',
      designation: 'DGWO',

      currentStage: 'Field Investigation',
      status: 'In Progress',

      category: 'Critical',
      district: 'Hyderabad',

      freshWaterDaily: '168 m³',
     freshWaterAnnual: '61.3K m³/year',

  };

  loadApplicantData() {

    const applicantId = "6e60aebc-ae10-4452-a599-e211ab54da2b"

    this.nocApplicationDetails.nocApplicantDetails(applicantId).subscribe({
      next: (res: any) => {
        console.log('applicant response', res);
        this.applicantData.set([res.data])
        console.log('applicant res:', this.applicantData());
      },
      error: (err) => {
        console.error('Failed to load applications', err);
      }
    });
  }

  takeAction() {
    alert('Take Action Clicked');
  }

}
