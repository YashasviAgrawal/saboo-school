"use client";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Img } from "./Img";

export function VideoModal({ videoId, label = "School tour" }: { videoId: string; label?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-video w-full overflow-hidden rounded-3xl border border-line bg-brand-900 text-left shadow-xl shadow-brand-900/10"
        aria-label={`Play video: ${label}`}
      >
        <Img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" className="h-full w-full opacity-90 transition group-hover:scale-[1.03]" label="Tour" />
        <span className="absolute inset-0 grid place-items-center bg-gradient-to-t from-brand-900/70 via-transparent">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-brand-800 shadow-lg transition group-hover:scale-110">
            <Icon name="play" className="ml-1 h-8 w-8" />
          </span>
        </span>
        <span className="absolute bottom-4 left-5 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-900">{label}</span>
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={label} className="fade-in fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4" onClick={() => setOpen(false)}>
          <div className="relative aspect-video w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="h-full w-full rounded-2xl bg-black"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
              title={label}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close video" className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white text-ink">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
