import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import { getSettings, paragraphs } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/Img";

export const metadata: Metadata = { title: "Who we are", description: "The story, management and leadership of Shri Hari Ram Saboo Public School, Jaipur." };
export const dynamic = "force-dynamic";

export default async function About() {
  const s = await getSettings();
  const timeline = [
    { when: "1981", text: "The foundation stone is laid to fulfil the dream of Late Shri Hari Ram Saboo." },
    { when: "21 February 1985", text: "Late Shri G. P. Birla inaugurates the school." },
    { when: "July 1985", text: "The first classes begin." },
    { when: "Today", text: `A CBSE school for Nursery to Class X, affiliated under no. ${s.affiliationNo}.` },
  ];

  return (
    <>
      <PageHero image={IMG.campus} focus="left" title="Who we are" lead="A neighbourhood school built on a founder's promise and run by a charitable trust." />

      <section id="principal" className="container-x grid items-center gap-10 py-20 md:grid-cols-[360px_1fr] md:gap-16">
        <div className="mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-t-full rounded-b-3xl border border-line bg-brand-50">
          <Img src={s.principalPhoto} alt={`${s.principalName}, ${s.principalTitle}`} focus="top" className="h-full w-full" label="HKM" />
        </div>
        <div>
          <h2 className="text-3xl text-brand-900 sm:text-4xl">From the Principal&apos;s desk</h2>
          <div className="prose-sps mt-5">{paragraphs(s.principalMessage).map((p, i) => (<p key={i}>{p}</p>))}</div>
          <p className="mt-2 inline-block border-t-2 border-leaf pt-3"><span className="block font-display text-xl font-semibold">{s.principalName}</span><span className="text-muted">{s.principalTitle}</span></p>
        </div>
      </section>

      <section id="trust" className="bg-brand-50 py-20">
        <div className="container-x grid items-center gap-10 md:grid-cols-[1fr_360px] md:gap-16">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl text-brand-900 sm:text-4xl">Run by a charitable trust</h2>
            <div className="prose-sps mt-5">{paragraphs(s.trustText).map((p, i) => (<p key={i}>{p}</p>))}</div>
            <p className="mt-2 inline-block border-t-2 border-leaf pt-3"><span className="block font-display text-xl font-semibold">{s.trustName}</span><span className="text-muted">School management</span></p>
          </div>
          <div className="order-1 mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-t-full rounded-b-3xl border border-line bg-white md:order-2">
            <Img src={s.trustImage} alt="The school building in Subhash Nagar, Jaipur" focus="left" className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="mb-12 grid items-center gap-8 md:grid-cols-[1fr_380px]">
          <div>
            <p className="eyebrow mb-3">Since 1985</p>
            <h2 className="text-3xl text-brand-900 sm:text-4xl">Our story</h2>
            <p className="mt-3 max-w-xl text-lg text-muted">Our emblem carries the words shraddha, gyan and karm: respect, knowledge and effort. They have guided the school from its first day.</p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-brand-900/5">
            <Img src={IMG.letterheadStacked} alt={`${s.name}: emblem and name. An English medium co-educational secondary school affiliated to CBSE, New Delhi.`} fit="contain" className="h-auto w-full" />
          </div>
        </div>
        <ol className="relative grid gap-8 md:grid-cols-4 md:gap-0">
          <span aria-hidden="true" className="absolute left-[11px] top-0 h-full w-0.5 bg-line md:left-0 md:top-[11px] md:h-0.5 md:w-full" />
          {timeline.map((t) => (
            <li key={t.when} className="relative pl-12 md:pl-0 md:pr-6 md:pt-10">
              <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 rounded-full border-[6px] border-brand-700 bg-white" />
              <time className="font-display text-xl font-semibold text-brand-900">{t.when}</time>
              <p className="mt-1 text-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
