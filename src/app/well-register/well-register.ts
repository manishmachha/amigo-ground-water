import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { AmigoFormComponent } from '@amigo/amigo-form-renderer';


@Component({
  selector: 'app-well-register',
  standalone: true,
  imports: [AmigoFormComponent],
  templateUrl: './well-register.html',
  styleUrl: './well-register.css',
})
export class WellRegister {
  formId = '8724ee6f-7fd5-4c8e-aac4-883134d1712f';

  router = inject(Router);
  snackBar = inject(MatSnackBar);


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
}
