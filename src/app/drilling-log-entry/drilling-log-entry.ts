import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drilling-log-entry',
  imports: [AmigoFormComponent],
  templateUrl: './drilling-log-entry.html',
  styleUrl: './drilling-log-entry.css',
})
export class DrillingLogEntry {

  formId = '7b765aba-e313-4159-963e-3e61e61c3d69'

   onFormSubmitted(event: any) {
    // If schema had submitApiUrl => event = { payload, response, action }
    // Else => event = raw payload (backward compatible)
    console.log('submitted event:', event);
  }

  onFormSubmitFailed(err: any) {
    console.error('submit failed:', err);
  }

}
