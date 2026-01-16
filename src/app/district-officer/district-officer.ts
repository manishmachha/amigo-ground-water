import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  QuickCardModel,
  PendingTask,
  RecentActivity,
  DashboardMetric,
} from '../models/district-officer-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DistrictOfficerService } from '../services/district-officer.service';

@Component({
  selector: 'app-district-officer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './district-officer.html',
  styleUrl: './district-officer.css',
})
export class DistrictOfficer implements OnInit {
  router = inject(Router);
  private districtService = inject(DistrictOfficerService);

  quickCards = signal<QuickCardModel[]>([]);
  pendingTasks = signal<PendingTask[]>([]);
  recentActivities = signal<RecentActivity[]>([]);
  metrics = signal<DashboardMetric[]>([]);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.districtService.getDashboardStats().subscribe({
      next: (res: any) => {
        const data = res.data;
        this.updateMetrics(data);
        this.loadCardsModel(data); // Pass data if needed for cards
      },
      error: (err) => console.error('Failed to load stats', err),
    });

    this.districtService.getPendingTasks().subscribe({
      next: (res: any) => {
        const tasks = Array.isArray(res) ? res : res.data || [];
        this.mapPendingTasks(tasks);
      },
      error: (err) => console.error('Failed to load tasks', err),
    });

    // Keep activities mock for now or implement if API exists
    this.loadActivityModel();
  }

  mapPendingTasks(tasks: any[]) {
    const formattedTasks = tasks.map((t: any) => ({
      id: t.id,
      title: t.projectName || 'NOC Application',
      refNo: t.applicationNumber,
      timeLabel: new Date(t.submittedAt || Date.now()).toLocaleDateString(),
      colorClass: 'bg-amber-500', // Dynamic based on status?
      icon: 'bi-file-earmark-text text-yellow-800',
    }));
    this.pendingTasks.set(formattedTasks);
  }

  updateMetrics(data: any) {
    this.metrics.set([
      {
        id: 'm1',
        label: 'Active NOCs',
        value: data.pendingApplications || 0,
        trendText: 'Pending Actions',
        icon: 'bi-file-earmark-text',
        statusText: 'Current',
        textClass: 'text-blue-600',
      },
      {
        id: 'm2',
        label: 'Approved (Month)',
        value: data.approvedThisMonth || 0,
        trendText: 'This Month',
        icon: 'bi-check-circle',
        statusText: 'Success',
        textClass: 'text-green-500',
      },
      {
        id: 'm3',
        label: 'Total Applications',
        value: data.totalNocs || 0,
        trendText: 'All Time',
        icon: 'bi-folder',
        statusText: 'Total',
        textClass: 'text-purple-500',
      },
    ]);
  }

  loadCardsModel(data?: any): void {
    const pendingCount = data?.pendingApplications || 0;
    this.quickCards.set([
      {
        id: 'noc',
        title: 'NOC Management',
        subtitle: 'Applications, renewals, approvals',
        description: 'Manage end-to-end NOC lifecycle and district approvals.',
        icon: 'bi-file-earmark-text text-blue-600',
        footerText: `${pendingCount} pending`,
      },
      // ... keep other cards as static or update if APIs available
      {
        id: 'wells',
        title: 'Wells & Assets',
        subtitle: 'Registry, monitoring, linking',
        description: 'Track wells, piezometers, quality sensors.',
        icon: 'bi-droplet text-cyan-600',
        footerText: '1243 total',
      },
      {
        id: 'enforce',
        title: 'Enforcement',
        subtitle: 'WALTA cases',
        description: 'Violations, penalties management.',
        icon: 'bi-exclamation-triangle text-red-600',
        footerText: '8 active',
      },
    ]);
  }

  loadActivityModel(): void {
    const MODEL: RecentActivity[] = [
      {
        id: 'a1',
        title: 'NOC Application Approved',
        refNo: 'NOC-2024-001234',
        badge: 'success',
        time: '10 mins ago',
        icon: '',
      },
    ];

    this.recentActivities.set(MODEL);
  }

  onTaskClick(task: PendingTask) {
    if (task.id) {
      this.router.navigate(['/noc-application', task.id]);
    }
  }
}
