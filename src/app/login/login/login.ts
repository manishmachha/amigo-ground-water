import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenInterceptor } from '../../interceptors/TokenInterceptor';
import { AuthService } from '../../services/auth-service';
import { AmigoFormComponent } from '@amigo/amigo-form-renderer';
import { AccessControlService } from '../../services/access-control-service';

type LoginMode = 'password' | 'otp';
@Component({
  selector: 'app-userlogin-screen',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './userlogin.css',
  imports: [AmigoFormComponent],
})
export class Login {
  constructor(private authService: AuthService, private router: Router) {}

  formId = 'e3346c85-4745-4a9e-9d9f-b4238cbb0778';
  acl = inject(AccessControlService);

  onFormSubmitted(event: any) {
    console.log('submitted event:', event);

    if (event?.response?.success) {
      const roleName = event.response.data.user.role.name;

      // Store login details
      this.authService.setLoginStatus(true);
      this.authService.setAuthToken(event.response.data.tokens.refreshToken);
      this.authService.setUserRole(roleName);

      // ACL setup (optional / as per your app)
      this.acl.me.set({
        id: event.response.data.user.id,
        name: event.response.data.user.name,
        roleIds: [roleName],
      });

      //  ROLE BASED NAVIGATION
      if (roleName === 'RIG_OWNER') {
        this.router.navigate(['/rig-owner']);
      } else if (roleName === 'DISTRICT_OFFICER') {
        this.router.navigate(['/district-officer']);
      } else if (roleName === 'FIELD_OFFICER') {
        this.router.navigate(['/field-officer']);
      } else {
        this.router.navigate(['/citizen-portal']);
      }
    }
  }

  onFormSubmitFailed(err: any) {
    console.error('submit failed:', err);
  }
  status = 'waiting...';

  ngOnInit() {
    setTimeout(() => {
      this.status = 'updated ';
    }, 1000);
  }
}
