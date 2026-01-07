import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { signal } from '@angular/core';

export interface TimelineEvent {
  title: string;
  by: string;
  date: string;
  time: string;
  state: 'completed' | 'system' | 'pending' | 'active';
}

export interface TimelineSection {
  applicationId: string;
  events: TimelineEvent[];
}

@Component({
  selector: 'app-noc-application-details-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noc-application-details-timeline.html',
  styleUrl: './noc-application-details-timeline.css',
})
export class NocApplicationDetailsTimeline {

  sections = signal<TimelineSection[]>([]);

  constructor() {
    this.loadSampleData();
  }

  loadSampleData() {
    const data: TimelineSection[] = [
      {
        applicationId: 'APP-001',
        events: [
          {
            title: 'Application Submitted',
            by: 'Applicant',
            date: '2024-02-10',
            time: '10:30 AM',
            state: 'completed',
          },
          {
            title: 'Application Fee Payment Confirmed',
            by: 'System',
            date: '2024-02-10',
            time: '11:15 AM',
            state: 'system',
          },
          {
            title: 'Assigned to DGWO Officer',
            by: 'System',
            date: '2024-02-11',
            time: '09:00 AM',
            state: 'active',
          },
          {
            title: 'Document Scrutiny - Power NOC Requested',
            by: 'K. Ramesh (DGWO)',
            date: '2024-02-12',
            time: '02:30 PM',
            state: 'active',
          },
          {
            title: 'Field Investigation Scheduled',
            by: 'P. Srinivas (Hydrogeologist)',
            date: '2024-02-13',
            time: '04:45 PM',
            state: 'active',
          },
          {
            title: 'Pending: Hydrogeological Assessment',
            by: '',
            date: '',
            time: '',
            state: 'pending',
          },
          {
            title: 'Pending: Charge Calculation',
            by: '',
            date: '',
            time: '',
            state: 'pending',
          },
          {
            title: 'Pending: Approval Decision',
            by: '',
            date: '',
            time: '',
            state: 'pending',
          },
        ],
      },
    ];

    this.sections.set(data);
  }

  integrateFromApi(apiData: TimelineSection[]) {
    this.sections.set(apiData);
  }
}
