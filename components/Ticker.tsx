"use client";
import { useEffect, useState } from "react";

type Item = { id: string; title: string; url: string };

/** Rotates pinned notices in the top bar. Falls back to a fixed message when nothing is pinned. */
export function Ticker({ items, fallback }: { items: Item[]; fallback: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return <p className="truncate text-white/90">{fallback}</p>;
  const cur = items[i % items.length];
  return (
    <p className="flex min-w-0 items-center gap-3 truncate">
      <span className="flex-none rounded-full bg-leaf px-2.5 py-0.5 text-xs font-bold text-brand-900">Notice</span>
      {cur.url ? (
        <a key={cur.id} href={cur.url} className="fade-in truncate text-white hover:underline">{cur.title}</a>
      ) : (
        <span key={cur.id} className="fade-in truncate text-white">{cur.title}</span>
      )}
    </p>
  );
}
