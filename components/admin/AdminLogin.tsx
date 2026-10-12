"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(d.error || "Could not sign in.");
        return;
      }
      router.refresh();
    } catch {
      setErr("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-16">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl border border-line bg-white p-8 shadow-xl shadow-brand-900/5">
        <h1 className="text-3xl text-brand-900">School admin</h1>
        <p className="mb-6 mt-1 text-sm text-muted">Sign in to edit the website.</p>
        <div className="field mb-4">
          <label htmlFor="pw">Password</label>
          <input id="pw" name="password" type="password" className="input" autoComplete="current-password" required autoFocus />
        </div>
        {err && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{err}</p>}
        <button className="btn w-full" type="submit" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </section>
  );
}
