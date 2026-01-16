import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../services/notification.service';
import { RouterModule } from '@angular/router';

export interface DistrictNoc {
  district: string;
  totalNocs: number;
  oeAreas: number;
  criticalAreas: number;
  riskScore: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  notificationService = inject(NotificationService);
  unreadCount = this.notificationService.unreadCount;
  //  ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.loadDonutChart();
  //   this.loadLineChart();
  // }

  // loadDonutChart() {
  //   new chart('assessmentChart', {
  //     type: 'doughnut',
  //     data: {
  //       labels: ['Safe', 'Semi-Critical', 'Critical', 'Over-Exploited'],
  //       datasets: [
  //         {
  //           data: [15234, 7123, 4267, 1976],
  //           backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#7F1D1D'],
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       cutout: '70%',
  //       plugins: {
  //         legend: { display: false },
  //       },
  //     },
  //   });
  // }

  // loadLineChart() {
  //   new chart('extractionChart', {
  //     type: 'line',
  //     data: {
  //       labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  //       datasets: [
  //         {
  //           label: 'Actual',
  //           data: [420, 435, 460, 475, 490, 450, 440, 445, 460, 480, 470, 455],
  //           borderColor: '#EF4444',
  //           backgroundColor: '#EF4444',
  //           tension: 0.4,
  //         },
  //         {
  //           label: 'Permitted',
  //           data: [450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450],
  //           borderColor: '#3B82F6',
  //           backgroundColor: '#3B82F6',
  //           tension: 0.4,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'bottom',
  //         },
  //       },
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           max: 600,
  //         },
  //       },
  //     },
  //   });
  // }

  nocCategories = [
    { name: 'Industrial', value: 1847, percent: 28 },
    { name: 'Mining', value: 1234, percent: 19 },
    { name: 'Apartments', value: 2156, percent: 33 },
    { name: 'Packaged Water', value: 789, percent: 12 },
    { name: 'Bulk Supplier', value: 523, percent: 8 },
  ];

  complianceMetrics = [
    { label: 'Water Level Reporting', value: 87.3, status: 'warn' },
    { label: 'Water Quality Reporting', value: 92.1, status: 'ok' },
    { label: 'Flow Meters Online', value: 78.5, status: 'warn' },
    { label: 'Recharge Structures', value: 81.4, status: 'ok' },
  ];

  tableHeaders = ['district', 'totalNocs', 'oeAreas', 'criticalAreas', 'riskScore', 'actions'];

  // dataSource = new MatTableDataSource<DistrictNoc>([
  //     { district: 'Hyderabad', totalNocs: 891, oeAreas: 12, criticalAreas: 45, riskScore: 7.7 },
  //     { district: 'Rangareddy', totalNocs: 734, oeAreas: 8, criticalAreas: 38, riskScore: 7.4 },
  //     { district: 'Medak', totalNocs: 623, oeAreas: 67, criticalAreas: 89, riskScore: 35.8 },
  //     { district: 'Nalgonda', totalNocs: 589, oeAreas: 45, criticalAreas: 72, riskScore: 27.5 },
  //     { district: 'Karimnagar', totalNocs: 467, oeAreas: 23, criticalAreas: 51, riskScore: 20.8 },
  //     { district: 'Warangal', totalNocs: 445, oeAreas: 34, criticalAreas: 56, riskScore: 27.9 },
  //   ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  riskClass(score: number) {
    if (score < 10) return 'bg-green-100 text-green-800';
    if (score < 25) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }
}
