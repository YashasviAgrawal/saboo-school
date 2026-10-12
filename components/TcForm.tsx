"use client";
import { useState } from "react";
import { formatDate } from "@/lib/format";
import { Icon } from "./Icon";

type Rec = { tcNumber: string; studentName: string; className: string; issueDate: string; fileUrl: string };
type State = { k: "idle" } | { k: "busy" } | { k: "found"; r: Rec } | { k: "none" } | { k: "err"; m: string };

export function TcForm() {
  const [st, setSt] = useState<State>({ k: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSt({ k: "busy" });
    try {
      const res = await fetch("/api/tc", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok || !d.ok) return setSt({ k: "err", m: d.error || "Something went wrong. Please try again." });
      setSt(d.found ? { k: "found", r: d.record } : { k: "none" });
    } catch {
      setSt({ k: "err", m: "We could not reach the server. Please try again." });
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="rounded-3xl border border-line bg-white p-6 sm:p-8" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="field"><label htmlFor="tc-no">TC number</label><input id="tc-no" name="tcNumber" className="input" required maxLength={40} autoComplete="off" /></div>
          <div className="field"><label htmlFor="tc-dob">Student&apos;s date of birth</label><input id="tc-dob" name="dob" type="date" className="input" required /></div>
        </div>
        <button className="btn mt-6" type="submit" disabled={st.k === "busy"}>{st.k === "busy" ? "Checking..." : "Verify certificate"}</button>
      </form>

      <div aria-live="polite">
        {st.k === "found" && (
          <div className="fade-in rounded-3xl border border-brand-200 bg-brand-50 p-6 sm:p-8">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-700 px-3 py-1 text-sm font-semibold text-white"><Icon name="check" className="h-4 w-4" />Certificate found</p>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div><dt className="text-sm text-muted">TC number</dt><dd className="font-semibold">{st.r.tcNumber}</dd></div>
              <div><dt className="text-sm text-muted">Student</dt><dd className="font-semibold">{st.r.studentName}</dd></div>
              <div><dt className="text-sm text-muted">Class</dt><dd className="font-semibold">{st.r.className || "Not recorded"}</dd></div>
              <div><dt className="text-sm text-muted">Issued on</dt><dd className="font-semibold">{st.r.issueDate ? formatDate(st.r.issueDate) : "Not recorded"}</dd></div>
            </dl>
            {st.r.fileUrl && <a className="btn btn-ghost mt-5" href={st.r.fileUrl} target="_blank" rel="noopener noreferrer">View scanned certificate</a>}
          </div>
        )}
        {st.k === "none" && (
          <p className="fade-in rounded-2xl border border-line bg-white p-5 text-muted">No certificate matches those details. Check the TC number and date of birth, or contact the school office.</p>
        )}
        {st.k === "err" && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">{st.m}</p>}
      </div>
    </div>
  );
}
