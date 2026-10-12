import { NextResponse } from "next/server";
import { getTcRecords } from "@/lib/content";
import { rateLimit } from "@/lib/ratelimit";
import { clientIp, sameOrigin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Request blocked." }, { status: 403 });
  if (!rateLimit(`tc:${clientIp(req)}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const tc = String(body.tcNumber ?? "").trim().toLowerCase();
  const dob = String(body.dob ?? "").trim();
  if (!tc || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    return NextResponse.json({ ok: false, error: "Enter the TC number and date of birth." }, { status: 400 });
  }
  const records = await getTcRecords();
  const hit = records.find((r) => r.tcNumber.trim().toLowerCase() === tc && r.dob === dob);
  if (!hit) return NextResponse.json({ ok: true, found: false });
  return NextResponse.json({
    ok: true,
    found: true,
    record: {
      tcNumber: hit.tcNumber,
      studentName: hit.studentName,
      className: hit.className,
      issueDate: hit.issueDate,
      fileUrl: hit.fileUrl,
    },
  });
}
