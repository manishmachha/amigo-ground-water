import { Routes } from "@angular/router";
import { NocApplicationDetails } from "./noc-application-details/noc-application-details";
import { NocApplicationDetailsSummary } from "./noc-application-details-summary/noc-application-details-summary";
import { NocApplicationDetailsApplicant } from "./noc-application-details-applicant/noc-application-details-applicant";
import { NocApplicationDetailsDocuments } from "./noc-application-details-documents/noc-application-details-documents";
import { NocApplicationDetailsTechnicalReview } from "./noc-application-details-technical-review/noc-application-details-technical-review";
import { NocApplicationDetailsFieldInvestigation } from "./noc-application-details-field-investigation/noc-application-details-field-investigation";
import { NocApplicationDetailsCharges } from "./noc-application-details-charges/noc-application-details-charges";
import { NocApplicationDetailsApproval } from "./noc-application-details-approval/noc-application-details-approval";
import { NocApplicationDetailsTimeline } from "./noc-application-details-timeline/noc-application-details-timeline";



export const NocApplicationRoutes: Routes = [

  { path: '', component: NocApplicationDetails,
    children:[
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'summary', component: NocApplicationDetailsSummary },
  { path: 'applicant', component: NocApplicationDetailsApplicant},
  { path: 'documents', component: NocApplicationDetailsDocuments},
  { path: 'technical-review', component: NocApplicationDetailsTechnicalReview},
  { path: 'field-investigation', component: NocApplicationDetailsFieldInvestigation},
  { path: 'charges', component: NocApplicationDetailsCharges},
  { path: 'approval', component: NocApplicationDetailsApproval},
  { path: 'timeline', component: NocApplicationDetailsTimeline},
    ]
  },

 ];