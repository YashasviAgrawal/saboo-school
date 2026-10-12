"use client";
import { useState } from "react";
import { CLASS_OPTIONS } from "@/lib/classes";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done"; parent: string; phone: string } | { kind: "error"; msg: string };

export function EnquiryForm({ phone }: { phone?: string }) {
  const [st, setSt] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = Object.fromEntries(fd.entries());
    setSt({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setSt({ kind: "error", msg: data.error || "Something went wrong. Please try again." });
        return;
      }
      setSt({ kind: "done", parent: String(body.parent), phone: String(body.phone) });
      form.reset();
    } catch {
      setSt({ kind: "error", msg: `We could not reach the server. Please try again${phone ? ` or call ${phone}` : ""}.` });
    }
  }

  if (st.kind === "done") {
    return (
      <div role="status" className="fade-in rounded-3xl border border-brand-200 bg-brand-50 p-8">
        <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-brand-700 text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h3 className="text-2xl text-brand-900">Thank you, {st.parent}</h3>
        <p className="mt-2 text-muted">We received your enquiry. The school office will call you on {st.phone}.</p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setSt({ kind: "idle" })}>Send another enquiry</button>
      </div>
    );
  }

  const sending = st.kind === "sending";
  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8" noValidate>
      <h3 className="text-2xl text-brand-900">Inquire now</h3>
      <p className="mb-6 mt-1 text-sm text-muted">Share a few details and we will call you back.</p>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <div className="field mb-4">
          <label htmlFor="e-parent">Parent&apos;s name</label>
          <input id="e-parent" name="parent" className="input" autoComplete="name" required minLength={2} maxLength={100} />
        </div>
        <div className="field mb-4">
          <label htmlFor="e-phone">Phone number</label>
          <input id="e-phone" name="phone" type="tel" inputMode="tel" className="input" autoComplete="tel" required maxLength={20} />
        </div>
        <div className="field mb-4">
          <label htmlFor="e-child">Child&apos;s name</label>
          <input id="e-child" name="child" className="input" maxLength={100} />
        </div>
        <div className="field mb-4">
          <label htmlFor="e-cls">Class applying for</label>
          <select id="e-cls" name="cls" className="input" defaultValue="Nursery">
            {CLASS_OPTIONS.map((c) => (<option key={c}>{c}</option>))}
          </select>
        </div>
      </div>
      <div className="field mb-4">
        <label htmlFor="e-msg">Message (optional)</label>
        <textarea id="e-msg" name="message" className="input" maxLength={1000} />
      </div>

      {/* Honeypot for bots. Hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="e-website">Leave this empty</label>
        <input id="e-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {st.kind === "error" && (
        <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{st.msg}</p>
      )}
      <button type="submit" className="btn w-full sm:w-auto" disabled={sending}>
        {sending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
