// src/app/role-management/role-management.store.ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ModuleConfig, PermissionKey, Role } from '../models/roles.model';
import { RoleApiService } from '../services/role-management-service';

@Injectable({ providedIn: 'root' })
export class RoleManagementStore {
  private api = inject(RoleApiService);

  readonly modules = signal<ModuleConfig[]>([]);
  readonly roles = signal<Role[]>([]);

  readonly activeRoleId = signal<string | null>(null);
  readonly detailsRoleId = signal<string | null>(null);
  readonly isCreateDialogOpen = signal(false);

  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly activeRole = computed(
    () => this.roles().find((r) => r.id === this.activeRoleId()) ?? null
  );
  readonly detailsRole = computed(
    () => this.roles().find((r) => r.id === this.detailsRoleId()) ?? null
  );

  // -------------------- INIT --------------------
  init() {
    console.log('[RoleManagement] init()');
    this.isLoading.set(true);
    this.error.set(null);

    forkJoin({
      modules: this.api.getModules(),
      roles: this.api.getRoles(),
    }).subscribe({
      next: (res: any) => {
        console.log('[RoleManagement] Loaded modules/roles', res);

        const modules: ModuleConfig[] = Array.isArray(res.modules)
          ? res.modules
          : res.modules?.data ?? [];

        const roles: Role[] = this.normalizeRoles(res.roles);

        this.modules.set(modules);
        this.roles.set(roles);

        // optional: select first role
        if (!this.activeRoleId() && roles.length) {
          this.activeRoleId.set(roles[0].id);
        }

        this.isLoading.set(false);
      },
      error: (e) => {
        console.error('[RoleManagement] init failed', e);
        this.error.set(e?.message ?? 'Failed to load roles/modules');
        this.isLoading.set(false);
      },
    });
  }

  // -------------------- UI --------------------
  openCreateDialog() {
    console.log('[RoleManagement] Open Create Role dialog');
    this.isCreateDialogOpen.set(true);
  }

  closeCreateDialog() {
    console.log('[RoleManagement] Close Create Role dialog');
    this.isCreateDialogOpen.set(false);
  }

  selectRole(roleId: string) {
    this.activeRoleId.set(roleId);
  }

  openDetails(roleId: string) {
    console.log('[RoleManagement] Open details for role:', roleId);
    this.detailsRoleId.set(roleId);
    this.activeRoleId.set(roleId);
  }

  closeDetails() {
    console.log('[RoleManagement] Close details panel');
    this.detailsRoleId.set(null);
  }

  // -------------------- CREATE --------------------
  createRole(payload: {
    name: string;
    description: string;
    modulePermissions: Record<string, PermissionKey[]>;
  }) {
    console.log('[RoleManagement] Create role payload:', payload);
    this.error.set(null);

    this.api.createRole(payload).subscribe({
      next: (createdRes) => {
        const created = this.normalizeRole(createdRes);
        console.log('[RoleManagement] Created role:', created);

        this.roles.update((list) => [created, ...list]);

        // optional: select/open newly created role so it never looks "missing"
        this.activeRoleId.set(created.id);
      },
      error: (e) => {
        console.error('[RoleManagement] createRole failed', e);
        this.error.set(e?.message ?? 'Failed to create role');
      },
    });
  }

  // -------------------- DELETE (optimistic + rollback) --------------------
  deleteRole(roleId: string) {
    console.log('[RoleManagement] Delete role:', roleId);
    this.error.set(null);

    const prev = this.roles();
    this.roles.set(prev.filter((r) => r.id !== roleId));

    this.api.deleteRole(roleId).subscribe({
      next: () => {
        console.log('[RoleManagement] Deleted role:', roleId);
        if (this.activeRoleId() === roleId) this.activeRoleId.set(null);
        if (this.detailsRoleId() === roleId) this.detailsRoleId.set(null);
      },
      error: (e) => {
        console.error('[RoleManagement] deleteRole failed (rollback)', e);
        this.roles.set(prev);
        this.error.set(e?.message ?? 'Failed to delete role');
      },
    });
  }

  // -------------------- ROLES API (fetch + set) --------------------
  loadRoles(opts?: { selectFirstIfNone?: boolean }) {
    const { selectFirstIfNone = true } = opts ?? {};

    console.log('[RoleManagement] loadRoles()');
    this.isLoading.set(true);
    this.error.set(null);

    this.api.getRoles().subscribe({
      next: (res: any) => {
        console.log('[RoleManagement] Loaded roles', res);
        const roles = this.normalizeRoles(res);
        this.roles.set(roles);

        // keep selection valid (helpful on first load / after deletions)
        const activeId = this.activeRoleId();
        const activeExists = !!activeId && res.data.some((r: any) => r.id === activeId);

        if (!activeExists) {
          this.activeRoleId.set(selectFirstIfNone && res.data.length ? res.data[0].id : null);
        }

        const detailsId = this.detailsRoleId();
        const detailsExists = !!detailsId && res.data.some((r: any) => r.id === detailsId);
        if (!detailsExists) this.detailsRoleId.set(null);

        this.isLoading.set(false);
      },
      error: (e) => {
        console.error('[RoleManagement] loadRoles failed', e);
        this.error.set(e?.message ?? 'Failed to load roles');
        this.isLoading.set(false);
      },
    });
  }

  // -------------------- APPLY PERMISSIONS (single save) --------------------
  updateRolePermissions(roleId: string, modulePermissions: Record<string, PermissionKey[]>) {
    console.log('[RoleManagement] Apply permissions (bulk):', { roleId, modulePermissions });
    this.error.set(null);

    const prev = this.roles();

    //  (optional) clean modulePermissions (remove empty arrays, ensure arrays)
    const cleaned: Record<string, PermissionKey[]> = Object.fromEntries(
      Object.entries(modulePermissions ?? {})
        .map(([k, v]) => [k, Array.isArray(v) ? v : []])
        .filter(([, v]) => v.length > 0)
    ) as Record<string, PermissionKey[]>;

    // optimistic UI update
    this.roles.update((list) =>
      list.map((r) =>
        r.id === roleId
          ? {
              ...r,
              modulePermissions: { ...cleaned },
            }
          : r
      )
    );

    this.api.updateRole(roleId, { modulePermissions: cleaned }).subscribe({
      next: (savedRes: any) => {
        //  normalize saved response (handles {data: role}, module_permissions, etc.)
        const saved = this.normalizeRole(savedRes);

        console.log('[RoleManagement] Saved permissions (bulk):', saved);

        // replace role with server version
        this.roles.update((list) => list.map((r) => (r.id === roleId ? saved : r)));
      },
      error: (e) => {
        console.error('[RoleManagement] updateRolePermissions failed (rollback)', e);
        this.roles.set(prev);
        this.error.set(e?.message ?? 'Failed to update permissions');
      },
    });
  }

  private normalizeRole(input: any): Role {
    const r = input?.data ?? input; // unwrap {data: ...} if present

    return {
      ...r,
      // ensure required fields exist in the exact names your UI uses
      id: r?.id ?? r?.roleId ?? r?.role_id,
      name: r?.name ?? '',
      description: r?.description ?? '',
      modulePermissions: (r?.modulePermissions ?? r?.module_permissions ?? {}) as Record<
        string,
        PermissionKey[]
      >,
    } as Role;
  }

  private normalizeRoles(input: any): Role[] {
    const arr = Array.isArray(input) ? input : input?.data ?? [];
    return (Array.isArray(arr) ? arr : []).map((x) => this.normalizeRole(x));
  }
}
