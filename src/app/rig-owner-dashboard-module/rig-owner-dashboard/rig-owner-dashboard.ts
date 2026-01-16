import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { RigOwnerDashboardService } from '../../services/rig-owner-dashboard-service';
import { FormsModule } from "@angular/forms";
export interface Role {
  id: string;
  name: string;
  description: string;
  badge: string;
  accent: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  organisationName: string;
  role: Role;
}

@Component({
  selector: 'app-rig-owner-dashboard',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './rig-owner-dashboard.html',
  styleUrl: './rig-owner-dashboard.css',
})
export class RigOwnerDashboard {

   totalRigs = 8;
  pendingLogs = 2;

  authService = inject(AuthService);
  router = inject(Router);
  rigOwnerUserInfo = inject(RigOwnerDashboardService);
  userInfo =signal<User | null>(null)


  ngOnInit() {
    this.loadUserInfo();
  }
  loadUserInfo() {
  this.rigOwnerUserInfo.rigOwneruserProfile().subscribe({
    next: (res: any) => {
      console.log('API Userinfo:', res);

      // optional signal (if you need elsewhere)
      this.userInfo.set(res.data.user);
      console.log('UserInfo response', this.userInfo())
    },
    error: (err) => {
      console.error('Failed to load applications', err);
    }
  });
}

logOut(){
  this.authService.logout();
  this.router.navigate(['/']);
}
}
