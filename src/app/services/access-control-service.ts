// src/app/security/access-control.service.ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { RoleApiService } from './role-management-service';
import { AccessRequirement, CurrentUser } from '../models/access-control-model';
import { PermissionKey, Role } from '../models/roles.model';

@Injectable({ providedIn: 'root' })
export class AccessControlService {
  private roleApi = inject(RoleApiService);

  // You can load this from /me API. For now keep it settable.
  readonly me = signal<CurrentUser | null>(null);

  // All roles from backend (same Role[] used in Role Management screen)
  readonly roles = signal<Role[]>([]);

  readonly isReady = computed(() => !!this.me() && this.roles().length > 0);

  /** Union of module permissions across all roles assigned to current user */
  readonly effectivePermissions = computed(() => {
    const me = this.me();
    const roles = this.roles();
    if (!me) return {} as Record<string, Set<PermissionKey>>;

    const myRoles = roles.filter((r) => me.roleIds.includes(r.id));
    const acc: Record<string, Set<PermissionKey>> = {};

    for (const role of myRoles) {
      for (const [moduleId, perms] of Object.entries(role.modulePermissions ?? {})) {
        acc[moduleId] ??= new Set<PermissionKey>();
        perms.forEach((p) => acc[moduleId].add(p));
      }
    }
    return acc;
  });

  /** Call this once at app startup */
  loadAccessData() {
    console.log('[ACL] Loading roles + user...');
    // Replace with your real /me call.
    // For now, hardcode user with roleIds or set from login response.
    // this.me.set({ id: 'u1', name: 'Manish', roleIds: ['r_district_officer'] });

    this.roleApi.getRoles().subscribe({
      next: (roles:any) => {
        console.log('[ACL] Roles loaded:', roles.data.length);
        this.roles.set(roles.data);
      },
      error: (e) => console.error('[ACL] Failed to load roles', e),
    });
  }

  can(moduleId: string, permission: PermissionKey): boolean {
    const eff = this.effectivePermissions();
    return !!eff[moduleId]?.has(permission);
  }

  canAny(req: AccessRequirement): boolean {
    const perms = req.permissions ?? ['view'];
    return perms.some((p) => this.can(req.moduleId, p));
  }

  canAll(req: AccessRequirement): boolean {
    const perms = req.permissions ?? ['view'];
    return perms.every((p) => this.can(req.moduleId, p));
  }

  check(req: AccessRequirement): boolean {
    const mode = req.mode ?? 'ANY';
    return mode === 'ALL' ? this.canAll(req) : this.canAny(req);
  }
}
