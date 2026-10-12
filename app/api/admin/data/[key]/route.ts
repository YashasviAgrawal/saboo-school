import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAdmin, sameOrigin } from "@/lib/auth";
import { collectionMap, sanitizeObject, slugify } from "@/lib/schema";
import { readJSON, writeJSON } from "@/lib/store";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ key: string }> };
type Row = Record<string, unknown>;

const err = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function GET(_req: Request, ctx: Ctx) {
  if (!(await isAdmin())) return err("Not signed in.", 401);
  const { key } = await ctx.params;
  const def = collectionMap[key];
  if (!def) return err("Unknown collection.", 404);
  const value = await readJSON<unknown>(key, def.defaults);
  return NextResponse.json({ ok: true, value: def.kind === "single" ? { ...(def.defaults as object), ...(value as object) } : value });
}

export async function PUT(req: Request, ctx: Ctx) {
  if (!sameOrigin(req)) return err("Request blocked.", 403);
  if (!(await isAdmin())) return err("Not signed in.", 401);
  const { key } = await ctx.params;
  const def = collectionMap[key];
  if (!def) return err("Unknown collection.", 404);

  let body: { value?: unknown; items?: unknown; knownIds?: unknown };
  try {
    body = await req.json();
  } catch {
    return err("Invalid request.", 400);
  }

  if (def.kind === "single") {
    if (!body.value || typeof body.value !== "object") return err("Missing value.", 400);
    const current = (await readJSON<Row>(key, def.defaults as Row)) as Row;
    const clean = sanitizeObject(def, body.value as Row, current);
    await writeJSON(key, clean);
    return NextResponse.json({ ok: true, value: clean });
  }

  if (!Array.isArray(body.items) || body.items.length > 2000) return err("Invalid items.", 400);
  const current = (await readJSON<Row[]>(key, def.defaults as Row[])) as Row[];
  const byId = new Map(current.map((r) => [String(r.id), r]));
  const incoming = body.items as Row[];

  // Rows that are not added by admins (enquiries) can be updated or deleted but never created here.
  // Rows that arrived after the admin loaded the page are kept, so nothing is lost on save.
  const known = new Set(Array.isArray(body.knownIds) ? (body.knownIds as unknown[]).map(String) : []);
  const seen = new Set<string>();
  const out: Row[] = [];

  for (const raw of incoming) {
    const rawId = typeof raw.id === "string" && /^[\w-]{1,60}$/.test(raw.id) ? raw.id : "";
    const existing = rawId ? byId.get(rawId) : undefined;
    if (!def.canAdd && !existing) continue;
    const id = rawId || randomUUID();
    if (seen.has(id)) continue;
    seen.add(id);
    const clean = sanitizeObject(def, raw, existing);
    out.push({ id, ...clean });
  }

  if (!def.canAdd) {
    for (const r of current) {
      const id = String(r.id);
      if (!seen.has(id) && !known.has(id)) out.unshift(r);
    }
  }

  if (key === "events") {
    const used = new Set<string>();
    for (const e of out) {
      let base = slugify(String(e.slug || e.title)) || "event";
      let slug = base;
      let i = 2;
      while (used.has(slug)) slug = `${base}-${i++}`;
      used.add(slug);
      e.slug = slug;
    }
  }

  await writeJSON(key, out);
  return NextResponse.json({ ok: true, value: out });
}
