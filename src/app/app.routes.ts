import { Routes } from '@angular/router';
import { Posts } from './posts/posts';
import { ApplyNoc } from './apply-noc/apply-noc';
import { MonitoringCompliance } from './monitoring-compliance/monitoring-compliance';
import { NocPermissions } from './noc-permissions/noc-permissions';
import { publishFacade } from '@angular/compiler';
import { PublicHome } from './public-home/public-home';
import { CitizenPortal } from './citizen-portal/citizen-portal';
import { CitizenProfile } from './citizen-profile/citizen-profile';
import { Dashboard } from './dashboard/dashboard';
import { EnforcementViolations } from './enforcement-violations/enforcement-violations';
import { ReportViolation } from './report-violation/report-violation';
import { SubmitGreviance } from './submit-greviance/submit-greviance';
import { WellAssets } from './well-assets/well-assets';
import { WellRegister } from './well-register/well-register';
import { RoleManagementPage } from './role-management/manage-roles/manage-roles';
import { DistrictOfficer } from './district-officer/district-officer';
import { NocApplications } from './noc-applications/noc-applications';
import { NocDashboard } from './noc-dashboard/noc-dashboard';
import { DrillingLogEntry } from './drilling-log-entry/drilling-log-entry';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.routes').then((m) => m.loginRoutes) },
  { path: 'posts', component: Posts },
  { path: 'noc-apply', component: ApplyNoc },
  { path: 'monitoring-compliances', component: MonitoringCompliance },
  { path: 'noc-permissions', component: NocPermissions },
  { path: 'public-home', component: PublicHome },
  {
    path: 'rig-management',
    loadChildren: () =>
      import('./rig-management-module/rig-management.routes').then((m) => m.rigManagementRoutes),
  },
  {
    path: 'tanker-bulk',
    loadChildren: () =>
      import('./tanker-bulk-supply-module/tanker-bulk-supply.routes').then(
        (m) => m.TankerBulkSupplyRoutes
      ),
  },
  { path: 'well-register', component: WellRegister },
  { path: 'citizen-portal', component: CitizenPortal },
  { path: 'report-voilation', component: ReportViolation },
  { path: 'submit-greviance', component: SubmitGreviance },
  { path: 'profile', component: CitizenProfile },
  { path: 'dashboard', component: Dashboard },
  { path: 'enforcement-violations', component: EnforcementViolations },
  { path: 'well-assets', component: WellAssets },
  { path: 'manage-roles', component: RoleManagementPage },
  {path:'district-officer', component: DistrictOfficer},
  {path:'noc-applications', component:NocApplications},
  {path:'noc-dashboard', component:NocDashboard},
   {
    path: 'noc-application',
    loadChildren: () =>
      import('./noc-applications-details-module/noc-applications-details.routes').then((m) => m.NocApplicationRoutes),
  },
   {
    path: 'rig-owner',
    loadChildren: () =>
      import('./rig-owner-dashboard-module/rig-owner-dashboard-module.routes').then((m) => m.RigOwnerDashboardModuleRoutes),
  },
  {path : 'drilling-log', component: DrillingLogEntry},
];
