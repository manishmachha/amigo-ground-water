import { Component, inject, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { NocApplicationDetailsService } from '../../services/noc-application-details-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-noc-application-details-charges',
  imports: [CommonModule, AmigoFormComponent],
  templateUrl: './noc-application-details-charges.html',
  styleUrl: './noc-application-details-charges.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class NocApplicationDetailsCharges implements OnInit {
  // TODO(AMIGO_FORM_ID): Create a Charge Sheet form to display bill details.
  formId = '<<MAP_CHARGES_FORM_ID_HERE>>';
  mode = 'view';
  initialData: any = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private nocService = inject(NocApplicationDetailsService);

  applicationId: string | null = null;

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((params) => {
      this.applicationId = params.get('id');
      if (this.applicationId) {
        this.loadCharges();
      }
    });
  }

  loadCharges() {
    // Mock data - in real app fetch from API
    // The structure should match the Form definition in Amigo Builder
    this.initialData = {
      applicationFee: '₹5,000',
      estimatedAnnualCharges: '₹2,57,544',
      firstQuarterAdvance: '₹64,386',
      totalAnnualCharges: '₹2,57,544',
      alertText: 'Charges calculated as per GWER-2023 tariff for Critical category watershed',
      charges: [
        {
          component: 'Abstraction Charge',
          rate: 2.0,
          annualQty: 61320,
          multiplier: '1.5x',
          amount: '₹1,83,960',
        },
        {
          component: 'Restoration Charge',
          rate: 0.5,
          annualQty: 61320,
          multiplier: '1.5x',
          amount: '₹45,990',
        },
        {
          component: 'Environmental Compensation',
          rate: 0.3,
          annualQty: 61320,
          multiplier: '1.5x',
          amount: '₹27,594',
        },
      ],
    };
  }

  onFormSubmitted(event: any) {
    if (!this.applicationId) return;

    // Assuming the form allows "Approve" submission even in view mode (or mixed mode),
    // or this handler is called by a custom button outside (if we kept manual buttons).
    // But strict rule says "use renderer".
    // If the form has a submit button "Approve Charges", this triggers.

    this.nocService
      .performAction(this.applicationId, 'APPROVE_CHARGES', {}, 'Charges Approved')
      .subscribe({
        next: () => {
          alert('Charges Approved Successfully');
          // Navigate or refresh
          this.router.navigate(['/district-officer']);
        },
        error: (err) => console.error('Charge approval failed', err),
      });
  }
}
