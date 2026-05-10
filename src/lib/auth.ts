import type { AuthSession, PublicUser, User, UserRole, UserStatus } from "@/types/user";

const activeStatuses: UserStatus[] = ["active"];

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function sanitizeUser(user: User): PublicUser {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

export function getUserDisplayName(user: Pick<User, "firstName" | "lastName">) {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function isActiveUser(user?: Pick<User, "status"> | null) {
  if (!user) return false;
  return activeStatuses.includes(user.status);
}

export function isCustomerUser(user?: Pick<User, "role"> | null) {
  return user?.role === "customer";
}

export function isAdminUser(user?: Pick<User, "role"> | null) {
  return user?.role === "admin";
}

export function hasRole(user: Pick<User, "role"> | null | undefined, roles: UserRole | UserRole[]) {
  if (!user) return false;

  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(user.role);
}

export function isSessionExpired(session?: Pick<AuthSession, "expiresAt"> | null) {
  if (!session) return true;

  const expiresAt = new Date(session.expiresAt).getTime();
  if (Number.isNaN(expiresAt)) {
    return true;
  }

  return expiresAt <= Date.now();
}

export function isSessionActive(session?: Pick<AuthSession, "expiresAt"> | null) {
  return !isSessionExpired(session);
}

export function canAccessAccount(user?: Pick<User, "status" | "role"> | null) {
  return Boolean(user && isActiveUser(user));
}

export function canAccessAdmin(user?: Pick<User, "status" | "role"> | null) {
  return Boolean(user && isActiveUser(user) && isAdminUser(user));
}

export function buildAuthSession(user: Pick<User, "id" | "email" | "role">, expiresAt: string): AuthSession {
  return {
    id: `session_${user.id}_${Date.now()}`,
    userId: user.id,
    email: normalizeEmail(user.email),
    role: user.role,
    expiresAt,
  };
}

