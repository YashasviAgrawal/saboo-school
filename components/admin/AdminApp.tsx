"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Field } from "@/lib/schema";
import { Img } from "@/components/Img";
import { Icon } from "@/components/Icon";

type Meta = {
  key: string;
  label: string;
  description: string;
  kind: "list" | "single";
  titleField: string;
  fields: Field[];
  canAdd: boolean;
  canDelete: boolean;
};
type Row = Record<string, unknown>;

const blankFor = (f: Field): unknown => (f.type === "boolean" ? true : f.type === "lines" ? [] : f.type === "select" ? f.options?.[0] ?? "" : f.type === "color" ? "#0b6b42" : "");

function FieldInput({ f, value, onChange, id }: { f: Field; value: unknown; onChange: (v: unknown) => void; id: string }) {
  if (f.readonly) {
    const txt = f.name === "createdAt" && typeof value === "string" ? new Date(value).toLocaleString("en-IN") : String(value ?? "");
    return <p id={id} className="whitespace-pre-wrap rounded-xl bg-brand-50 px-3 py-2 text-sm">{txt || "-"}</p>;
  }
  switch (f.type) {
    case "boolean":
      return (
        <label className="inline-flex cursor-pointer items-center gap-3">
          <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[#0b6b42]" />
          <span className="text-sm text-muted">{value ? "Yes" : "No"}</span>
        </label>
      );
    case "textarea":
      return <textarea id={id} className="input min-h-[140px]" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} maxLength={f.max ?? 8000} />;
    case "lines":
      return <textarea id={id} className="input min-h-[110px]" value={Array.isArray(value) ? (value as string[]).join("\n") : String(value ?? "")} onChange={(e) => onChange(e.target.value.split("\n"))} />;
    case "select":
      return (
        <select id={id} className="input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {f.options?.map((o) => (<option key={o} value={o}>{o}</option>))}
        </select>
      );
    case "date":
      return <input id={id} type="date" className="input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
    case "color":
      return (
        <div className="flex items-center gap-3">
          <input id={id} type="color" value={String(value || "#0b6b42")} onChange={(e) => onChange(e.target.value)} className="h-11 w-16 cursor-pointer rounded-lg border border-line bg-white p-1" />
          <span className="text-sm text-muted">{String(value)}</span>
        </div>
      );
    case "image":
    case "url":
      return (
        <div className="grid gap-2">
          <input id={id} type="text" inputMode="url" placeholder="https://..." className="input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
          {f.type === "image" && Boolean(value) && <Img src={String(value)} alt="Preview" className="h-28 w-40 rounded-xl border border-line" label="?" />}
        </div>
      );
    default:
      return <input id={id} type="text" className="input" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} maxLength={f.max ?? 500} />;
  }
}

const STATUS_STYLE: Record<string, string> = {
  new: "bg-leaf text-brand-900",
  contacted: "bg-blue-100 text-blue-900",
  visited: "bg-amber-100 text-amber-900",
  admitted: "bg-brand-700 text-white",
  closed: "bg-gray-200 text-gray-700",
};

