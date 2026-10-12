import type { Metadata } from "next";
import { getStages, getTiles, getHouses } from "@/lib/content";
import { PageHero, SectionHead } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { IMG } from "@/lib/defaults";

export const metadata: Metadata = { title: "Our curriculum", description: "CBSE curriculum from Nursery to Class X at Shri Hari Ram Saboo Public School, with Tata ClassEdge multimedia learning." };
export const dynamic = "force-dynamic";

export default async function Curriculum() {
  const [stages, tiles, houses] = await Promise.all([getStages(), getTiles(), getHouses()]);
  return (
    <>
      <PageHero image={IMG.campus} focus="right" title="Our curriculum" lead="The CBSE curriculum from Nursery to Class X, taught in English, with proper attention to Hindi and Sanskrit." />

      <section className="container-x py-20">
        <SectionHead title="Three stages, one journey" />
        <div className="grid gap-5 md:grid-cols-3">
          {stages.map((st) => (
            <article key={st.id} className="overflow-hidden rounded-3xl border border-line bg-white">
              <div className="relative aspect-[16/10] bg-brand-50">
                <Img src={st.image} alt="" focus={st.focus} className="h-full w-full" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700 shadow"><Icon name={st.icon} className="h-5 w-5" /></span>
              </div>
              <div className="p-7">
                <h3 className="text-2xl text-brand-900">{st.title}</h3>
                <p className="mb-3 mt-1 font-semibold text-brand-700">{st.classes}</p>
                <p className="text-muted">{st.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-20">
        <div className="container-x grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-3xl text-brand-900 sm:text-4xl">Multimedia learning with Tata ClassEdge</h2>
            <p className="mt-4 text-lg text-muted">Teachers use Tata ClassEdge to bring ideas to life through pictures, animation and activity. The platform is built on a Multiple Learning Experiences model, so each concept is shown in more than one way.</p>
            <p className="mt-4 text-muted">Promotion to the next class rests on the whole year&apos;s work, regular attendance, tests and examinations.</p>
          </div>
          <div className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white">
            <Img src={IMG.tata} alt="Tata ClassEdge logo" fit="contain" className="h-full w-full p-10" label="Tata ClassEdge" />
          </div>
        </div>
      </section>

      <section id="houses" className="container-x py-20">
        <SectionHead title="The house system" lead="From Class 1, students join one of four houses. Each house is guided by four or more teachers, so every child has a team to belong to." />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {houses.map((h) => (
            <li key={h.id} className="overflow-hidden rounded-3xl border border-line bg-white">
              <div className="h-24" style={{ background: h.color }} />
              <p className="p-5 font-display text-2xl font-semibold text-brand-900">{h.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brand-50 py-20">
        <div className="container-x">
          <SectionHead title="Learning spaces" lead="Rooms and resources that support classroom teaching." />
          <div className="grid gap-5 md:grid-cols-3">
            {tiles.filter((t) => t.bullets.length > 0).map((t) => (
              <article key={t.id} className="overflow-hidden rounded-3xl border border-line bg-white">
                <div className="aspect-[16/10] bg-white">
                  <Img src={t.image} alt="" fit={t.fit === "contain" ? "contain" : "cover"} focus={t.focus} label={t.title} className={`h-full w-full ${t.fit === "contain" ? "p-8" : ""}`} />
                </div>
                <div className="p-7">
                  <h3 className="flex items-center gap-2 text-xl text-brand-900"><Icon name={t.icon} className="h-5 w-5 text-brand-700" />{t.title}</h3>
                  <ul className="mt-3 grid gap-1.5">
                    {t.bullets.map((b) => (<li key={b} className="flex items-center gap-2 text-muted"><Icon name="check" className="h-4 w-4 flex-none text-brand-600" />{b}</li>))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
