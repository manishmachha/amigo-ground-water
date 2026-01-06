import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {  OnInit } from '@angular/core';
import { CitizenProfileService } from '../services/citizen-portal-service';
import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-citizen-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './citizen-portal.html',
  styleUrl: './citizen-portal.css',
})
export class CitizenPortal implements OnInit {

    searchText = '';
  applications = signal<any[]> ( []);
  grievances = signal<any[]> ([]);
  showAllApplications = false;
  initialApplicationsCount = 3;

  showAllGrievances = false
  initialGrievanceCount = 4;


  CitizenProfileService = inject(CitizenProfileService);

  ngOnInit(): void {
    this.loadApplications();
    this.loadGrievances();
  }

  actions = [
    {
      title: 'Apply for NOC',
      icon: 'bi-file-earmark-text',
      bg: 'bg-blue-500',
      routerLink: '/noc-apply'
    },
    {
      title: 'Register Well',
      icon: 'bi-droplet',
      bg: 'bg-cyan-500',
      routerLink: '/well-register'
    },
    {
      title: 'Report Violation',
      icon: 'bi-exclamation-triangle',
      bg: 'bg-orange-500',
       routerLink: '/report-voilation'
    },
    {
      title: 'Submit Grievance',
      icon: 'bi-chat-dots',
      bg: 'bg-purple-500',
      routerLink: '/submit-greviance'
    }
  ];

loadApplications() {
  this.CitizenProfileService.getMyApplications().subscribe({
    next: (res: any) => {
      console.log('application response', res);

      this.applications.set(res.data);

      console.log('Mapped applications:', this.applications);
    },
    error: (err) => {
      console.error('Failed to load applications', err);
    }
  });
}

visibleApplications() {
  const list = this.applications();   
  return this.showAllApplications
    ? list
    : list.slice(0, this.initialApplicationsCount);
}
toggleViewAll(){
  this.showAllApplications = !this.showAllApplications
}

  // applications = [
  //   {
  //     title: 'NOC Application',
  //     appId: 'APP-NOC-2024-1234',
  //     submittedOn: '15/1/2024',
  //     stage: 'Technical Review',
  //     status: 'Under Review',
  //     statusColor: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  //     icon: 'bi-clock'
  //   },
  //   {
  //     title: 'Well Registration',
  //     appId: 'APP-WELL-2023-8765',
  //     submittedOn: '20/12/2023',
  //     stage: 'Completed',
  //     status: 'Approved',
  //     statusColor: 'bg-green-100 text-green-700 border-green-300',
  //     icon: 'bi-check-circle'
  //   }
  // ];

  notifications = [
    {
      message: 'Your NOC application is under technical review',
      time: '2 hours ago'
    },
    {
      message: 'Document verification completed successfully',
      time: '1 day ago'
    },
    {
      message: 'Please submit missing documents for application APP-NOC-2024-1234',
      time: '2 days ago'
    }
  ];

  // grievances = [
  //   {
  //     title: 'Unauthorized Well Near Property',
  //     refId: 'GRV-2024-0567',
  //     submittedOn: '20/1/2024',
  //     status: 'In Progress',
  //     statusClass: 'bg-blue-100 text-blue-700 border-blue-300',
  //     icon: 'bi-clock'
  //   },
  //   {
  //     title: 'Application Processing Delay',
  //     refId: 'GRV-2023-9876',
  //     submittedOn: '10/11/2023',
  //     status: 'Resolved',
  //     statusClass: 'bg-green-100 text-green-700 border-green-300',
  //     icon: 'bi-check-circle'
  //   }
  // ];


  loadGrievances() {
  this.CitizenProfileService.getGrievances().subscribe({
    next: (res: any) => {
      console.log('grievances response', res);

      this.grievances.set(res.data);

      console.log('Mapped grievances:', this.grievances);
    },
    error: (err) => {
      console.error('Failed to load grievances', err);
    }
  });
}

visibleGrievances() {
  const list = this.grievances();   
  return this.showAllGrievances
    ? list
    : list.slice(0, this.initialGrievanceCount);
}

grievanceViewAll(){
  this.showAllGrievances = !this.showAllGrievances
}

  
  documents = [
    {
      name: 'NOC Application Form',
      date: 'Uploaded · 15/1/2024'
    },
    {
      name: 'Well Registration Certificate',
      date: 'Issued · 25/12/2023'
    },
    {
      name: 'Property Documents',
      date: 'Uploaded · 14/1/2024'
    }
  ];


}
