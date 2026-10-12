import type { Metadata } from "next";
import Link from "next/link";
import { getEvents, getNotices } from "@/lib/content";
import { PageHero, Empty } from "@/components/PageHero";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Search", robots: { index: false } };
export const dynamic = "force-dynamic";

const PAGES = [
  { href: "/about", title: "Who we are", text: "Story, Principal's message, trust, management and history of the school" },
  { href: "/curriculum", title: "Our curriculum", text: "CBSE curriculum, Tata ClassEdge, houses and learning spaces" },
  { href: "/life", title: "Life at SPS", text: "Art, music, dance, celebrations, houses and photo gallery" },
  { href: "/admissions", title: "Admissions", text: "How to apply, age norms, enquiry form and school tour" },
  { href: "/contact", title: "Contact", text: "Address, phone numbers, email and map" },
  { href: "/mandatory-disclosure", title: "Mandatory disclosure", text: "CBSE affiliation, fee structure, calendar, results" },
  { href: "/tc-verify", title: "Verify a transfer certificate", text: "Check a TC with its number and date of birth" },
  { href: "/careers", title: "Careers", text: "Teaching and staff vacancies" },
];

type Props = { searchParams: Promise<{ q?: string }> };

export default async function Search({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase().slice(0, 80);
  const [events, notices] = await Promise.all([getEvents(), getNotices()]);
  const has = (...f: string[]) => f.some((x) => x.toLowerCase().includes(term));

  const pages = term ? PAGES.filter((p) => has(p.title, p.text)) : [];
  const ev = term ? events.filter((e) => has(e.title, e.summary, e.body, e.venue)) : [];
  const no = term ? notices.filter((n) => has(n.title, n.category)) : [];
  const total = pages.length + ev.length + no.length;

  return (
    <>
      <PageHero title="Search" lead="Find pages, events and notices." />
      <div className="container-x max-w-3xl py-16">
        <form action="/search" role="search" className="mb-10 flex">
          <label htmlFor="q" className="sr-only">Search</label>
          <input id="q" name="q" type="search" defaultValue={q} placeholder="Try admissions, fees or Navratri" className="input rounded-r-none" />
          <button className="rounded-r-xl bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800" type="submit">Search</button>
        </form>

        {!term && <Empty title="What are you looking for?" text="Type a word above to search the school's pages, events and notices." />}
        {term && total === 0 && <Empty title={`No results for "${q}"`} text="Try a shorter word, or browse the menu above." />}

        {pages.length > 0 && (
          <section className="mb-10"><h2 className="mb-4 text-2xl text-brand-900">Pages</h2>
            <ul className="grid gap-3">{pages.map((p) => (<li key={p.href}><Link href={p.href} className="block rounded-2xl border border-line p-5 hover:bg-brand-50"><span className="font-semibold text-brand-800">{p.title}</span><span className="block text-muted">{p.text}</span></Link></li>))}</ul></section>
        )}
        {ev.length > 0 && (
          <section className="mb-10"><h2 className="mb-4 text-2xl text-brand-900">Events</h2>
            <ul className="grid gap-3">{ev.map((e) => (<li key={e.id}><Link href={`/events/${e.slug}`} className="block rounded-2xl border border-line p-5 hover:bg-brand-50"><span className="text-sm text-brand-700">{formatDate(e.date)}</span><span className="block font-semibold text-brand-800">{e.title}</span><span className="block text-muted">{e.summary}</span></Link></li>))}</ul></section>
        )}
        {no.length > 0 && (
          <section><h2 className="mb-4 text-2xl text-brand-900">Notices</h2>
            <ul className="grid gap-3">{no.map((n) => (<li key={n.id}><Link href="/notices" className="block rounded-2xl border border-line p-5 hover:bg-brand-50"><span className="text-sm text-muted">{formatDate(n.date)} &middot; {n.category}</span><span className="block font-semibold text-brand-800">{n.title}</span></Link></li>))}</ul></section>
        )}
      </div>
    </>
  );
}
