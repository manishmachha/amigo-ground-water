import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RigOwnerDashboardService } from '../../services/rig-owner-dashboard-service';

export interface DrillingLog {
  rigNumber: string;
  status: 'Pending Submission' | 'Submitted';
  well_location: string;
  drillingDate: string;
  well_depth: number;
}

@Component({
  selector: 'app-rig-owner-drilling-logs',
  imports: [CommonModule],
  templateUrl: './rig-owner-drilling-logs.html',
  styleUrl: './rig-owner-drilling-logs.css',
})
export class RigOwnerDrillingLogs {

  drillingLogsInfo = signal<any[]>([]);

  drillingLogInfo = inject(RigOwnerDashboardService);

  // drillingLogs: DrillingLog[] = [
  //   {
  //     rigId: 'RIG-001-TS-2024',
  //     status: 'Pending Submission',
  //     location: 'Shamshabad, Hyderabad',
  //     drilledDate: '2024-11-20',
  //     depth: 250
  //   },
  //   {
  //     rigId: 'RIG-002-TS-2024',
  //     status: 'Pending Submission',
  //     location: 'Mulugu, Warangal',
  //     drilledDate: '2024-11-18',
  //     depth: 320
  //   }
  // ];

  ngOnInit() {
    this.loadDrillingLogs();
  }
  loadDrillingLogs() {
    this.drillingLogInfo.drillingLogsInfo().subscribe({
      next: (res: any) => {
        console.log('API drilling log:', res);

        // optional signal (if you need elsewhere)
        this.drillingLogsInfo.set(res.data);
        console.log('Drilling Logs response', this.drillingLogsInfo())
      },
      error: (err) => {
        console.error('Failed to load applications', err);
      }
    });
  }

}
