"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "@/lib/types";
import { Img } from "./Img";
import { Icon } from "./Icon";

const pad = (v: number) => String(v).padStart(2, "0");

/** Full-width photo slider. Photos fill the frame under a green wash; logos (fit "contain") sit on a white card. */
export function Hero({ slides }: { slides: Slide[] }) {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);
  const n = slides.length;

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((i: number) => setCur(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (n < 2 || paused) return;
    const t = setInterval(() => {
      if (!reduce.current) setCur((v) => (v + 1) % n);
    }, 6500);
    return () => clearInterval(t);
  }, [n, paused]);

  if (n === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate overflow-hidden bg-brand-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid min-h-[560px] sm:min-h-[600px] lg:h-[min(78vh,720px)]">
        {slides.map((s, i) => {
          const on = i === cur;
          const logo = s.fit === "contain";
          const external = /^https?:\/\//.test(s.ctaHref);
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={!on}
              inert={!on}
              className={`relative col-start-1 row-start-1 transition-opacity duration-1000 ${on ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
            >
              {logo ? (
                <div aria-hidden="true" className="dots-bg-light absolute inset-0" />
              ) : (
                <>
                  <Img
                    src={s.image}
                    alt=""
                    focus={s.focus}
                    eager={i === 0}
                    className={`absolute inset-0 h-full w-full transition-transform duration-[7000ms] ease-out ${on ? "scale-105" : "scale-100"}`}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/70 to-brand-900/10" />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-900/80 to-transparent" />
                </>
              )}

              <div className="container-x relative flex h-full items-center pb-28 pt-14 lg:pb-24">
                <div className={`grid w-full items-center gap-10 ${logo ? "lg:grid-cols-[1.1fr_.9fr]" : ""}`}>
                  <div className="max-w-2xl">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-leaf ring-1 ring-white/20 backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-leaf" />CBSE, Nursery to Class X
                    </p>
                    <Heading className="text-4xl text-white sm:text-5xl lg:text-[3.9rem]">{s.title}</Heading>
                    <p className="mt-5 max-w-xl text-lg text-brand-50/90">{s.text}</p>
                    {s.ctaLabel && s.ctaHref && (
                      <div className="mt-8 flex flex-wrap gap-3">
                        {external ? (
                          <a className="btn btn-white" href={s.ctaHref} target="_blank" rel="noopener noreferrer">{s.ctaLabel}<Icon name="arrow" className="h-4 w-4" /></a>
                        ) : (
                          <Link className="btn btn-white" href={s.ctaHref}>{s.ctaLabel}<Icon name="arrow" className="h-4 w-4" /></Link>
                        )}
                        <Link className="btn btn-outline-white" href="/admissions">Inquire now</Link>
                      </div>
                    )}
                  </div>
                  {logo && (
                    <div className="mx-auto hidden aspect-[4/3] w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-10 shadow-2xl shadow-black/30 lg:block">
                      <Img src={s.image} alt={s.title} fit="contain" className="h-full w-full" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="container-x flex items-center gap-5 pb-8">
            <p className="font-display text-lg tabular-nums" aria-live="polite">
              <span className="text-2xl font-semibold text-white">{pad(cur + 1)}</span>
              <span className="text-white/60"> / {pad(n)}</span>
            </p>
            <div className="flex flex-1 gap-2" role="tablist" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === cur}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className="group relative h-6 max-w-24 flex-1"
                >
                  <span className={`absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full transition ${i === cur ? "bg-leaf" : "bg-white/30 group-hover:bg-white/60"}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(cur - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/60 text-white hover:bg-white hover:text-brand-900">
                <Icon name="left" className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(cur + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/60 text-white hover:bg-white hover:text-brand-900">
                <Icon name="right" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
