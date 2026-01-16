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
import { RigOwnerDashboard } from './rig-owner-dashboard/rig-owner-dashboard';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./login/login.routes').then((m) => m.loginRoutes) },
  {
    path: 'field-officer',
    loadComponent: () =>
      import('./field-officer/field-officer.component').then((m) => m.FieldOfficerComponent),
    data: { title: 'Field Officer Dashboard', description: 'Manage field inspections and reports' },
  },
  {
    path: 'posts',
    component: Posts,
    data: { title: 'Posts', description: 'View and manage posts' },
  },
  {
    path: 'noc-apply',
    component: ApplyNoc,
    data: {
      title: 'Apply for NOC',
      description: 'Submit a new No Objection Certificate application',
    },
  },
  {
    path: 'monitoring-compliances',
    component: MonitoringCompliance,
    data: {
      title: 'Monitoring & Compliance',
      description: 'Track compliance status and monitoring reports',
    },
  },
  {
    path: 'noc-permissions',
    component: NocPermissions,
    data: { title: 'NOC Permissions', description: 'Manage NOC permissions and approvals' },
  },
  {
    path: 'public-home',
    component: PublicHome,
    data: { title: 'Home', description: 'Public portal home page' },
  },
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
  {
    path: 'well-register',
    component: WellRegister,
    data: {
      title: 'Well Registration',
      description: 'Register new wells and manage existing ones',
    },
  },
  {
    path: 'citizen-portal',
    component: CitizenPortal,
    data: { title: 'Citizen Portal', description: 'Access citizen services and information' },
  },
  {
    path: 'report-voilation',
    component: ReportViolation,
    data: {
      title: 'Report Violation',
      description: 'Report groundwater violations and illegal activities',
    },
  },
  {
    path: 'submit-greviance',
    component: SubmitGreviance,
    data: { title: 'Submit Grievance', description: 'File a complaint or grievance' },
  },
  {
    path: 'profile',
    component: CitizenProfile,
    data: { title: 'My Profile', description: 'Manage your profile and account settings' },
  },
  {
    path: 'dashboard',
    component: Dashboard,
    data: {
      title: 'State Groundwater Analytics',
      description: 'Comprehensive statewide groundwater resource monitoring & intelligence',
    },
  },
  {
    path: 'enforcement-violations',
    component: EnforcementViolations,
    data: {
      title: 'Enforcement & Violations',
      description: 'Manage enforcement actions and penalty records',
    },
  },
  {
    path: 'well-assets',
    component: WellAssets,
    data: { title: 'Well Assets', description: 'Inventory of well assets and equipment' },
  },
  {
    path: 'manage-roles',
    component: RoleManagementPage,
    data: { title: 'Role Management', description: 'Manage user roles and permissions' },
  },
  {
    path: 'district-officer',
    component: DistrictOfficer,
    data: {
      title: 'District Officer Dashboard',
      description: 'District-level overview and actions',
    },
  },
  {
    path: 'noc-applications',
    component: NocApplications,
    data: { title: 'NOC Applications', description: 'View and process NOC applications' },
  },
  {
    path: 'noc-dashboard',
    component: NocDashboard,
    data: {
      title: 'Dashboard',
      description: "Welcome back, here's what's happening today",
    },
  },
  {
    path: 'noc-application',
    loadChildren: () =>
      import('./noc-applications-details-module/noc-applications-details.routes').then(
        (m) => m.NocApplicationRoutes
      ),
  },
  {
    path: 'rig-owner',
    component: RigOwnerDashboard,
    data: { title: 'Rig Owner Dashboard', description: 'Manage rig operations and assignments' },
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications').then((m) => m.Notifications),
    data: { title: 'Notifications', description: 'Manage your alerts and updates' },
  },
];
