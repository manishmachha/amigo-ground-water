import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RigOwnerDashboard } from './rig-owner-dashboard/rig-owner-dashboard';
import { RigOwnerRegisteredRigs } from './rig-owner-registered-rigs/rig-owner-registered-rigs';
import { RigOwnerDrillingLogs } from './rig-owner-drilling-logs/rig-owner-drilling-logs';
import { RigOwnerVoilation } from './rig-owner-voilation/rig-owner-voilation';
import { RigOwnerRenewals } from './rig-owner-renewals/rig-owner-renewals';
import { RigOwnerActivity } from './rig-owner-activity/rig-owner-activity';

const routes: Routes = [
  {
    path: '',
    component: RigOwnerDashboard,
    children: [
      { path: '', redirectTo: 'registered-rigs', pathMatch: 'full' },
      { path: 'registered-rigs', component: RigOwnerRegisteredRigs },
      { path: 'drilling-logs', component: RigOwnerDrillingLogs },
      { path: 'violations', component: RigOwnerVoilation },
      { path: 'renewals', component: RigOwnerRenewals},
      { path: 'activity', component: RigOwnerActivity}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RigOwnerDashboardModuleRoutes { }
