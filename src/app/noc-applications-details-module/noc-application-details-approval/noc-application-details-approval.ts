import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component, inject, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noc-application-details-approval',
  imports: [AmigoFormComponent, CommonModule],
  templateUrl: './noc-application-details-approval.html',
  styleUrl: './noc-application-details-approval.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class NocApplicationDetailsApproval implements OnInit {
  // TODO(AMIGO_FORM_ID): Create a form with "Decision" (Select: APPROVE/REJECT) and "Remarks" (Textarea).
  formId = '<<MAP_APPROVAL_FORM_ID_HERE>>';
  mode = 'create';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private nocService = inject(NocApplicationDetailsService);

  applicationId: string | null = null;

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((params) => {
      this.applicationId = params.get('id');
    });
  }

  onFormSubmitted(event: any) {
    if (!this.applicationId) return;

    // Assume payload structure { decision: 'APPROVE'|'REJECT', remarks: '...' }
    // The renderer validates it.
    const payload = event.data || {};
    const decision = payload.decision; // Ensure your Amigo Form has this field key
    const remarks = payload.remarks; // Ensure your Amigo Form has this field key

    if (!decision) {
      console.error('Decision is missing in form payload');
      return;
    }

    const action = decision === 'APPROVE' ? 'APPROVE' : 'REJECT';

    this.nocService.performAction(this.applicationId, action, {}, remarks).subscribe({
      next: () => {
        alert(`Application ${decision === 'APPROVE' ? 'Approved' : 'Rejected'} Successfully`);
        this.router.navigate(['/district-officer']);
      },
      error: (err) => console.error('Approval action failed', err),
    });
  }
}
