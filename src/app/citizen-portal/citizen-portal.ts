import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
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
  applications = signal<any[]>([]);
  grievances = signal<any[]>([]);
  document = signal<any[]>([]);
  showAllApplications = false;
  initialApplicationsCount = 3;

  showAllGrievances = false;
  initialGrievanceCount = 4;

  showAllDocuments = false;
  initialDocumentsCount = 3;

  CitizenPortaleService = inject(CitizenProfileService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadApplications();
    this.loadGrievances();
    this.loadDocuments();
  }

  actions = [
    {
      title: 'Apply for NOC',
      icon: 'bi-file-earmark-text',
      bg: 'bg-blue-500',
      routerLink: '/noc-apply',
    },
    {
      title: 'Register Well',
      icon: 'bi-droplet',
      bg: 'bg-cyan-500',
      routerLink: '/well-register',
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
      routerLink: '/submit-greviance',
    },
  ];

  loadApplications() {
    this.CitizenPortaleService.getMyApplications().subscribe({
      next: (res: any) => {
        // res.data is expected to be the array of applications based on standard API response structure
        const apps = res.data || [];
        const mappedApps = apps.map((app: any) => ({
          title: app.projectName || 'NOC Application',
          appId: app.applicationNumber,
          submittedOn: app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Draft',
          stage: app.currentStage || 'Draft',
          status: app.status,
          statusColor: this.getStatusColor(app.status),
          icon: 'bi-file-earmark-text',
          // Add ID for navigation
          id: app.id,
        }));

        this.applications.set(mappedApps);
      },
      error: (err) => {
        console.error('Failed to load applications', err);
      },
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Draft':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
  }

  visibleApplications() {
    const list = this.applications();
    return this.showAllApplications ? list : list.slice(0, this.initialApplicationsCount);
  }

  toggleViewAll() {
    this.showAllApplications = !this.showAllApplications;
  }
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
      time: '2 hours ago',
    },
    {
      message: 'Document verification completed successfully',
      time: '1 day ago',
    },
    {
      message: 'Please submit missing documents for application APP-NOC-2024-1234',
      time: '2 days ago',
    },
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
    this.CitizenPortaleService.getGrievances().subscribe({
      next: (res: any) => {
        console.log('grievances response', res);

        this.grievances.set(res.data);

        console.log('Mapped grievances:', this.grievances);
      },
      error: (err) => {
        console.error('Failed to load grievances', err);
      },
    });
  }

  visibleGrievances() {
    const list = this.grievances();
    return this.showAllGrievances ? list : list.slice(0, this.initialGrievanceCount);
  }

  grievanceViewAll() {
    this.showAllGrievances = !this.showAllGrievances;
  }

  documents = [
    {
      name: 'NOC Application Form',
      date: 'Uploaded · 15/1/2024',
    },
    {
      name: 'Well Registration Certificate',
      date: 'Issued · 25/12/2023',
    },
    {
      name: 'Property Documents',
      date: 'Uploaded · 14/1/2024',
    },
  ];

  loadDocuments() {
    this.CitizenPortaleService.getDocuments().subscribe({
      next: (res: any) => {
        // console.log('Document Response', res);
        this.document.set(res.data);
        console.log('Documents Res', this.document());
      },
      error: (err) => {
        console.error('Failed to load Documents', err);
      },
    });
  }

  visibleDocuments() {
    const list = this.document();
    return this.showAllDocuments
      ? list
      : list.slice(0, this.initialDocumentsCount);
  }

  documentViewAll() {
    this.showAllDocuments = !this.showAllDocuments
  }

  downloadDocument(doc: any) {
    const link = document.createElement('a');
    link.href = doc.url;              // file URL from API
    link.download = doc.fileName || doc.name; // download name
    link.target = '_blank';
    link.click();
  }

  openApplication(app: any) {
    if (app.id) {
      this.router.navigate(['/noc-application', app.id]);
    }
  }
}
