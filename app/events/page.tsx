import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import Link from "next/link";
import { getEvents } from "@/lib/content";
import { PageHero, Empty } from "@/components/PageHero";
import { Img } from "@/components/Img";
import { Icon } from "@/components/Icon";
import { formatDate } from "@/lib/format";
import type { EventItem } from "@/lib/types";

export const metadata: Metadata = { title: "Events", description: "Upcoming and past events at Shri Hari Ram Saboo Public School." };
export const dynamic = "force-dynamic";

function Card({ e }: { e: EventItem }) {
  return (
    <li>
      <Link href={`/events/${e.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5">
        <Img src={e.image} alt="" className="aspect-[16/10] w-full transition duration-500 group-hover:scale-[1.03]" label="Event" />
        <div className="flex flex-1 flex-col p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-700"><Icon name="calendar" className="h-4 w-4" />{formatDate(e.date)}{e.endDate && e.endDate !== e.date ? ` to ${formatDate(e.endDate)}` : ""}</p>
          <h3 className="mt-2 text-xl text-brand-900">{e.title}</h3>
          {e.summary && <p className="mt-2 line-clamp-3 text-muted">{e.summary}</p>}
          <span className="mt-auto inline-flex items-center gap-2 pt-4 font-semibold text-brand-700">Read more<Icon name="arrow" className="h-4 w-4" /></span>
        </div>
      </Link>
    </li>
  );
}

export default async function Events() {
  const all = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = all.filter((e) => (e.endDate || e.date) >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = all.filter((e) => (e.endDate || e.date) < today);

  return (
    <>
      <PageHero image={IMG.campus} focus="top" title="Events" lead="Celebrations, competitions and gatherings across the school year." />
      <div className="container-x py-16">
        {all.length === 0 && <Empty title="No events yet" text="New events will appear here as soon as the school adds them. Please check back soon." />}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-8 text-3xl text-brand-900">Upcoming</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map((e) => <Card key={e.id} e={e} />)}</ul>
          </section>
        )}
        {past.length > 0 && (
          <section>
            <h2 className="mb-8 text-3xl text-brand-900">Past events</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{past.map((e) => <Card key={e.id} e={e} />)}</ul>
          </section>
        )}
      </div>
    </>
  );
}
