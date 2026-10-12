"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

type L = { href: string; label: string };

export function MobileNav({ main, second, phone }: { main: L[]; second: L[]; phone?: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-11 w-11 place-items-center rounded-xl border-2 border-line text-ink"
      >
        <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
      </button>

      {open && (
        <div id="mobile-menu" className="fade-in absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-73px)] overflow-y-auto border-b border-line bg-white px-4 pb-8 pt-4 shadow-xl">
          <form action="/search" role="search" className="mb-5 flex">
            <label htmlFor="m-search" className="sr-only">Search the site</label>
            <input id="m-search" name="q" type="search" placeholder="Search the site" className="input rounded-r-none" />
            <button type="submit" aria-label="Search" className="rounded-r-xl bg-brand-700 px-4 text-white">
              <Icon name="search" className="h-5 w-5" />
            </button>
          </form>
          <ul className="grid gap-1">
            {main.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-xl px-3 py-3 font-display text-xl font-semibold hover:bg-brand-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/admissions" className="btn mt-4 w-full">
            Inquire now
          </Link>
          <ul className="mt-6 grid gap-1 border-t border-line pt-4">
            {second.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-lg px-3 py-2 text-muted hover:bg-brand-50 hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {phone && <p className="mt-6 px-3 text-sm text-muted">Call the school office: <span className="font-semibold text-ink">{phone}</span></p>}
        </div>
      )}
    </div>
  );
}
