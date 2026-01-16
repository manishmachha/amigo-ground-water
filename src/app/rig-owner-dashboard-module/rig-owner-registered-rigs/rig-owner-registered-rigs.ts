import { Component, inject, signal } from '@angular/core';
import { RigOwnerDashboardService } from '../../services/rig-owner-dashboard-service';
import { CommonModule } from '@angular/common';

export type RigStatus = 'ACTIVE' | 'UNDER_MAINTENANCE';

export interface Rig {
  id?: string;
  registrationNumber: string;
  rigType: string;
  capacity: string; // in meters
  district: string;
  lastMovement?: string; // YYYY-MM-DD
  status: RigStatus;
}


@Component({
  selector: 'app-rig-owner-registered-rigs',
  imports: [CommonModule],
  templateUrl: './rig-owner-registered-rigs.html',
  styleUrl: './rig-owner-registered-rigs.css',
})
export class RigOwnerRegisteredRigs {

    documents = signal<Rig[]>([]);

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

}
