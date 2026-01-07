// src/app/role-management/role-card.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleConfig, Role } from '../../models/roles.model';

@Component({
  selector: 'app-role-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="rounded-2xl border border-gray-200 bg-white shadow-sm transition flex flex-col"
      [class.border-blue-500]="selected"
      [class.ring-2]="selected"
      [class.ring-blue-200]="selected"
      style="height: 420px;"
    >
      <!-- Top content (non-scroll) -->
      <div class="p-6">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-4">
            <div
              class="h-12 w-12 rounded-2xl flex items-center justify-center"
              [ngClass]="shieldBg(role.accent)"
            >
              <svg
                class="h-6 w-6"
                [ngClass]="shieldFg(role.accent)"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ role.name }}</h3>
                <span
                  *ngIf="role.badge"
                  class="rounded-full border px-2 py-0.5 text-xs font-medium"
                  [ngClass]="badgeClass(role)"
                >
                  {{ role.badge }}
                </span>
              </div>

              <p class="mt-1 text-sm text-gray-600">{{ role.description }}</p>

              <div class="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                    stroke="currentColor"
                    stroke-width="1.6"
                  />
                  <path
                    d="M9 11a4 4 0 100-8 4 4 0 000 8z"
                    stroke="currentColor"
                    stroke-width="1.6"
                  />
                  <path d="M22 21v-2a4 4 0 00-3-3.87" stroke="currentColor" stroke-width="1.6" />
                  <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.6" />
                </svg>
                <span class="font-medium text-gray-800">{{ role.users.length }}</span>
                <span>users assigned</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-5 text-gray-600">
            <button
              class="icon-btn"
              (click)="edit.emit(role.id)"
              title="Edit permissions"
              type="button"
            >
              <i class="bi bi-pencil-square text-[18px] leading-none"></i>
            </button>

            <button
              class="icon-btn"
              (click)="remove.emit(role.id)"
              title="Delete role"
              type="button"
            >
              <i class="bi bi-trash3 text-[18px] leading-none"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="px-6">
        <div class="h-px bg-gray-200"></div>
      </div>

      <!-- ACCESS LEVEL header (sticky inside card) -->
      <div class="px-6 pt-4">
        <div class="text-xs tracking-wider text-gray-500">ACCESS LEVEL</div>
      </div>

      <!--  Scrollable area only -->
      <div class="px-6 pb-6 my-3 flex-1 overflow-auto">
        <div class="space-y-2">
          <div *ngFor="let m of modules" class="flex items-center justify-between gap-4">
            <div class="text-sm text-gray-800">{{ m.name }}</div>

            <ng-container *ngIf="count(role, m.id) > 0; else none">
              <span
                class="rounded-full border px-2.5 py-1 text-xs font-medium"
                [ngClass]="chipClass(role)"
              >
                {{ count(role, m.id) }} permissions
              </span>
            </ng-container>

            <ng-template #none>
              <span
                class="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-400"
              >
                0 permissions
              </span>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RoleCardComponent {
  @Input({ required: true }) role!: Role;
  @Input({ required: true }) modules: ModuleConfig[] = [];
  @Input() selected = false;

  @Output() edit = new EventEmitter<string>();
  @Output() copy = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  count(role: Role, moduleId: string) {
    return role.modulePermissions[moduleId]?.length ?? 0;
  }

  shieldBg(accent: Role['accent']) {
    return accent === 'red'
      ? 'bg-red-50'
      : accent === 'blue'
      ? 'bg-blue-50'
      : accent === 'yellow'
      ? 'bg-yellow-50'
      : accent === 'purple'
      ? 'bg-purple-50'
      : 'bg-green-50';
  }

  shieldFg(accent: Role['accent']) {
    return accent === 'red'
      ? 'text-red-500'
      : accent === 'blue'
      ? 'text-blue-500'
      : accent === 'yellow'
      ? 'text-yellow-500'
      : accent === 'purple'
      ? 'text-purple-500'
      : 'text-green-600';
  }

  chipClass(role: Role) {
    return role.accent === 'red'
      ? 'border-red-200 bg-red-50 text-red-600'
      : role.accent === 'blue'
      ? 'border-blue-200 bg-blue-50 text-blue-600'
      : 'border-green-200 bg-green-50 text-green-700';
  }

  badgeClass(role: Role) {
    return role.accent === 'red'
      ? 'border-red-200 bg-red-50 text-red-700'
      : role.accent === 'blue'
      ? 'border-blue-200 bg-blue-50 text-blue-700'
      : 'border-green-200 bg-green-50 text-green-800';
  }
}
