import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NocApplicationDetailsService } from '../services/noc-application-details-service';

@Component({
  selector: 'app-apply-noc',
  standalone: true,
  templateUrl: './apply-noc.html',
  styleUrl: './apply-noc.css',
  imports: [AmigoFormComponent]
})
export class ApplyNoc {

  router = inject(Router);
  snackBar = inject(MatSnackBar);
  submitNocApplications = inject(NocApplicationDetailsService);

  formId = '95d9dcf4-9e6b-4349-a8f6-2cfeaf5470c7';

  onFormSubmitted(event: any) {
    console.log('submitted event:', event);

    if (event?.response?.success) {

      const applicationId = event?.response?.data?.applicantId;

      if (!applicationId) {
        console.log('Application Id Not Generated');
        return;
      }

      console.log('Application Id:', applicationId);

      this.submitNoc(applicationId);
    }
  }

  submitNoc(applicantId: string) {

    this.submitNocApplications.submitNocApplication(applicantId).subscribe({
      next: () => {
        //  STEP 4: Show snackbar
        this.snackBar.open(
          'NOC Form submitted successfully',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          }
        );

        // STEP 5: Navigate after snackbar
        setTimeout(() => {
          this.router.navigate(['/noc-applications']);
        }, 3000);
      },
      error: (err) => {
        console.error('Second API failed', err);

        this.snackBar.open(
          'Failed to complete NOC submission',
          'Close',
          {
            duration: 3000,
            panelClass: ['error-snackbar']
          }
        );
      }
    });
  }

  onFormSubmitFailed(err: any) {
    this.snackBar.open(
      'Failed to submit NOC form',
      'Close',
      {
        duration: 3000,
        panelClass: ['error-snackbar']
      }
    );
    console.error('submit failed:', err);
  }
}
