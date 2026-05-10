import type { AuthSession } from "@/types/user";

export const SESSION_COOKIE_NAME = "woodmart_session";
export const SESSION_STORAGE_KEY = "woodmart-session";
export const SESSION_TTL_DAYS = 7;
export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_DAYS * 24 * 60 * 60;

type SessionTokenPayload = AuthSession & {
  issuedAt: string;
};

function encodeBase64Url(value: string) {
  const base64 =
    typeof Buffer !== "undefined"
      ? Buffer.from(value, "utf8").toString("base64")
      : btoa(unescape(encodeURIComponent(value)));

  return base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeBase64Url(value: string) {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padding = base64.length % 4;
  const normalized = padding ? `${base64}${"=".repeat(4 - padding)}` : base64;

  try {
    return typeof Buffer !== "undefined"
      ? Buffer.from(normalized, "base64").toString("utf8")
      : decodeURIComponent(escape(atob(normalized)));
  } catch {
    return null;
  }
}

export function createSessionExpiresAt(days = SESSION_TTL_DAYS) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export function createSessionToken(session: AuthSession) {
  const payload: SessionTokenPayload = {
    ...session,
    issuedAt: new Date().toISOString(),
  };

  return encodeBase64Url(JSON.stringify(payload));
}

export function parseSessionToken(token: string): AuthSession | null {
  if (!token) return null;

  try {
    const decoded = decodeBase64Url(token);
    if (!decoded) {
      return null;
    }

    const payload = JSON.parse(decoded) as Partial<SessionTokenPayload>;

    if (
      typeof payload.id !== "string" ||
      typeof payload.userId !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string" ||
      typeof payload.expiresAt !== "string"
    ) {
      return null;
    }

    return {
      id: payload.id,
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      expiresAt: payload.expiresAt,
    };
  } catch {
    return null;
  }
}

export function isSessionExpired(session?: Pick<AuthSession, "expiresAt"> | null) {
  if (!session) return true;

  const expiresAt = new Date(session.expiresAt).getTime();
  if (Number.isNaN(expiresAt)) {
    return true;
  }

  return expiresAt <= Date.now();
}

export function isSessionValid(session?: Pick<AuthSession, "expiresAt"> | null) {
  return !isSessionExpired(session);
}

export function createSessionCookie(session: AuthSession) {
  const token = createSessionToken(session);

  return [
    `${SESSION_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`,
  ].join("; ");
}

export function clearSessionCookie() {
  return [
    `${SESSION_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ].join("; ");
}

export function getSessionStorageKey() {
  return SESSION_STORAGE_KEY;
}

