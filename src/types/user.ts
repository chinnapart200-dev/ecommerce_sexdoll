export type UserRole = "customer" | "admin";
export type UserStatus = "active" | "inactive" | "suspended";

export type User = {
  id: number;
  email: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type AuthSession = {
  id: string;
  userId: number;
  email: string;
  role: UserRole;
  expiresAt: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
};

export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string | null;
};

export type PublicUser = Omit<User, "passwordHash">;

