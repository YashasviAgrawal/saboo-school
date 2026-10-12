import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import { getGallery, getHouses } from "@/lib/content";
import { PageHero, SectionHead } from "@/components/PageHero";
import { Lightbox } from "@/components/Lightbox";

export const metadata: Metadata = { title: "Life at SPS", description: "Art, music, dance, celebrations and houses at Shri Hari Ram Saboo Public School." };
export const dynamic = "force-dynamic";

const ACTIVITIES = [
  ["Art and creative corner", "Students and teachers share space to make and display work."],
  ["Dance and music", "Dedicated rooms for practice, and stage time on festival days."],
  ["Celebrations", "Navratri and Dandiya performances bring the whole school together."],
  ["Houses", "Tagore, Pratap, Tilak and Shivaji compete, cheer and learn teamwork."],
  ["Exhibitions and the school magazine", "Students show what they have learnt."],
];

export default async function Life() {
  const [gallery, houses] = await Promise.all([getGallery(), getHouses()]);
  return (
    <>
      <PageHero image={IMG.gate} focus="top" title="Life at SPS" lead="Learning does not stop at the bell. Students find their voice in creative work, performance and celebration." />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="text-3xl text-brand-900 sm:text-4xl">Beyond the classroom</h2>
          <ul className="mt-8 grid gap-5">
            {ACTIVITIES.map(([t, d]) => (
              <li key={t} className="relative pl-8">
                <span aria-hidden="true" className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full bg-brand-700" />
                <h3 className="font-sans text-lg font-bold text-ink">{t}</h3>
                <p className="text-muted">{d}</p>
              </li>
            ))}
          </ul>
          {houses.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {houses.map((h) => (
                <span key={h.id} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold">
                  <i className="block h-3.5 w-3.5 rounded-full" style={{ background: h.color }} />{h.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div>
          <SectionHead title="Photo gallery" className="!mb-6" />
          <Lightbox items={gallery} columns="sm:grid-cols-2" />
        </div>
      </section>
    </>
  );
}
