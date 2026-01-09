// src/app/role-management/role-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModuleConfig, Role } from '../models/roles.model';
import { environmentUrls } from '../environment.urls';

@Injectable({ providedIn: 'root' })
export class RoleApiService {
  private http = inject(HttpClient);

  // change this to your backend base url
  private baseUrl = environmentUrls.development.apiUrl;

  getModules(): Observable<ModuleConfig[]> {
    return this.http.get<ModuleConfig[]>(`${this.baseUrl}/roles/modules`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }

  createRole(payload: Pick<Role, 'name' | 'description' | 'modulePermissions'>): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}/roles`, payload);
  }

  updateRole(
    roleId: string,
    patch: Partial<Pick<Role, 'name' | 'description' | 'modulePermissions'>>
  ): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/roles/${roleId}`, patch);
  }

  deleteRole(roleId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/roles/${roleId}`);
  }
}
