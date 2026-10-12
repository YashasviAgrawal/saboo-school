import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { updateJSON } from "@/lib/store";
import { rateLimit } from "@/lib/ratelimit";
import { clientIp, sameOrigin } from "@/lib/auth";
import { CLASS_OPTIONS } from "@/lib/classes";
import type { Enquiry } from "@/lib/types";

export const dynamic = "force-dynamic";

const bad = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return bad("Request blocked.", 403);
  if (!rateLimit(`enq:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return bad("Too many enquiries from this connection. Please call the school office.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const parent = String(body.parent ?? "").trim().slice(0, 100);
  const phone = String(body.phone ?? "").trim().slice(0, 20);
  const child = String(body.child ?? "").trim().slice(0, 100);
  const cls = String(body.cls ?? "");
  const message = String(body.message ?? "").trim().slice(0, 1000);

  if (parent.length < 2) return bad("Please enter the parent's name.");
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 13) return bad("Please enter a valid phone number.");
  if (!CLASS_OPTIONS.includes(cls)) return bad("Please choose a class.");

  const item: Enquiry = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    parent,
    phone,
    child,
    cls,
    message,
    status: "new",
  };

  try {
    await updateJSON<Enquiry[]>("enquiries", [], (cur) => [item, ...cur].slice(0, 3000));
  } catch {
    return bad("We could not save your enquiry. Please call the school office.", 500);
  }

  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "admission_enquiry", ...item }),
        signal: AbortSignal.timeout(4000),
      });
    } catch {
      /* the enquiry is already saved; a failed webhook must not fail the visitor */
    }
  }

  return NextResponse.json({ ok: true });
}
