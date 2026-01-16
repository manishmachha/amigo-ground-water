import { Component, inject, OnInit, signal } from '@angular/core';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

export interface NocApplicant {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  fullName: string;
  mobileNumber: string;
  fatherName: string;
  gender: string;
  idProofType: string;
  idProofNumber: string;
  idProofFilePath: string;
  roleId: string;
  doorNumber: string;
  street: string;
  district: string;
  mandal: string;
  village: string;
  pinCode: string;
  termsAgreed: boolean;
  organisationName: string | null;
  GSTNumber: string | null;
  PANNumber: string | null;
}

@Component({
  selector: 'app-noc-application-details-applicant',
  templateUrl: './noc-application-details-applicant.html',
  styleUrl: './noc-application-details-applicant.css',
  standalone: true,
  imports: [CommonModule],
})
export class NocApplicationDetailsApplicant implements OnInit {
  route = inject(ActivatedRoute);
  nocService = inject(NocApplicationDetailsService);

  applicant = signal<NocApplicant | null>(null);

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.loadApplicantData(id);
    }
  }

  loadApplicantData(id: string) {
    this.nocService.nocApplicantionDetails(id).subscribe({
      next: (res: any) => {
        this.applicant.set(res.data.applicant);
      },
      error: (err) => {
        console.error('Failed To Load Application Data', err);
      },
    });
  }

  openDocument(url: string) {
    window.open(url, '_blank');
  }
}
