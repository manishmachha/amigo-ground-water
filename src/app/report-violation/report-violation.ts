import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-violation',
  imports: [AmigoFormComponent,CommonModule],
  templateUrl: './report-violation.html',
  styleUrl: './report-violation.css',
})
export class ReportViolation {

  formId = '02acf12c-c4a5-4a82-a581-7eca93cae62d';

  snackBar= inject(MatSnackBar);
  router= inject(Router);

    onFormSubmitted(event: any) {
    console.log('submitted event:', event);

    if (event?.response?.success) {

      // Show SnackBar
      this.snackBar.open(
        'NOC Form submitted successfully',
        'Close',
        {
          duration: 3000,          // 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        }
      );

      // Navigate AFTER snackbar shows
      setTimeout(() => {
        this.router.navigate(['/citizen-portal']);
      }, 3000);
    }
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

  cards = [
    {
      title: 'Confidential Reporting',
      description:
        'Your identity will be protected. Anonymous reporting is also available.',
      icon: 'bi-exclamation-triangle',
      iconColor: 'text-orange-600',
      border: 'border-orange-200',
      bg: 'from-orange-50 to-red-50',
    },
    {
      title: 'Field Verification',
      description:
        'Our team will inspect the reported location within 3 working days.',
      icon: 'bi-geo-alt',
      iconColor: 'text-blue-600',
      border: 'border-blue-200',
      bg: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Action Taken',
      description:
        'Confirmed violations will be subject to enforcement action under WALTA.',
      icon: 'bi-check-circle',
      iconColor: 'text-green-600',
      border: 'border-green-200',
      bg: 'from-green-50 to-emerald-50',
    },
  ];


}
