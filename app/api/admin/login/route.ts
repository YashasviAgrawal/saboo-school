import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminEnabled, checkPassword, clientIp, cookieOptions, createToken, sameOrigin } from "@/lib/auth";
import { rateLimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!adminEnabled()) return NextResponse.json({ ok: false, error: "Admin is not configured. Set ADMIN_PASSWORD." }, { status: 503 });
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Request blocked." }, { status: 403 });
  if (!rateLimit(`login:${clientIp(req)}`, 6, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }
  let password = "";
  try {
    password = String((await req.json()).password ?? "");
  } catch {}
  if (!checkPassword(password)) return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createToken(), cookieOptions);
  return res;
}
