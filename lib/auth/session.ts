import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "cuitbca_session";
const OAUTH_STATE_COOKIE_NAME = "cuitbca_oauth_state";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const OAUTH_STATE_TTL_SECONDS = 60 * 10;

export type SessionUser = {
  id: number;
  login: string;
  name: string | null;
  avatarUrl: string | null;
};

type SessionPayload = {
  user: SessionUser;
  iat: number;
  exp: number;
};

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is required");
  }
  return secret;
}

function isProd() {
  return process.env.NODE_ENV === "production";
}

function encodeBase64Url(input: string) {
  return Buffer.from(input, "utf8").toString("base64url");
}

function decodeBase64Url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signValue(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}

export function issueSessionToken(user: SessionUser) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + SESSION_TTL_SECONDS;
  const payload: SessionPayload = { user, iat, exp };
  const encoded = encodeBase64Url(JSON.stringify(payload));
  const signature = signValue(encoded);
  return `${encoded}.${signature}`;
}

export function parseSessionToken(token: string): SessionPayload | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expectedSignature = signValue(encoded);
  if (!safeEqual(signature, expectedSignature)) return null;

  try {
    const parsed = JSON.parse(decodeBase64Url(encoded)) as SessionPayload;
    if (parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function readSessionFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return parseSessionToken(token);
}

export async function setSessionCookie(user: SessionUser) {
  const token = issueSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd(),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd(),
    path: "/",
    expires: new Date(0),
  });
}

export async function issueOAuthState() {
  const state = randomBytes(24).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(OAUTH_STATE_COOKIE_NAME, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd(),
    path: "/",
    maxAge: OAUTH_STATE_TTL_SECONDS,
  });
  return state;
}

export async function consumeOAuthState(expectedState: string) {
  const cookieStore = await cookies();
  const savedState = cookieStore.get(OAUTH_STATE_COOKIE_NAME)?.value;
  cookieStore.set(OAUTH_STATE_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd(),
    path: "/",
    expires: new Date(0),
  });

  if (!savedState || !expectedState) return false;
  return safeEqual(savedState, expectedState);
}
