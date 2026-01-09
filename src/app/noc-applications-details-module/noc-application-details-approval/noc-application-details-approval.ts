import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component } from '@angular/core';

@Component({
  selector: 'app-noc-application-details-approval',
  imports: [AmigoFormComponent],
  templateUrl: './noc-application-details-approval.html',
  styleUrl: './noc-application-details-approval.css',
})
export class NocApplicationDetailsApproval {

  formId = '7a459723-6e34-4c4c-801e-77b65e7c3da4';

   onFormSubmitted(event: any) {
    // If schema had submitApiUrl => event = { payload, response, action }
    // Else => event = raw payload (backward compatible)
    console.log('submitted event:', event);
  }

  onFormSubmitFailed(err: any) {
    console.error('submit failed:', err);
  }

}