export function AdminApp({ collections, driver }: { collections: Meta[]; driver: string }) {
  const router = useRouter();
  const [key, setKey] = useState(collections[0].key);
  const meta = useMemo(() => collections.find((c) => c.key === key)!, [collections, key]);
  const [items, setItems] = useState<Row[]>([]);
  const [single, setSingle] = useState<Row>({});
  const [known, setKnown] = useState<string[]>([]);
  const [sel, setSel] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/data/${k}`);
      if (res.status === 401) return router.refresh();
      const d = await res.json();
      const m = collections.find((c) => c.key === k)!;
      if (m.kind === "single") setSingle(d.value as Row);
      else {
        const list = d.value as Row[];
        setItems(list);
        setKnown(list.map((r) => String(r.id)));
        setSel(list.length ? String(list[0].id) : null);
      }
      setDirty(false);
    } catch {
      setMsg({ ok: false, text: "Could not load this section." });
    } finally {
      setLoading(false);
    }
  }, [collections, router]);

  useEffect(() => { load(key); }, [key, load]);

  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  function switchTo(k: string) {
    if (k === key) return;
    if (dirty && !window.confirm("You have unsaved changes. Leave without saving?")) return;
    setKey(k);
  }

  const selected = items.find((r) => String(r.id) === sel) ?? null;
  const update = (id: string, name: string, v: unknown) => { setItems((a) => a.map((r) => (String(r.id) === id ? { ...r, [name]: v } : r))); setDirty(true); };

  function add() {
    const row: Row = { id: crypto.randomUUID() };
    meta.fields.forEach((f) => { row[f.name] = blankFor(f); });
    setItems((a) => [row, ...a]);
    setSel(String(row.id));
    setDirty(true);
  }
  function remove(id: string) {
    if (!window.confirm("Delete this item? This cannot be undone after you save.")) return;
    setItems((a) => {
      const next = a.filter((r) => String(r.id) !== id);
      setSel(next.length ? String(next[0].id) : null);
      return next;
    });
    setDirty(true);
  }
  function move(id: string, d: -1 | 1) {
    setItems((a) => {
      const i = a.findIndex((r) => String(r.id) === id);
      const j = i + d;
      if (i < 0 || j < 0 || j >= a.length) return a;
      const n = [...a];
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
    setDirty(true);
  }

  async function save() {
    // Required-field check, so a half-empty item never goes live.
    const rows = meta.kind === "single" ? [single] : items;
    for (const r of rows) {
      for (const f of meta.fields) {
        const v = r[f.name];
        if (f.required && !f.readonly && (v === undefined || v === null || String(v).trim() === "")) {
          if (meta.kind === "list") setSel(String(r.id));
          setMsg({ ok: false, text: `"${f.label}" is required.` });
          return;
        }
      }
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/data/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta.kind === "single" ? { value: single } : { items, knownIds: known }),
      });
      if (res.status === 401) return router.refresh();
      const d = await res.json();
      if (!res.ok) { setMsg({ ok: false, text: d.error || "Could not save." }); return; }
      if (meta.kind === "single") setSingle(d.value);
      else {
        setItems(d.value);
        setKnown((d.value as Row[]).map((r) => String(r.id)));
        if (!(d.value as Row[]).some((r) => String(r.id) === sel)) setSel(d.value.length ? String(d.value[0].id) : null);
      }
      setDirty(false);
      setMsg({ ok: true, text: "Saved. The change is live on the website." });
    } catch {
      setMsg({ ok: false, text: "Could not reach the server." });
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const titleOf = (r: Row) => String(r[meta.titleField] || "").trim() || "Untitled";

  return (
    <div className="container-x py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl text-brand-900">School admin</h1>
          <p className="text-sm text-muted">Storage: {driver === "supabase" ? "Supabase" : "files on this server"}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="btn btn-ghost !py-2" target="_blank">View site</Link>
          <button type="button" onClick={logout} className="btn btn-ghost !py-2">Sign out</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Sections" className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:content-start lg:gap-1 lg:overflow-visible lg:pb-0">
          {collections.map((c) => (
            <button key={c.key} type="button" onClick={() => switchTo(c.key)} aria-current={c.key === key ? "page" : undefined}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm font-semibold ${c.key === key ? "bg-brand-700 text-white" : "hover:bg-brand-50"}`}>
              {c.label}
            </button>
          ))}
        </nav>

        <section className="min-w-0">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div className="max-w-xl">
              <h2 className="text-2xl text-brand-900">{meta.label}</h2>
              <p className="text-sm text-muted">{meta.description}</p>
            </div>
            <div className="flex gap-2">
              {key === "enquiries" && <a href="/api/admin/export" className="btn btn-ghost !py-2">Export CSV</a>}
              {meta.kind === "list" && meta.canAdd && <button type="button" onClick={add} className="btn !py-2">Add new</button>}
            </div>
          </div>

          {loading ? (
            <p className="text-muted">Loading...</p>
          ) : meta.kind === "single" ? (
            <div className="grid gap-5 rounded-3xl border border-line bg-white p-6">
              {meta.fields.map((f) => (
                <div key={f.name} className="field">
                  <label htmlFor={`f-${f.name}`}>{f.label}{f.required ? " *" : ""}</label>
                  <FieldInput id={`f-${f.name}`} f={f} value={single[f.name]} onChange={(v) => { setSingle((s) => ({ ...s, [f.name]: v })); setDirty(true); }} />
                  {f.help && <p className="text-xs text-muted">{f.help}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
              <ul className="max-h-[560px] divide-y divide-line overflow-y-auto rounded-3xl border border-line bg-white">
                {items.length === 0 && <li className="p-5 text-sm text-muted">{meta.canAdd ? "Nothing here yet. Choose Add new to create the first item." : "Nothing here yet."}</li>}
                {items.map((r, i) => {
                  const id = String(r.id);
                  return (
                    <li key={id} className={`flex items-center gap-1 ${id === sel ? "bg-brand-50" : ""}`}>
                      <button type="button" onClick={() => setSel(id)} className="min-w-0 flex-1 p-4 text-left">
                        <span className="block truncate font-semibold">{titleOf(r)}</span>
                        {key === "enquiries" ? (
                          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[String(r.status)] ?? ""}`}>{String(r.status)}</span>
                        ) : r.active === false ? (
                          <span className="text-xs text-muted">Hidden</span>
                        ) : null}
                      </button>
                      {meta.canAdd && (
                        <span className="flex flex-col pr-2">
                          <button type="button" onClick={() => move(id, -1)} disabled={i === 0} aria-label="Move up" className="grid h-6 w-7 place-items-center rounded text-muted hover:bg-white disabled:opacity-30"><Icon name="left" className="h-4 w-4 rotate-90" /></button>
                          <button type="button" onClick={() => move(id, 1)} disabled={i === items.length - 1} aria-label="Move down" className="grid h-6 w-7 place-items-center rounded text-muted hover:bg-white disabled:opacity-30"><Icon name="left" className="h-4 w-4 -rotate-90" /></button>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>

              {selected ? (
                <div className="grid gap-5 rounded-3xl border border-line bg-white p-6">
                  {meta.fields.map((f) => (
                    <div key={f.name} className="field">
                      <label htmlFor={`f-${f.name}`}>{f.label}{f.required && !f.readonly ? " *" : ""}</label>
                      <FieldInput id={`f-${f.name}`} f={f} value={selected[f.name]} onChange={(v) => update(String(selected.id), f.name, v)} />
                      {f.help && <p className="text-xs text-muted">{f.help}</p>}
                    </div>
                  ))}
                  {meta.canDelete && (
                    <div><button type="button" onClick={() => remove(String(selected.id))} className="rounded-full border-2 border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Delete this item</button></div>
                  )}
                </div>
              ) : (
                <div className="grid place-items-center rounded-3xl border border-dashed border-line p-10 text-muted">Select an item to edit it.</div>
              )}
            </div>
          )}

          <div className="sticky bottom-0 mt-6 flex flex-wrap items-center gap-4 border-t border-line bg-white/95 py-4 backdrop-blur">
            <button type="button" onClick={save} disabled={busy || loading || !dirty} className="btn">{busy ? "Saving..." : "Save changes"}</button>
            {dirty && !msg && <span className="text-sm text-muted">You have unsaved changes.</span>}
            {msg && <span role="status" className={`text-sm font-semibold ${msg.ok ? "text-brand-700" : "text-red-700"}`}>{msg.text}</span>}
          </div>
        </section>
      </div>
    </div>
  );
}
