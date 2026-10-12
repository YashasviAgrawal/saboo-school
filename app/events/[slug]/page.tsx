import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getEvents, paragraphs } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/Img";
import { Lightbox } from "@/components/Lightbox";
import { Icon } from "@/components/Icon";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = (await getEvents()).find((x) => x.slug === slug);
  if (!e) return { title: "Event not found" };
  return { title: e.title, description: e.summary || undefined, openGraph: e.image ? { images: [e.image] } : undefined };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const e = (await getEvents()).find((x) => x.slug === slug);
  if (!e) notFound();

  return (
    <>
      <PageHero image={e.image || IMG.campus} title={e.title} lead={e.summary} crumb={[{ href: "/events", label: "Events" }]} />
      <article className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          {e.image && <Img src={e.image} alt={e.title} className="mb-8 aspect-[16/9] w-full rounded-3xl border border-line" label="Event" />}
          <div className="prose-sps">
            {paragraphs(e.body || e.summary).map((p, i) => (<p key={i}>{p}</p>))}
          </div>
          {e.gallery.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 text-2xl text-brand-900">Photos</h2>
              <Lightbox items={e.gallery.map((g) => ({ image: g, caption: "" }))} />
            </section>
          )}
        </div>
        <aside className="h-fit rounded-3xl border border-line bg-brand-50 p-6">
          <h2 className="mb-4 text-xl text-brand-900">Event details</h2>
          <dl className="grid gap-4 text-sm">
            <div><dt className="text-muted">Date</dt><dd className="font-semibold">{formatDate(e.date)}{e.endDate && e.endDate !== e.date ? ` to ${formatDate(e.endDate)}` : ""}</dd></div>
            {e.venue && <div><dt className="text-muted">Venue</dt><dd className="font-semibold">{e.venue}</dd></div>}
          </dl>
          <Link href="/events" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline"><Icon name="left" className="h-4 w-4" />All events</Link>
        </aside>
      </article>
    </>
  );
}
