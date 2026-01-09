import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component } from '@angular/core';

@Component({
  selector: 'app-noc-application-details-field-investigation',
  imports: [AmigoFormComponent],
  templateUrl: './noc-application-details-field-investigation.html',
  styleUrl: './noc-application-details-field-investigation.css',
})
export class NocApplicationDetailsFieldInvestigation {

  formId = '94cf96ba-c169-406a-b906-bef4d26e55d9';

   onFormSubmitted(event: any) {
    // If schema had submitApiUrl => event = { payload, response, action }
    // Else => event = raw payload (backward compatible)
    console.log('submitted event:', event);
  }

  onFormSubmitFailed(err: any) {
    console.error('submit failed:', err);
  }

}
