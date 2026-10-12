import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "sps_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

export const adminEnabled = () => Boolean(process.env.ADMIN_PASSWORD);

const secret = () => process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "";
const sign = (p: string) => crypto.createHmac("sha256", secret()).update(p).digest("base64url");

export function createToken() {
  const exp = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token: string | undefined) {
  if (!token || !adminEnabled()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const good = sign(exp);
  const a = Buffer.from(sig);
  const b = Buffer.from(good);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(exp) > Date.now();
}

export async function isAdmin() {
  const c = await cookies();
  return verifyToken(c.get(ADMIN_COOKIE)?.value);
}

export function checkPassword(input: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};

/** Reject cross-site browser requests. Requests with no Origin header (curl) still need the cookie. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}
