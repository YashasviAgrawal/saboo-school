import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getEnquiries } from "@/lib/content";

export const dynamic = "force-dynamic";

// Spreadsheet apps run text that starts with = + - @ as a formula, so defuse those cells.
const cell = (v: string) => {
  const s = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET() {
  if (!(await isAdmin())) return new NextResponse("Not signed in.", { status: 401 });
  const rows = await getEnquiries();
  const head = ["Received", "Parent", "Phone", "Child", "Class", "Message", "Status"];
  const csv = [head.map(cell).join(",")]
    .concat(rows.map((r) => [r.createdAt, r.parent, r.phone, r.child, r.cls, r.message, r.status].map((v) => cell(String(v ?? ""))).join(",")))
    .join("\r\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
