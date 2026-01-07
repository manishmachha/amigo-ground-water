// src/app/role-management/role-details-panel.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ModuleConfig, PermissionKey, PERMISSION_LABEL, Role } from '../../models/roles.model';

type ModulePerms = Record<string, PermissionKey[]>;

@Component({
  selector: 'app-role-details-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ role.name }} - Detailed Permissions
          </h2>

          <p *ngIf="isDirty" class="mt-1 text-xs font-medium text-blue-600">
            You have unsaved changes
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            [disabled]="!isDirty"
            (click)="applyChanges()"
          >
            Apply
          </button>

          <button
            class="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            (click)="close.emit()"
          >
            Close
          </button>
        </div>
      </div>

      <div class="mt-6 space-y-5">
        <div *ngFor="let m of modules" class="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-sm font-semibold text-gray-900">{{ m.name }}</div>
              <div class="mt-1 text-sm text-gray-600">
                {{ grantedDraft(m.id) }} of {{ m.permissions.length }} permissions granted
              </div>
            </div>

            <!-- module toggle (LOCAL only) -->
            <button
              type="button"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition"
              [class.bg-gray-900]="isEnabledDraft(m.id)"
              [class.bg-gray-300]="!isEnabledDraft(m.id)"
              (click)="toggleModuleLocal(m)"
              aria-label="Toggle module"
            >
              <span
                class="inline-block h-5 w-5 transform rounded-full bg-white transition"
                [class.translate-x-5]="isEnabledDraft(m.id)"
                [class.translate-x-1]="!isEnabledDraft(m.id)"
              ></span>
            </button>
          </div>

          <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <button
              *ngFor="let p of m.permissions"
              type="button"
              class="flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition"
              [ngClass]="pillClass(isGrantedDraft(m.id, p))"
              (click)="togglePermissionLocal(m.id, p)"
            >
              <span class="flex items-center gap-2">
                <svg
                  *ngIf="isGrantedDraft(m.id, p)"
                  class="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ labels[p] }}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RoleDetailsPanelComponent implements OnChanges {
  @Input({ required: true }) role!: Role;
  @Input({ required: true }) modules: ModuleConfig[] = [];

  @Output() close = new EventEmitter<void>();

  //  single emit on Apply
  @Output() apply = new EventEmitter<{ roleId: string; modulePermissions: ModulePerms }>();

  labels = PERMISSION_LABEL;

  private draft = new Map<string, Set<PermissionKey>>();
  private initialSnapshot = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['role']) {
      this.resetDraftFromRole();
    }
  }

  // ---------- Dirty state ----------
  get isDirty(): boolean {
    return this.snapshot(this.toModulePerms()) !== this.initialSnapshot;
  }

  // ---------- Draft initialization ----------
  private resetDraftFromRole() {
    this.draft.clear();

    const mp = (this.role?.modulePermissions ?? {}) as ModulePerms;

    for (const [moduleId, perms] of Object.entries(mp)) {
      if (Array.isArray(perms) && perms.length > 0) {
        this.draft.set(moduleId, new Set(perms));
      }
    }

    this.initialSnapshot = this.snapshot(this.toModulePerms());
  }

  // ---------- UI reads from DRAFT ----------
  isEnabledDraft(moduleId: string): boolean {
    return (this.draft.get(moduleId)?.size ?? 0) > 0;
  }

  isGrantedDraft(moduleId: string, permission: PermissionKey): boolean {
    return this.draft.get(moduleId)?.has(permission) ?? false;
  }

  grantedDraft(moduleId: string): number {
    return this.draft.get(moduleId)?.size ?? 0;
  }

  // ---------- Local toggles (NO emit here) ----------
  toggleModuleLocal(m: ModuleConfig) {
    const moduleId = m.id;

    // If currently enabled -> clear all
    if (this.isEnabledDraft(moduleId)) {
      this.draft.delete(moduleId);
      return;
    }

    // If disabled -> enable all permissions
    this.draft.set(moduleId, new Set(m.permissions));
  }

  togglePermissionLocal(moduleId: string, permission: PermissionKey) {
    let set = this.draft.get(moduleId);
    if (!set) {
      set = new Set<PermissionKey>();
      this.draft.set(moduleId, set);
    }

    if (set.has(permission)) set.delete(permission);
    else set.add(permission);

    // Keep object clean
    if (set.size === 0) this.draft.delete(moduleId);
  }

  // ---------- Apply once ----------
  applyChanges() {
    const modulePermissions = this.toModulePerms();
    this.apply.emit({ roleId: this.role.id, modulePermissions });

    // Mark as saved locally (disables Apply)
    this.initialSnapshot = this.snapshot(modulePermissions);
  }

  // ---------- Serialize draft ----------
  private toModulePerms(): ModulePerms {
    const out: ModulePerms = {};
    for (const [moduleId, set] of this.draft.entries()) {
      out[moduleId] = Array.from(set).sort();
    }
    return out;
  }

  private snapshot(mp: ModulePerms): string {
    const keys = Object.keys(mp).sort();
    const stable: ModulePerms = {};
    for (const k of keys) stable[k] = [...mp[k]].sort();
    return JSON.stringify(stable);
  }

  pillClass(granted: boolean) {
    return granted
      ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50';
  }
}
