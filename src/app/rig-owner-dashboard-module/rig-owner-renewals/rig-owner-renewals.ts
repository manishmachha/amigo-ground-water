import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RigOwnerDashboardService } from '../../services/rig-owner-dashboard-service';
import { Rig } from '../rig-owner-registered-rigs/rig-owner-registered-rigs';

export interface Renewal {
  registrationNumber: string;
  rigType: string;
  registrationExpiryDate: string | null;
}


@Component({
  selector: 'app-rig-owner-renewals',
  imports: [CommonModule],
  templateUrl: './rig-owner-renewals.html',
  styleUrl: './rig-owner-renewals.css',
})
export class RigOwnerRenewals {
  expiryWindowDays = signal(95); // change to 95 when needed

  // renewals: Renewal[] = [
  //   {
  //     registrationNumber: 'RIG-001-TS-2024',
  //     rigType: 'District Permission - Hyderabad',
  //     expiryDate: '2024-12-31',
  //     daysRemaining: 30
  //   },
  //   {
  //     registrationNumber: 'RIG-003-TS-2024',
  //     rigType: 'Registration Renewal',
  //     expiryDate: '2025-01-15',
  //     daysRemaining: 45
  //   }
  // ];

  // renewNow(renewal: Renewal) {
  //   console.log('Renew clicked:', renewal);
  // }

  documents = signal<Renewal[]>([]);

  rigOwnerService = inject(RigOwnerDashboardService);

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments() {
    this.rigOwnerService.getAllRigDocuments().subscribe({
      next: (res: any) => {
        console.log('API response:', res);

        // optional signal (if you need elsewhere)
        this.documents.set(res.data);
        console.log('doc response', this.documents())
      },
      error: (err) => {
        console.error('Failed to load applications', err);
      }
    });
  }

documentsExpiringSoon = computed(() => {
  const limit = this.expiryWindowDays();
  const today = new Date();

  return this.documents().filter(item => {
    if (!item.registrationExpiryDate) return false;

    const diffDays =
      (new Date(item.registrationExpiryDate).getTime() - today.getTime())
      / (1000 * 60 * 60 * 24);
    console.log(item.registrationNumber, diffDays);
    return diffDays >= 0 && diffDays <= limit;
  });
});

hasUpcomingRenewals = computed(() => {
  return this.documentsExpiringSoon().length > 0;
});

getDaysRemaining(expiry: string): number {
  const today = new Date().setHours(0, 0, 0, 0);
  const expiryDate = new Date(expiry).setHours(0, 0, 0, 0);
  return Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
}

getTotalExpiryDays(expiry: string | null): number | null {
  if (!expiry) return null;

  const today = new Date().setHours(0, 0, 0, 0);
  const expiryDate = new Date(expiry).setHours(0, 0, 0, 0);

  return Math.ceil(
    (expiryDate - today) / (1000 * 60 * 60 * 24)
  );
}


}
