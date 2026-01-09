import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-noc',
  standalone: true,
  templateUrl: './apply-noc.html',
  styleUrl: './apply-noc.css',
  imports: [AmigoFormComponent]
})
export class ApplyNoc {

  router = inject(Router);
  snackBar = inject(MatSnackBar)

  formId = '95d9dcf4-9e6b-4349-a8f6-2cfeaf5470c7';

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
        this.router.navigate(['/noc-applications']);
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
}
