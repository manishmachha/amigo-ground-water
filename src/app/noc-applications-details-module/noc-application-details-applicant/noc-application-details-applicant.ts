import { Component } from '@angular/core';
import { NocUiData } from '../../models/noc-application-details-applicant-model';

@Component({
  selector: 'app-noc-application-details-applicant',
  imports: [],
  templateUrl: './noc-application-details-applicant.html',
  styleUrl: './noc-application-details-applicant.css',
})
export class NocApplicationDetailsApplicant {
data: NocUiData = {
    contact: {
      name: 'Mr. Rajesh Kumar',
      designation: 'Managing Director',
      organization: 'Green Valley Developers Pvt Ltd',
      mobile: '+91 9876543210',
      email: 'rajesh.kumar@greenvalley.com',
      address: 'Plot 123, Gachibowli, Hyderabad, Telangana - 500032'
    },
    business: {
      pan: 'ABCDE1234F',
      gst: '36ABCDE1234F1Z5'
    }
  };

}
