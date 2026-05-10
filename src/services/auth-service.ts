import { createHash, timingSafeEqual } from "crypto";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { sanitizeUser } from "@/lib/auth";
import { pool } from "@/lib/db";
import { createSessionCookie, createSessionExpiresAt, clearSessionCookie, parseSessionToken } from "@/lib/session";
import { query, queryFirst } from "@/lib/mysql";
import { validateLogin, validateRegister } from "@/lib/validators";
import type { LoginFormValues, PublicUser, RegisterFormValues, User } from "@/types/user";

type UserRow = RowDataPacket & {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: "customer" | "admin";
  status: "active" | "inactive" | "suspended";
  created_at: Date;
  updated_at: Date;
};

type AuthOk<T> = {
  ok: true;
  data: T;
  message?: string;
};

type AuthFail = {
  ok: false;
  message: string;
  errors?: Record<string, string>;
};

export type AuthResult<T> = AuthOk<T> | AuthFail;

export type AuthPayload = {
  user: PublicUser;
  sessionCookie: string;
};

function toUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    avatarUrl: row.avatar_url,
    role: row.role,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password, "utf8").digest("hex");
}

export function verifyPassword(password: string, passwordHash: string) {
  const expected = Buffer.from(passwordHash, "hex");
  const actual = Buffer.from(hashPassword(password), "hex");

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

async function findUserByEmail(email: string) {
  return queryFirst<UserRow>(
    `
      SELECT
        id,
        email,
        password_hash,
        first_name,
        last_name,
        phone,
        avatar_url,
        role,
        status,
        created_at,
        updated_at
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email]
  );
}

export async function findUserById(id: number) {
  return queryFirst<UserRow>(
    `
      SELECT
        id,
        email,
        password_hash,
        first_name,
        last_name,
        phone,
        avatar_url,
        role,
        status,
        created_at,
        updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `,
    [id]
  );
}

export async function listUsers() {
  const rows = await query<UserRow>(
    `
      SELECT
        id,
        email,
        password_hash,
        first_name,
        last_name,
        phone,
        avatar_url,
        role,
        status,
        created_at,
        updated_at
      FROM users
      ORDER BY created_at DESC, id DESC
    `
  );

  return rows.map(toUser);
}

export async function getPublicUserByEmail(email: string) {
  const user = await findUserByEmail(email);
  return user ? sanitizeUser(toUser(user)) : null;
}

export async function getPublicUserById(id: number) {
  const user = await findUserById(id);
  return user ? sanitizeUser(toUser(user)) : null;
}

export async function loginUser(values: Partial<LoginFormValues>): Promise<AuthResult<AuthPayload>> {
  const validation = validateLogin(values);
  if (!validation.valid) {
    return {
      ok: false,
      message: "Invalid login data.",
      errors: validation.errors,
    };
  }

  const email = values.email?.trim().toLowerCase() ?? "";
  const password = values.password ?? "";
  const row = await findUserByEmail(email);

  if (!row) {
    return {
      ok: false,
      message: "Invalid email or password.",
    };
  }

  if (row.status !== "active") {
    return {
      ok: false,
      message: "Your account is not active.",
    };
  }

  if (!verifyPassword(password, row.password_hash)) {
    return {
      ok: false,
      message: "Invalid email or password.",
    };
  }

  const user = sanitizeUser(toUser(row));
  const expiresAt = createSessionExpiresAt();

  return {
    ok: true,
    data: {
      user,
      sessionCookie: createSessionCookie({
        id: `session_${user.id}_${Date.now()}`,
        userId: user.id,
        email: user.email,
        role: user.role,
        expiresAt,
      }),
    },
  };
}

export async function registerUser(values: Partial<RegisterFormValues>): Promise<AuthResult<AuthPayload>> {
  const validation = validateRegister(values);
  if (!validation.valid) {
    return {
      ok: false,
      message: "Invalid registration data.",
      errors: validation.errors,
    };
  }

  const email = values.email?.trim().toLowerCase() ?? "";
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return {
      ok: false,
      message: "Email is already registered.",
      errors: {
        email: "Email is already registered.",
      },
    };
  }

  const now = new Date();
  const passwordHash = hashPassword(values.password ?? "");

  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO users (
        email,
        password_hash,
        first_name,
        last_name,
        phone,
        avatar_url,
        role,
        status,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, NULL, 'customer', 'active', ?, ?)
    `,
    [
      email,
      passwordHash,
      values.firstName?.trim() ?? "",
      values.lastName?.trim() ?? "",
      values.phone?.trim() || null,
      now,
      now,
    ]
  );

  const user = {
    id: result.insertId,
    email,
    firstName: values.firstName?.trim() ?? "",
    lastName: values.lastName?.trim() ?? "",
    phone: values.phone?.trim() || null,
    avatarUrl: null,
    role: "customer" as const,
    status: "active" as const,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    passwordHash,
  };

  const publicUser = sanitizeUser(user);
  const expiresAt = createSessionExpiresAt();

  return {
    ok: true,
    data: {
      user: publicUser,
      sessionCookie: createSessionCookie({
        id: `session_${publicUser.id}_${Date.now()}`,
        userId: publicUser.id,
        email: publicUser.email,
        role: publicUser.role,
        expiresAt,
      }),
    },
    message: "Account created successfully.",
  };
}

export function logoutUser() {
  return {
    ok: true as const,
    sessionCookie: clearSessionCookie(),
  };
}

export async function getCurrentUserFromSessionToken(token: string) {
  const session = parseSessionToken(token);
  if (!session) {
    return null;
  }

  const user = await findUserById(session.userId);
  return user ? sanitizeUser(toUser(user)) : null;
}
