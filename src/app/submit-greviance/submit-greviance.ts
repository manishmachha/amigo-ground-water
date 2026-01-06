import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-greviance',
  standalone:true,
  imports: [AmigoFormComponent],
  templateUrl: './submit-greviance.html',
  styleUrl: './submit-greviance.css',
})
export class SubmitGreviance {
   formId = '111df90b-b6da-42da-bf9e-a2fb37057e23';


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

}
