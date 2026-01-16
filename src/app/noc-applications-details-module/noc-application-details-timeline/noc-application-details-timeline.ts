import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { ActivatedRoute } from '@angular/router';

export interface TimelineEvent {
  action?: string;
  role?: string
  name?: string;
  date?: string;
  timestamp?: string;
  toPhase?: 'SUBMITTED' | 'APPLICATION_DRAFT' | 'PAYMENT_PENDING' | 'ONBOARDING';
}

@Component({
  selector: 'app-noc-application-details-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noc-application-details-timeline.html',
  styleUrl: './noc-application-details-timeline.css',
})
export class NocApplicationDetailsTimeline implements OnInit {

  applicantTimeline = inject(NocApplicationDetailsService);

  timelineData = signal<TimelineEvent[]>([]);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    console.log('Clicked Application ID:', id);

    if (id) {
      this.loadTimeline(id);
    }
  }

  constructor() {
    this.loadSampleData();
  }

  loadSampleData() {
    const data: TimelineEvent[] = [

      {
        action: 'Application Submitted',
        role: 'Applicant',
        date: '2024-02-10',
        timestamp: '10:30 AM',
        toPhase: 'SUBMITTED',
      },
      // {
      //   title: 'Application Fee Payment Confirmed',
      //   by: 'System',
      //   date: '2024-02-10',
      //   time: '11:15 AM',
      //   state: 'system',
      // },
      // {
      //   title: 'Assigned to DGWO Officer',
      //   by: 'System',
      //   date: '2024-02-11',
      //   time: '09:00 AM',
      //   state: 'active',
      // },
      // {
      //   title: 'Document Scrutiny - Power NOC Requested',
      //   by: 'K. Ramesh (DGWO)',
      //   date: '2024-02-12',
      //   time: '02:30 PM',
      //   state: 'active',
      // },
      // {
      //   title: 'Field Investigation Scheduled',
      //   by: 'P. Srinivas (Hydrogeologist)',
      //   date: '2024-02-13',
      //   time: '04:45 PM',
      //   state: 'active',
      // },
      // {
      //   title: 'Pending: Hydrogeological Assessment',
      //   by: '',
      //   date: '',
      //   time: '',
      //   state: 'pending',
      // },
      // {
      //   title: 'Pending: Charge Calculation',
      //   by: '',
      //   date: '',
      //   time: '',
      //   state: 'pending',
      // },
      // {
      //   title: 'Pending: Approval Decision',
      //   by: '',
      //   date: '',
      //   time: '',
      //   state: 'pending',
      // },
    ]

    this.timelineData.set(data);
  }

  loadTimeline(id: string) {
    // const applicantId = '6e60aebc-ae10-4452-a599-e211ab54da2b';

    this.applicantTimeline.nocApplicationDetailsTimeline(id).subscribe({
      next: (res: any) => {

        const timeline: TimelineEvent[] = res.data.timeline.map(
          (item: any, index: number) => {

            const dateObj = new Date(item.timestamp);

            return {
              action: item.action,
              toPhase: item.toPhase,
              role: item.performedBy?.role,
              name: item.performedBy?.name,
              date: dateObj.toLocaleDateString(),
              timestamp: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
          }
        );

        this.timelineData.set(timeline);
      },
      error: (err: any) => {
        console.error('Failed to load timeline', err);
      },
    });
  }
}
