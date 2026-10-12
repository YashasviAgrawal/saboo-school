"use client";
import { useCallback, useEffect, useState } from "react";
import { Img } from "./Img";
import { Icon } from "./Icon";

type Item = { image: string; caption: string };

export function Lightbox({ items, columns = "sm:grid-cols-2 lg:grid-cols-3" }: { items: Item[]; columns?: string }) {
  const [idx, setIdx] = useState<number | null>(null);
  const n = items.length;
  const step = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (idx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, step]);

  if (n === 0) return null;
  const cur = idx === null ? null : items[idx];

  return (
    <>
      <ul className={`grid grid-cols-1 gap-4 ${columns}`}>
        {items.map((it, i) => (
          <li key={`${it.image}-${i}`}>
            <button type="button" onClick={() => setIdx(i)} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line" aria-label={`Open photo: ${it.caption || i + 1}`}>
              <Img src={it.image} alt={it.caption} className="h-full w-full transition duration-500 group-hover:scale-105" />
              {it.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/80 to-transparent px-4 pb-3 pt-10 text-sm font-medium text-white">{it.caption}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fade-in fixed inset-0 z-[90] grid place-items-center bg-black/85 p-4" onClick={() => setIdx(null)}>
          <figure className="relative max-h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="max-h-[78vh] overflow-hidden rounded-2xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cur.image} alt={cur.caption} className="mx-auto max-h-[78vh] w-auto max-w-full object-contain" />
            </div>
            {cur.caption && <figcaption className="mt-3 text-center text-white">{cur.caption}</figcaption>}
            {n > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink"><Icon name="left" /></button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink"><Icon name="right" /></button>
              </>
            )}
            <button type="button" onClick={() => setIdx(null)} aria-label="Close photo viewer" className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white text-ink"><Icon name="close" className="h-5 w-5" /></button>
          </figure>
        </div>
      )}
    </>
  );
}
