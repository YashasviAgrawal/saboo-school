import Link from "next/link";
import type { Settings } from "@/lib/types";
import { Icon } from "./Icon";
import { Img } from "./Img";
import { lines } from "@/lib/content";
import { telHref } from "@/lib/format";
import { MAIN_LINKS, SECOND_LINKS } from "./Header";
import { IMG } from "@/lib/defaults";

export function Footer({ settings: s }: { settings: Settings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-brand-900 text-brand-100">
      <Img src={IMG.campus} alt="" className="absolute inset-0 -z-10 h-full w-full opacity-[.08] grayscale" />
      <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-leaf via-brand-400 to-brand-700" />
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-14 w-14 flex-none overflow-hidden rounded-full border-2 border-white/30 bg-white">
              <Img src={s.logoUrl} alt="" fit="contain" className="h-full w-full" />
            </span>
            <span className="font-display text-lg font-semibold leading-tight text-white">{s.name}</span>
          </div>
          <p className="max-w-xs text-sm">Run by the {s.trustName}. English medium, CBSE, Nursery to Class X.</p>
          <div className="mt-5 flex gap-3">
            {[
              { href: s.facebook, icon: "facebook", label: "Facebook" },
              { href: s.instagram, icon: "instagram", label: "Instagram" },
              { href: s.youtube, icon: "youtube", label: "YouTube" },
            ]
              .filter((x) => x.href)
              .map((x) => (
                <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.label} className="grid h-10 w-10 place-items-center rounded-full border border-white/40 text-white hover:bg-white/10">
                  <Icon name={x.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base text-white">Explore</h3>
          <ul className="grid gap-2 text-sm">
            {MAIN_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link></li>
            ))}
            <li><Link href="/admissions" className="hover:text-white hover:underline">Admissions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base text-white">Parents</h3>
          <ul className="grid gap-2 text-sm">
            {SECOND_LINKS.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base text-white">Contact</h3>
          <address className="grid gap-2 text-sm not-italic">
            <p className="flex gap-2"><Icon name="pin" className="mt-1 h-4 w-4 flex-none" /><span>{s.name}<br />{lines(s.address).join(", ")}</span></p>
            {lines(s.phones).map((p) => (
              <p key={p} className="flex gap-2"><Icon name="phone" className="mt-1 h-4 w-4 flex-none" /><a href={telHref(p)} className="hover:text-white hover:underline">{p}</a></p>
            ))}
            <p className="flex gap-2"><Icon name="mail" className="mt-1 h-4 w-4 flex-none" /><a href={`mailto:${s.email}`} className="break-all hover:text-white hover:underline">{s.email}</a></p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5 text-sm">
          <p>&copy; {year} {s.name}</p>
          <p>CBSE Affiliation No. {s.affiliationNo}</p>
          <p>School Code {s.schoolCode}</p>
          <p className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white hover:underline">Privacy policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white hover:underline">Terms and conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
