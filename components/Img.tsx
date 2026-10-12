"use client";
import { useEffect, useRef, useState } from "react";
import type { Focus } from "@/lib/types";

const FOCUS: Record<Focus, string> = {
  center: "50% 50%",
  top: "50% 15%",
  bottom: "50% 85%",
  left: "15% 50%",
  right: "85% 50%",
};

/** Image with a designed fallback, so a missing or blocked photo never shows a broken icon. */
export function Img({
  src,
  alt,
  fit = "cover",
  className = "",
  label = "SPS",
  eager = false,
  focus = "center",
}: {
  src?: string;
  alt: string;
  fit?: "cover" | "contain";
  className?: string;
  label?: string;
  eager?: boolean;
  focus?: Focus;
}) {
  // Remember which src failed, so a later src change retries without an effect racing the error check.
  const [badSrc, setBadSrc] = useState<string | null>(null);
  const bad = Boolean(src) && badSrc === src;
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setBadSrc(src ?? null);
  }, [src]);

  if (!src || bad) {
    return (
      <div role="img" aria-label={alt} className={`dots-bg grid place-items-center bg-brand-50 font-display text-3xl font-semibold text-brand-700/30 ${className}`}>
        {label}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setBadSrc(src ?? null)}
      style={fit === "cover" ? { objectPosition: FOCUS[focus] ?? "center" } : undefined}
      className={`text-transparent ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
