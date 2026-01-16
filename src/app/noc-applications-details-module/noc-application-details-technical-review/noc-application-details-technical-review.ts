import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component, inject, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-noc-application-details-technical-review',
  imports: [AmigoFormComponent, CommonModule],
  templateUrl: './noc-application-details-technical-review.html',
  styleUrl: './noc-application-details-technical-review.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class NocApplicationDetailsTechnicalReview implements OnInit {
  // TODO(AMIGO_FORM_ID): Create a Technical Review form (Checklist, Observations, Recommendations)
  formId = '<<MAP_TECH_REVIEW_FORM_ID_HERE>>';
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

    // Payload from Amigo Form
    const payload = event.data || {};

    // Submit Action
    this.nocService
      .performAction(
        this.applicationId,
        'SUBMIT_TECHNICAL_REVIEW',
        {},
        'Technical Review Completed'
      )
      .subscribe({
        next: () => {
          alert('Technical Review Submitted');
          this.router.navigate(['/district-officer']);
        },
        error: (err) => console.error('Tech review submission failed', err),
      });
  }
}
