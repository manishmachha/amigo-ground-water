// login.routes.ts
import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';

export const loginRoutes: Routes = [
  { path: '', component: Login, data: { hideHeader: true } },
  { path: 'register-screen', component: Register, data: { hideHeader: true } },
  { path: 'login-screen', component: Login, data: { hideHeader: true } },
];
