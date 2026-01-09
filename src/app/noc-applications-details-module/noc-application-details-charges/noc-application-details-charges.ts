import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface NocChargeItem {
  component: string;
  rate: number;
  annualQty: number;
  multiplier: string;
  amount: string;
}

export interface NocBill {
  applicationFee: string;
  estimatedAnnualCharges: string;
  firstQuarterAdvance: string;
  charges: NocChargeItem[];
}

export interface BillInfo {
  alertTitle: string;
  alertText: string;
  location: string;
  totalAnnualCharges: number;
}

@Component({
  selector: 'app-noc-application-details-charges',
  imports: [CommonModule],
  templateUrl: './noc-application-details-charges.html',
  styleUrl: './noc-application-details-charges.css',
})
export class NocApplicationDetailsCharges {

   info: BillInfo = {
    alertTitle: 'Charge Calculation Basis',
    alertText: 'Charges calculated as per GWER-2023 tariff for Critical category watershed',
    location: 'Hyderabad',
    totalAnnualCharges: 257544
  };


 bill: NocBill = {
    applicationFee: '₹5,000',
    estimatedAnnualCharges: '₹2,57,544',
    firstQuarterAdvance: '₹64,386',

    charges: [
      {
        component: 'Abstraction Charge',
        rate: 2.00,
        annualQty: 61320,
        multiplier: '1.5x',
        amount: '₹1,83,960'
      },
      {
        component: 'Restoration Charge',
        rate: 0.50,
        annualQty: 61320,
        multiplier: '1.5x',
        amount: '₹45,990'
      },
      {
        component: 'Environmental Compensation',
        rate: 0.30,
        annualQty: 61320,
        multiplier: '1.5x',
        amount: '₹27,594'
      }
    ]
  };

  getTotal() {
    return '₹2,57,544';
  }
}
