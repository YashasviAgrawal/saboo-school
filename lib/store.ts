import "server-only";
import { promises as fs } from "fs";
import path from "path";

/**
 * Tiny JSON key-value store with two drivers:
 *  - files in DATA_DIR (default ./data/store): good for a VPS / EC2 with a persistent disk
 *  - Supabase REST (table sps_kv): use on Vercel or any read-only host
 */
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data", "store");
const SB_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const useSupabase = Boolean(SB_URL && SB_KEY);

const KEY_RE = /^[a-zA-Z][a-zA-Z0-9]{0,40}$/;
function assertKey(key: string) {
  if (!KEY_RE.test(key)) throw new Error("Invalid storage key");
}

const sbHeaders = () => ({
  apikey: SB_KEY as string,
  Authorization: `Bearer ${SB_KEY}`,
  "Content-Type": "application/json",
});

async function rawRead<T>(key: string): Promise<T | undefined> {
  assertKey(key);
  if (useSupabase) {
    const res = await fetch(`${SB_URL}/rest/v1/sps_kv?key=eq.${key}&select=value`, {
      headers: sbHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Supabase read failed (${res.status})`);
    const rows = (await res.json()) as { value: T }[];
    return rows[0]?.value;
  }
  try {
    const txt = await fs.readFile(path.join(DATA_DIR, `${key}.json`), "utf8");
    return JSON.parse(txt) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw e;
  }
}

async function rawWrite(key: string, value: unknown) {
  assertKey(key);
  if (useSupabase) {
    const res = await fetch(`${SB_URL}/rest/v1/sps_kv?on_conflict=key`, {
      method: "POST",
      headers: { ...sbHeaders(), Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Supabase write failed (${res.status})`);
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${key}.json`);
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tmp, file);
}

const locks = new Map<string, Promise<unknown>>();
function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(key) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(
    key,
    next.catch(() => undefined),
  );
  return next;
}

export async function readJSON<T>(key: string, fallback: T): Promise<T> {
  const v = await rawRead<T>(key);
  return v === undefined ? fallback : v;
}

export function writeJSON(key: string, value: unknown) {
  return withLock(key, () => rawWrite(key, value));
}

export function updateJSON<T>(key: string, fallback: T, fn: (cur: T) => T) {
  return withLock(key, async () => {
    const cur = await readJSON<T>(key, fallback);
    const next = fn(cur);
    await rawWrite(key, next);
    return next;
  });
}

export const storageDriver = useSupabase ? "supabase" : "files";
