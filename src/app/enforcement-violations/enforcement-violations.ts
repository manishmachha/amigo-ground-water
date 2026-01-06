import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


interface EnforcementCase {
  caseId: string;
  type: string;
  location: string;
  severity: 'High' | 'Medium' | 'Low';
  status: string;
  date: string;
  officer: string;
}


@Component({
  selector: 'app-enforcement-violations',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatPaginator,MatSort,MatTableModule],
  templateUrl: './enforcement-violations.html',
  styleUrl: './enforcement-violations.css',
})
export class EnforcementViolations {
 @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


 displayedColumns: string[] = [
    'caseId',
    'type',
    'location',
    'severity',
    'status',
    'date',
    'officer',
    'actions'
  ];

  dataSource = new MatTableDataSource<EnforcementCase>([
    {
      caseId: 'ENF-2024-1247',
      type: 'Illegal Well',
      location: 'Medak District',
      severity: 'High',
      status: 'Investigation',
      date: '2024-01-20',
      officer: 'S. Kumar',
    },
    {
      caseId: 'ENF-2024-1246',
      type: 'Over-Extraction',
      location: 'Rangareddy District',
      severity: 'Medium',
      status: 'Penalty Issued',
      date: '2024-01-19',
      officer: 'R. Rao',
    },
    {
      caseId: 'ENF-2024-1245',
      type: 'Meter Tampering',
      location: 'Hyderabad District',
      severity: 'High',
      status: 'Seizure',
      date: '2024-01-18',
      officer: 'A. Reddy',
    },
    {
      caseId: 'ENF-2024-1244',
      type: 'Illegal Tanker',
      location: 'Nalgonda District',
      severity: 'Medium',
      status: 'Compounding',
      date: '2024-01-17',
      officer: 'M. Singh',
    }
  ]);

  severityClass(severity: string) {
    return {
      'bg-red-100 text-red-600': severity === 'High',
      'bg-orange-100 text-orange-600': severity === 'Medium',
      'bg-yellow-100 text-yellow-700': severity === 'Low',
    };
  }

  statusClass(status: string) {
    return {
      'bg-blue-100 text-blue-600': status === 'Investigation',
      'bg-indigo-100 text-indigo-600': status === 'Penalty Issued',
      'bg-purple-100 text-purple-600': status === 'Seizure',
      'bg-sky-100 text-sky-600': status === 'Compounding',
    };
  }

  
stats = [
    {
      title: 'ACTIVE OFFENCE CASES',
      value: 247,
      sub: '+12 this week',
      icon: 'bi-exclamation-triangle',
      bg: 'bg-red-100',
      color: 'text-red-500'
    },
    {
      title: 'ILLEGAL WELLS DETECTED',
      value: 89,
      sub: '34 verified',
      icon: 'bi-geo-alt',
      bg: 'bg-yellow-100',
      color: 'text-yellow-600'
    },
    {
      title: 'SEIZURES THIS MONTH',
      value: 23,
      sub: '18 in custody',
      icon: 'bi-box',
      bg: 'bg-purple-100',
      color: 'text-purple-600'
    },
    {
      title: 'PENALTIES ASSESSED',
      value: '₹2.4 Cr',
      sub: '₹1.8 Cr collected',
      icon: 'bi-currency-rupee',
      bg: 'bg-green-100',
      color: 'text-green-600'
    }
  ];

  severityStats = [
    { label: 'High Severity', value: 67, color: 'bg-red-500', percent: 45 },
    { label: 'Medium Severity', value: 124, color: 'bg-orange-500', percent: 70 },
    { label: 'Low Severity', value: 56, color: 'bg-yellow-400', percent: 35 },
  ];

  hotspots = [
    { name: 'Medak', count: 34, delta: '+8', deltaColor: 'bg-red-100 text-red-600' },
    { name: 'Rangareddy', count: 28, delta: '+5', deltaColor: 'bg-red-100 text-red-600' },
    { name: 'Nalgonda', count: 24, delta: '+3', deltaColor: 'bg-red-100 text-red-600' },
    { name: 'Hyderabad', count: 21, delta: '-2', deltaColor: 'bg-green-100 text-green-600' },
  ];

  quickActions = [
    { label: 'Unauthorized Wells', icon: 'bi-geo-alt' },
    { label: 'Register Offence (Form-7)', icon: 'bi-file-earmark-text' },
    { label: 'Seizure Records (Form-8)', icon: 'bi-box' },
    { label: 'Compounding Orders', icon: 'bi-scale' },
  ];
}
