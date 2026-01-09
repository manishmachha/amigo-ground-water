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
    // If schema had submitApiUrl => event = { payload, response, action }
    // Else => event = raw payload (backward compatible)
    console.log('submitted event:', event);
    if (event.response.success) {
      this.authService.setLoginStatus(true);
      this.authService.setAuthToken(event.response.data.tokens.refreshToken);
      this.authService.setUserRole(event.response.data.user.role.name);
      this.acl.me.set({ id: 'u1', name: 'Manish', roleIds: ['r_district_officer'] });
      this.router.navigate(['/citizen-portal']);
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
