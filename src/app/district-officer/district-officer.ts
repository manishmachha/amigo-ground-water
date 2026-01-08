import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuickCardModel, PendingTask, RecentActivity, DashboardMetric } from '../models/district-officer-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-district-officer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './district-officer.html',
  styleUrl: './district-officer.css',
})
export class DistrictOfficer implements OnInit {

  private router = inject(Router);

  quickCards: QuickCardModel[] = [];
  pendingTasks: PendingTask[] = [];
  recentActivities: RecentActivity[] = [];
  metrics: DashboardMetric[] = [];


  ngOnInit(): void {
    this.loadCardsModel();
    this.loadTasksModel();
    this.loadActivityModel();
    this.loadMetricsModel();
  }

  loadCardsModel(): void {
    this.quickCards = [
      {
        id: 'noc',
        title: 'NOC Management',
        subtitle: 'Applications, renewals, approvals',
        description: 'Manage end-to-end NOC lifecycle and district approvals.',
        icon: 'bi-file-earmark-text text-blue-600',
        footerText: '12 pending'
      },
      {
        id: 'wells',
        title: 'Wells & Assets',
        subtitle: 'Registry, monitoring, linking',
        description: 'Track wells, piezometers, quality sensors.',
        icon: 'bi-droplet text-cyan-600',
        footerText: '1243 total'
      },
      {
        id: 'monitor',
        title: 'Monitoring',
        subtitle: 'Flow meters, quality',
        description: 'District real-time telemetry alerts.',
        icon: 'bi-geo-alt text-green-600',
        footerText: '3 alerts'
      },
      {
        id: 'billing',
        title: 'Billing & Revenue',
        subtitle: 'Invoices, payments',
        description: 'Financial tracking for Hyderabad district.',
        icon: 'bi-currency-rupee text-amber-600',
        footerText: '₹12.4L due'
      },
      {
        id: 'enforce',
        title: 'Enforcement',
        subtitle: 'WALTA cases',
        description: 'Violations, penalties management.',
        icon: 'bi-exclamation-triangle text-red-600',
        footerText: '8 active'
      },
      {
        id: 'griev',
        title: 'Grievances',
        subtitle: 'Resolution, SLA',
        description: 'Citizen complaints tracking.',
        icon: 'bi-chat-left-text text-purple-600',
        footerText: '5 pending'
      },
      {
        id: 'rig',
        title: 'Rig Management',
        subtitle: 'Drilling logs',
        description: 'Registration and movement.',
        icon: 'bi-truck text-orange-600',
        footerText: '234 total'
      },
      {
        id: 'tanker',
        title: 'Tanker/Bulk Supply',
        subtitle: 'Trips, stations',
        description: 'Suppliers operations.',
        icon: 'bi-minecart-loaded text-teal-600',
        footerText: '89 suppliers'
      },
      {
        id: 'reports',
        title: 'Reports & Analytics',
        subtitle: 'Exports, insights',
        description: 'Custom district reports.',
        icon: 'bi-bar-chart text-blue-500',
        footerText: '12 scheduled'
      },
      {
        id: 'admin',
        title: 'Administration',
        subtitle: 'Users, roles',
        description: 'System settings.',
        icon: 'bi-gear text-gray-600',
        footerText: '98 active users',
        badge: '142 users'
      }
    ];
  }

  loadTasksModel(): void {
    const MODEL: PendingTask[] = [
      {
        id: 't1',
        title: 'Review NOC Application',
        refNo: 'NOC-2024-001256',
        timeLabel: 'Today, 5:00 PM',
        colorClass: 'bg-red-500',
        icon: 'bi-clock text-orange-800'
      },
      {
        id: 't2',
        title: 'Field Inspection Due',
        refNo: 'WELL-HYD-2345',
        timeLabel: 'Tomorrow',
        colorClass: 'bg-amber-500',
        icon: 'bi-geo-alt text-yellow-800'
      },
      {
        id: 't3',
        title: 'Approve Billing Adjustment',
        refNo: 'ADJ-2024-0089',
        timeLabel: 'In 2 days',
        colorClass: 'bg-green-500',
        icon: 'bi-receipt text-green-800'
      },
      {
        id: 't4',
        title: 'Respond to Grievance',
        refNo: 'GRV-2024-0240',
        timeLabel: 'Today, 6:00 PM',
        colorClass: 'bg-red-400',
        icon: 'bi-chat-left-text text-red-800'
      }
    ];

    this.pendingTasks = MODEL;
  }

  loadActivityModel(): void {
    const MODEL: RecentActivity[] = [
      {
        id: 'a1',
        title: 'NOC Application Approved',
        refNo: 'NOC-2024-001234',
        badge: 'success',
        time: '10 mins ago',
        icon: ''
      },
      {
        id: 'a2',
        title: 'Flow Meter Alert',
        refNo: 'FM-HYD-0089',
        badge: 'warning',
        time: '25 mins ago',
        icon: ''
      },
      {
        id: 'a3',
        title: 'Payment Received',
        refNo: 'INV-2024-5678',
        badge: 'success',
        time: '1 hour ago',
        icon: ''
      },
      {
        id: 'a3',
        title: 'Grievance Assigned',
        refNo: 'GRV-2024-0234',
        badge: 'success',
        time: '1 hour ago',
        icon: ''
      },
      {
        id: 'a3',
        title: 'Inspection Completed',
        refNo: 'INSP-2024-0145',
        badge: 'success',
        time: '1 hour ago',
        icon: ''
      },

    ];

    this.recentActivities = MODEL;
  }
  loadMetricsModel(): void {
    const MODEL: DashboardMetric[] = [
      {
        id: 'm1',
        label: 'Active NOCs',
        value: 847,
        trendText: '+12 this month',
        icon: 'bi-file-earmark-text',
        statusText: 'Above target',
        textClass: 'text-green-600'
      },
      {
        id: 'm2',
        label: 'Collection Rate',
        value: '87.9%',
        trendText: '+2.1% from target',
        icon: 'bi-currency-rupee',
        statusText: 'from target',
        textClass: 'text-green-500'
      },
      {
        id: 'm3',
        label: 'Open Violations',
        value: 8,
        trendText: '3 need attention',
        icon: 'bi-exclamation-triangle',
        statusText: 'need attention',
        textClass: 'text-red-400'
      },
      {
        id: 'm4',
        label: 'SLA Compliance',
        value: '98.2%',
        trendText: '+2.1% from target',
        icon: 'bi-clock',
        statusText: 'Above target',
        textClass: 'text-purple-500'
      }
    ];

    this.metrics = MODEL;
  }
}

// onCardClick(card: DistrictOfficerCard): void {
//   this.router.navigate(['/district', card.id]);
// }



