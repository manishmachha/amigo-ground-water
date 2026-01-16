import { CommonModule } from '@angular/common';
import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DashboardStats, DistrictSummary, StatCard } from '../models/district-officer-model';
import { RouterLink } from '@angular/router';
import { NocDashboardService } from '../services/noc-dashboard-service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-noc-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterLink,
  ],
  templateUrl: './noc-dashboard.html',
  styleUrl: './noc-dashboard.css',
})
export class NocDashboard implements OnInit {
  dashboardService = inject(NocDashboardService);
  notificationService = inject(NotificationService);
  unreadCount = this.notificationService.unreadCount;

  stats = signal<DashboardStats | null>(null);

  /** Loading state */
  loading = signal(true);

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res) => {
        this.stats.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  /** ===== TOP CARDS ===== */
  statCards = computed<StatCard[]>(() => {
    if (!this.stats()) return [];

    return [
      {
        title: 'TOTAL NOCS',
        icon: 'bi-file-earmark',
        value: this.stats()!.totalNocs,
      },
      {
        title: 'PENDING APPLICATIONS',
        icon: 'bi-clock',
        value: this.stats()!.pendingApplications,
      },
      {
        title: 'RENEWALS IN 90 DAYS',
        icon: 'bi-exclamation-triangle',
        value: this.stats()!.pendingApplications, // adjust if backend adds field later
      },
      {
        title: 'APPROVED THIS MONTH',
        icon: 'bi-check-circle',
        value: this.stats()!.approvedThisMonth,
      },
    ];
  });

  /** ===== CATEGORY SECTION ===== */
  categories = computed(() => {
    const data = this.stats()?.applicationsByCategory ?? {};
    return Object.entries(data).map(([name, count]) => ({
      name,
      count,
    }));
  });

  /** ===== DISTRICT TABLE ===== */
  districtSummary = computed(() => {
    return this.stats()?.districtWiseSummary ?? [];
  });

  /** For progress width */
  maxCategoryCount = computed(() => {
    return Math.max(...this.categories().map((c) => c.count), 1);
  });
}
