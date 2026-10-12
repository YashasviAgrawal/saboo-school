import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import { getAwards } from "@/lib/content";
import { PageHero, Empty } from "@/components/PageHero";
import { Img } from "@/components/Img";

export const metadata: Metadata = { title: "Awards and achievements", description: "Awards and achievements of Shri Hari Ram Saboo Public School and its students." };
export const dynamic = "force-dynamic";

export default async function Awards() {
  const awards = await getAwards();
  return (
    <>
      <PageHero image={IMG.gate} focus="left" title="Awards and achievements" lead="Recognition earned by our students and school." />
      <div className="container-x py-16">
        {awards.length === 0 ? (
          <Empty title="Achievements will be added soon" text="Board toppers, competition wins and school awards will be listed here." />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a) => (
              <li key={a.id} className="overflow-hidden rounded-3xl border border-line bg-white">
                {a.image && <Img src={a.image} alt={a.title} className="aspect-[4/3] w-full" label="Award" />}
                <div className="p-6">
                  {a.year && <p className="text-sm font-semibold text-brand-700">{a.year}</p>}
                  <h2 className="mt-1 text-xl text-brand-900">{a.title}</h2>
                  {a.description && <p className="mt-2 text-muted">{a.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
