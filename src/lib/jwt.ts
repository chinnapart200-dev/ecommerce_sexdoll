const DEFAULT_JWT_SECRET = "dev-secret-change-me";

export type JwtPayload = Record<string, unknown> & {
  sub?: string;
  iat?: number;
  exp?: number;
};

export type JwtOptions = {
  secret?: string;
  expiresInSeconds?: number;
};

function getJwtSecret(secret?: string) {
  return secret ?? process.env.JWT_SECRET ?? process.env.AUTH_JWT_SECRET ?? DEFAULT_JWT_SECRET;
}

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

async function importHmacKey(secret: string) {
  const encodedSecret = new TextEncoder().encode(secret);
  return crypto.subtle.importKey("raw", encodedSecret, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function signData(data: string, secret: string) {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return encodeBase64Url(String.fromCharCode(...new Uint8Array(signature)));
}

async function verifySignature(data: string, signature: string, secret: string) {
  const key = await importHmacKey(secret);
  const normalizedSignature = decodeBase64Url(signature);

  if (!normalizedSignature) {
    return false;
  }

  const signatureBytes = Uint8Array.from(normalizedSignature, (char) => char.charCodeAt(0));
  return crypto.subtle.verify("HMAC", key, signatureBytes, new TextEncoder().encode(data));
}

export async function signJwt(payload: JwtPayload, options: JwtOptions = {}) {
  const secret = getJwtSecret(options.secret);
  const header = {
    alg: "HS256",
    typ: "JWT",
  };
  const now = Math.floor(Date.now() / 1000);
  const expiresInSeconds = options.expiresInSeconds ?? 60 * 60 * 24 * 7;
  const body: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = encodeBase64Url(JSON.stringify(header));
  const encodedPayload = encodeBase64Url(JSON.stringify(body));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = await signData(data, secret);

  return `${data}.${signature}`;
}

export async function verifyJwt<T extends JwtPayload = JwtPayload>(token: string, options: JwtOptions = {}) {
  if (!token) {
    return null;
  }

  const secret = getJwtSecret(options.secret);
  const [encodedHeader, encodedPayload, signature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !signature) {
    return null;
  }

  const data = `${encodedHeader}.${encodedPayload}`;
  const isValid = await verifySignature(data, signature, secret);

  if (!isValid) {
    return null;
  }

  const payloadJson = decodeBase64Url(encodedPayload);
  if (!payloadJson) {
    return null;
  }

  try {
    const payload = JSON.parse(payloadJson) as T;
    if (typeof payload.exp === "number" && payload.exp * 1000 <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function decodeJwtPayload(token: string) {
  const payload = token.split(".")[1];
  if (!payload) return null;

  const decoded = decodeBase64Url(payload);
  if (!decoded) return null;

  try {
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

