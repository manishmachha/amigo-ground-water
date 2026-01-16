import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FieldOfficerService } from '../services/field-officer.service';

@Component({
  selector: 'app-field-officer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-slate-50 min-h-screen">
      <div class="max-w-7xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Field Officer Dashboard</h1>
            <p class="text-slate-500 mt-1">Manage your assigned field inspections</p>
          </div>
        </div>

        <!-- Inspections List -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 class="font-semibold text-slate-800">Assigned Inspections</h2>
            <span class="text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">
              {{ assignedInspections.length }} Pending
            </span>
          </div>

          <div class="divide-y divide-slate-100">
            <div
              *ngFor="let item of assignedInspections"
              class="p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
              (click)="openInspection(item.id)"
            >
              <div class="flex items-start justify-between">
                <div class="flex gap-4">
                  <div
                    class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"
                  >
                    <i class="bi bi-geo-alt text-blue-600"></i>
                  </div>
                  <div>
                    <h3
                      class="font-medium text-slate-900 group-hover:text-blue-600 transition-colors"
                    >
                      {{ item.projectName || 'NOC Application' }}
                    </h3>
                    <p class="text-sm text-slate-500 mt-0.5">Ref: {{ item.applicationNumber }}</p>

                    <div class="flex items-center gap-4 mt-2">
                      <div class="flex items-center gap-1.5 text-xs text-slate-500">
                        <i class="bi bi-calendar"></i>
                        <span>Assigned: {{ item.submittedAt | date : 'mediumDate' }}</span>
                      </div>
                      <div class="flex items-center gap-1.5 text-xs text-slate-500">
                        <i class="bi bi-geo"></i>
                        <span>{{ item.villageTown }}, {{ item.mandal }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col items-end gap-2">
                  <span
                    class="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"
                  >
                    {{ item.status }}
                  </span>
                  <button class="text-sm text-blue-600 font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div *ngIf="assignedInspections.length === 0" class="p-12 text-center">
              <div
                class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <i class="bi bi-clipboard-check text-2xl text-slate-300"></i>
              </div>
              <h3 class="text-slate-900 font-medium mb-1">No inspections assigned</h3>
              <p class="text-slate-500 text-sm">
                You're all caught up! Check back later for new assignments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FieldOfficerComponent implements OnInit {
  private fieldService = inject(FieldOfficerService);
  private router = inject(Router);

  assignedInspections: any[] = [];

  ngOnInit() {
    this.loadInspections();
  }

  loadInspections() {
    this.fieldService.getMyInspections().subscribe({
      next: (res: any) => {
        this.assignedInspections = res.data || [];
      },
      error: (err) => console.error('Error loading inspections', err),
    });
  }

  openInspection(id: string) {
    this.router.navigate(['/noc-application', id, 'field-investigation']);
  }
}
