// src/app/role-management/role-management.page.ts
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, effect, inject } from '@angular/core';
import { RoleCardComponent } from './roles-card';
import { RoleDetailsPanelComponent } from './edit-role-details-panel';
import { CreateRoleDialogComponent } from './create-role-dialog';
import { RoleManagementStore } from '../role-management-store';
import { PermissionKey } from '../../models/roles.model';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, RoleCardComponent, RoleDetailsPanelComponent, CreateRoleDialogComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="mx-auto w-full max-w-7xl px-6 py-6">
        <!-- Header -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">Role Management</h1>
            <p class="mt-1 text-sm text-gray-600">Configure user roles and access permissions</p>
          </div>

          <button
            class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.99]"
            (click)="store.openCreateDialog()"
          >
            <span class="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/15">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            Create New Role
          </button>
        </div>

        <!-- Grid -->
        <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <app-role-card
            *ngFor="let role of store.roles(); trackBy: trackById"
            [role]="role"
            [modules]="store.modules()"
            [selected]="store.activeRoleId() === role.id"
            (edit)="onEdit($event)"
            (remove)="onDelete($event)"
            (click)="store.selectRole(role.id)"
          />
        </div>

        <!-- Details panel (screen 3) -->
        <div #detailsAnchor></div>

        <app-role-details-panel
          *ngIf="store.detailsRole() as detailsRole"
          [role]="detailsRole"
          [modules]="store.modules()"
          (close)="store.closeDetails()"
          (apply)="onApplyRolePermissions($event)"
        />

        <!-- Create dialog (screen 2) -->
        <app-create-role-dialog
          *ngIf="store.isCreateDialogOpen()"
          [modules]="store.modules()"
          (cancel)="store.closeCreateDialog()"
          (create)="onCreate($event)"
        />
      </div>
    </div>
  `,
})
export class RoleManagementPage {
  store = inject(RoleManagementStore);

  @ViewChild('detailsAnchor', { read: ElementRef }) detailsAnchor?: ElementRef<HTMLElement>;

  constructor() {
    // auto-scroll when detailsRoleId changes to non-null
    effect(() => {
      const id = this.store.detailsRoleId();
      if (!id) return;

      // allow DOM to paint
      setTimeout(() => {
        console.log('[RoleManagement] Auto-scroll to details panel');
        this.detailsAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });
  }

  ngOnInit() {
    this.store.init();
  }

  trackById = (_: number, r: { id: string }) => r.id;

  onEdit(roleId: string) {
    this.store.openDetails(roleId);
  }

  onDelete(roleId: string) {
    const ok = window.confirm('Delete this role?');
    if (!ok) return;
    this.store.deleteRole(roleId);
  }

  onCreate(payload: { name: string; description: string; modulePermissions: any }) {
    this.store.createRole(payload);
    this.store.closeCreateDialog();
  }

  onApplyRolePermissions(e: {
    roleId: string;
    modulePermissions: Record<string, PermissionKey[]>;
  }) {
    // one API call / one store update
    this.store.updateRolePermissions(e.roleId, e.modulePermissions);
  }
}
