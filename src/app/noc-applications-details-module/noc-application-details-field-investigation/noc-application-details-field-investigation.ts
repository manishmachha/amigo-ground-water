import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionService } from '../../services/inspection.service';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noc-application-details-field-investigation',
  imports: [AmigoFormComponent, CommonModule],
  templateUrl: './noc-application-details-field-investigation.html',
  styleUrl: './noc-application-details-field-investigation.css',
})
export class NocApplicationDetailsFieldInvestigation implements OnInit {
  formId = '94cf96ba-c169-406a-b906-bef4d26e55d9';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private inspectionService = inject(InspectionService);
  private nocService = inject(NocApplicationDetailsService);

  applicationId: string | null = null;
  inspectionId: string | null = null;
  inspection: any = null;

  ngOnInit() {
    // Get ID from parent route
    this.route.parent?.paramMap.subscribe((params) => {
      this.applicationId = params.get('id');
      if (this.applicationId) {
        this.loadInspection();
      }
    });
  }

  loadInspection() {
    if (!this.applicationId) return;
    this.inspectionService.getInspectionsByApplication(this.applicationId).subscribe({
      next: (res: any) => {
        // Assuming returns array, take the latest or verify logic
        const inspections = res.data || [];
        if (inspections.length > 0) {
          this.inspection = inspections[0];
          this.inspectionId = this.inspection.id;
        }
      },
      error: (err) => console.error('Failed to load inspection', err),
    });
  }

  onFormSubmitted(event: any) {
    if (!this.inspectionId || !this.applicationId) {
      console.error('No inspection or application ID');
      return;
    }

    console.log('Form submitted:', event);
    // Prepare payload for Inspection Update
    // Assuming event.data contains the form fields
    // We need to map form fields to backend DTO expected by InspectionService.update

    const formData = new FormData();
    // Add status COMPLETED
    formData.append('status', 'Completed');

    // Add other fields from form if needed.
    // Since we don't know exact form structure, we'll assume we just mark it completed for now
    // In real app, we would map event.data fields to formData
    if (event.data) {
      Object.keys(event.data).forEach((key) => {
        formData.append(key, event.data[key]);
      });
    }

    // 1. Update Inspection to Completed
    this.inspectionService.updateInspection(this.inspectionId, formData).subscribe({
      next: () => {
        console.log('Inspection updated successfully');
        // 2. Trigger Workflow Action
        this.submitWorkflowAction();
      },
      error: (err) => console.error('Failed to update inspection', err),
    });
  }

  submitWorkflowAction() {
    if (!this.applicationId) return;

    this.nocService
      .performAction(
        this.applicationId,
        'SUBMIT_FIELD_REPORT',
        {},
        'Field Report Submitted via Portal'
      )
      .subscribe({
        next: () => {
          alert('Field Report Submitted Successfully');
          this.router.navigate(['/field-officer']);
        },
        error: (err) => {
          console.error('Workflow action failed', err);
          alert('Failed to submit report in workflow');
        },
      });
  }

  onFormSubmitFailed(err: any) {
    console.error('submit failed:', err);
  }
}
