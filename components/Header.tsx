import Link from "next/link";
import type { Settings } from "@/lib/types";
import { Img } from "./Img";
import { Icon } from "./Icon";
import { MobileNav } from "./MobileNav";
import { Ticker } from "./Ticker";
import { lines } from "@/lib/content";

export const MAIN_LINKS = [
  { href: "/about", label: "Who we are" },
  { href: "/curriculum", label: "Our curriculum" },
  { href: "/life", label: "Life at SPS" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export const SECOND_LINKS = [
  { href: "/notices", label: "Publication" },
  { href: "/awards", label: "Awards and achievements" },
  { href: "/mandatory-disclosure", label: "Mandatory disclosure" },
  { href: "/tc-verify", label: "Verify TC" },
  { href: "/careers", label: "Careers" },
];

export function Header({
  settings: s,
  pinned,
}: {
  settings: Settings;
  pinned: { id: string; title: string; url: string }[];
}) {
  const phone = lines(s.phones)[0];
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="hidden bg-brand-900 text-sm text-brand-100 lg:block">
        <div className="container-x flex items-center justify-between gap-6 py-2">
          <Ticker items={pinned} fallback={s.topBarText} />
          <nav aria-label="Secondary" className="flex items-center gap-5">
            {SECOND_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="whitespace-nowrap text-white/90 hover:text-white hover:underline">
                {l.label}
              </Link>
            ))}
            <form action="/search" role="search" className="flex items-center">
              <label htmlFor="top-search" className="sr-only">Search the site</label>
              <input id="top-search" name="q" type="search" placeholder="Search" className="w-28 rounded-l-full border-0 bg-white/10 px-3 py-1 text-sm text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none" />
              <button type="submit" aria-label="Search" className="rounded-r-full bg-white/10 px-2.5 py-1.5 text-white hover:bg-white/25">
                <Icon name="search" className="h-4 w-4" />
              </button>
            </form>
          </nav>
        </div>
      </div>

      <div className="container-x flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${s.name}, home`}>
          <span className="relative h-14 w-14 flex-none overflow-hidden rounded-full border-2 border-brand-100 bg-white">
            <Img src={s.logoUrl} alt="" fit="contain" className="h-full w-full" label="SPS" eager />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-lg font-semibold text-brand-900">{s.shortName}</span>
            <span className="hidden truncate text-xs text-muted sm:block">CBSE, Nursery to Class X, Jaipur</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {MAIN_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3.5 py-2 text-[.97rem] font-semibold text-ink hover:bg-brand-50 hover:text-brand-700">
              {l.label}
            </Link>
          ))}
          <Link href="/admissions" className="btn ml-2">
            Inquire now
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </nav>

        <MobileNav main={MAIN_LINKS} second={SECOND_LINKS} phone={phone} />
      </div>
    </header>
  );
}
