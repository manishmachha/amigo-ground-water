import { UserDto } from './user.model';

export type PermissionKey = 'view' | 'create' | 'edit' | 'approve' | 'reject' | 'delete';

export interface ModuleConfig {
  id: string;
  name: string;
  permissions: PermissionKey[];
}

export interface Role {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  deletedAt: string;
  name: string;
  description: string;
  modulePermissions: Record<string, PermissionKey[]>;
  badge: string | null;
  accent: string;
  users: UserDto[];
}

export const PERMISSION_LABEL: Record<PermissionKey, string> = {
  view: 'View',
  create: 'Create',
  edit: 'Edit',
  approve: 'Approve',
  reject: 'Reject',
  delete: 'Delete',
};
