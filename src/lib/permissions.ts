import type { UserRole } from "@/types/user";

export type PermissionScope =
  | "account:read"
  | "account:write"
  | "address:read"
  | "address:write"
  | "order:read"
  | "order:write"
  | "payment:read"
  | "payment:write"
  | "admin:read"
  | "admin:write";

export type PermissionContext = {
  role?: UserRole | null;
  authenticated?: boolean;
};

const rolePermissions: Record<UserRole, PermissionScope[]> = {
  customer: [
    "account:read",
    "account:write",
    "address:read",
    "address:write",
    "order:read",
    "payment:read",
    "payment:write",
  ],
  admin: [
    "account:read",
    "account:write",
    "address:read",
    "address:write",
    "order:read",
    "order:write",
    "payment:read",
    "payment:write",
    "admin:read",
    "admin:write",
  ],
};

export function canAccessPermission(context: PermissionContext, permission: PermissionScope) {
  if (!context.authenticated || !context.role) {
    return false;
  }

  return rolePermissions[context.role].includes(permission);
}

export function canAccessAny(context: PermissionContext, permissions: PermissionScope[]) {
  return permissions.some((permission) => canAccessPermission(context, permission));
}

export function canAccessAll(context: PermissionContext, permissions: PermissionScope[]) {
  return permissions.every((permission) => canAccessPermission(context, permission));
}

export function hasAdminAccess(context: PermissionContext) {
  return canAccessAny(context, ["admin:read", "admin:write"]);
}

export function hasAccountAccess(context: PermissionContext) {
  return canAccessAny(context, ["account:read", "account:write"]);
}

export function hasOrderAccess(context: PermissionContext) {
  return canAccessAny(context, ["order:read", "order:write"]);
}

export function hasPaymentAccess(context: PermissionContext) {
  return canAccessAny(context, ["payment:read", "payment:write"]);
}

export function getPermissionsForRole(role: UserRole) {
  return [...rolePermissions[role]];
}

export function getDefaultPermissionContext(role?: UserRole | null, authenticated = false): PermissionContext {
  return {
    role,
    authenticated,
  };
}

