import Link from "next/link";
import { getSettings, getSlides, getStages, getTiles, getHouses, getEvents, getNotices, paragraphs } from "@/lib/content";
import { Hero } from "@/components/Hero";
import { Img } from "@/components/Img";
import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/PageHero";
import { VideoModal } from "@/components/VideoModal";
import { formatDate } from "@/lib/format";
import { IMG } from "@/lib/defaults";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [s, slides, stages, tiles, houses, events, notices] = await Promise.all([
    getSettings(), getSlides(), getStages(), getTiles(), getHouses(), getEvents(), getNotices(),
  ]);
  const active = slides.filter((x) => x.active);
  const principalFirst = paragraphs(s.principalMessage)[0] ?? "";
  const trustFirst = paragraphs(s.trustText)[0] ?? "";

  return (
    <>
      <Hero slides={active} />

      {/* Letterhead and key facts */}
      <section aria-label="School facts" className="bg-white">
        <div className="container-x pt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.letterhead} alt={`${s.name}, an English medium co-educational secondary school affiliated to CBSE, New Delhi. Affiliation no. ${s.affiliationNo}, school code ${s.schoolCode}.`} className="mx-auto h-auto max-h-28 w-full object-contain" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.shadow} alt="" aria-hidden="true" className="mx-auto -mt-1 h-6 w-full max-w-4xl opacity-60" />
        </div>
        <dl className="container-x grid grid-cols-2 gap-x-6 gap-y-5 pb-10 pt-4 lg:grid-cols-4">
          {[
            ["Established", `${s.established}, Jaipur`, "flag"],
            ["Board", `CBSE, affiliation no. ${s.affiliationNo}`, "cap"],
            ["Classes", "Nursery to Class X", "book"],
            ["Medium", "English, with Hindi and Sanskrit", "child"],
          ].map(([k, v, icon]) => (
            <div key={k} className="flex items-start gap-3 rounded-2xl border border-line bg-brand-50/60 p-4">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand-700 text-white"><Icon name={icon} className="h-5 w-5" /></span>
              <div>
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="font-display text-lg font-semibold leading-snug text-brand-900">{v}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* Shared vision */}
      <section className="relative overflow-hidden bg-brand-50 py-20 sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.logo} alt="" aria-hidden="true" className="pointer-events-none absolute -right-24 -top-16 hidden w-[420px] rounded-full opacity-[.06] lg:block" />
        <div className="container-x relative">
          <SectionHead eyebrow="Leadership" title="A shared vision for every child" lead="The school was founded to fulfil the dream of Late Shri Hari Ram Saboo. Four decades on, that dream still guides how we teach." />
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-brand-900/5 sm:grid-cols-[220px_1fr]">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full">
                <Img src={s.principalPhoto} alt={`${s.principalName}, ${s.principalTitle}`} focus="top" className="absolute inset-0 h-full w-full" label="HKM" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="eyebrow">Message</p>
                <h3 className="mt-2 text-2xl text-brand-900">Hear from our Principal</h3>
                <p className="mt-3 text-muted">{principalFirst}</p>
                <p className="mt-4 border-t-2 border-leaf pt-3"><span className="block font-display text-lg font-semibold">{s.principalName}</span><span className="text-sm text-muted">{s.principalTitle}</span></p>
                <Link href="/about#principal" className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline">Read the full message<Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            </article>

            <article className="grid overflow-hidden rounded-[2rem] bg-brand-800 text-white shadow-xl shadow-brand-900/10 sm:grid-cols-[1fr_220px]">
              <div className="order-2 p-6 sm:order-1 sm:p-8">
                <p className="eyebrow !text-leaf">Management</p>
                <h3 className="mt-2 text-2xl text-white">Run by a charitable trust</h3>
                <p className="mt-3 text-brand-100">{trustFirst}</p>
                <p className="mt-4 border-t-2 border-leaf pt-3"><span className="block font-display text-lg font-semibold">{s.trustName}</span><span className="text-sm text-brand-100">School management</span></p>
                <Link href="/about#trust" className="mt-4 inline-flex items-center gap-2 font-semibold text-white hover:underline">Read our story<Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
              <div className="relative order-1 aspect-[4/3] sm:order-2 sm:aspect-auto sm:h-full">
                <Img src={s.trustImage} alt="The school building in Subhash Nagar, Jaipur" focus="left" className="absolute inset-0 h-full w-full" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Stages, shown as photo cards */}
      <section className="container-x py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Our school" title="From the first day to Class X" lead="One campus, three stages. Children move up together with teachers who know where they started." className="!mb-0" />
          <Link href="/curriculum" className="btn btn-ghost">Our curriculum<Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stages.map((st) => (
            <Link key={st.id} href="/curriculum" className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-900/10">
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
                <Img src={st.image} alt="" focus={st.focus} className="h-full w-full transition duration-700 group-hover:scale-105" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent" />
                <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700 shadow"><Icon name={st.icon} className="h-5 w-5" /></span>
                <span className="absolute bottom-4 left-4 rounded-full bg-leaf px-3 py-1 text-sm font-bold text-brand-900">{st.classes}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl text-brand-900">{st.title}</h3>
                <p className="mt-2 text-muted">{st.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 font-semibold text-brand-700">Explore<Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        {houses.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <h3 className="mr-2 text-xl text-brand-900">Our houses</h3>
            {houses.map((h) => (
              <span key={h.id} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold">
                <i className="block h-3.5 w-3.5 rounded-full" style={{ background: h.color }} />{h.name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Path forward: image tiles */}
      <section className="bg-brand-900 py-20 text-white sm:py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-center gap-6">
            <span className="h-20 w-20 flex-none overflow-hidden rounded-full border-4 border-white/20 bg-white">
              <Img src={s.logoUrl} alt="" fit="contain" className="h-full w-full" />
            </span>
            <div className="max-w-2xl">
              <p className="eyebrow !text-leaf">New directions</p>
              <h2 className="mt-2 text-3xl text-white sm:text-4xl">Discover the path forward</h2>
              <p className="mt-3 text-lg text-brand-100">Teaching, spaces and habits that help children learn well and grow with confidence.</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {tiles.map((t) => {
              const contain = t.fit === "contain";
              return (
                <Link
                  key={t.id}
                  href={t.href || "/curriculum"}
                  className={`group flex flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 ${t.size === "wide" ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <div className={`relative aspect-[16/10] overflow-hidden ${contain ? "border-b border-line bg-white" : "bg-brand-50"}`}>
                    <Img src={t.image} alt="" fit={contain ? "contain" : "cover"} focus={t.focus} label={t.title} className={`h-full w-full transition duration-700 group-hover:scale-105 ${contain ? "p-8" : ""}`} />
                    {!contain && <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent" />}
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-brand-700 px-3 py-1.5 text-sm font-semibold text-white shadow">
                      <Icon name={t.icon} className="h-4 w-4" />{t.title}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {t.text && <p className="text-muted">{t.text}</p>}
                    {t.bullets.length > 0 && (
                      <ul className="grid gap-1.5">
                        {t.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-muted"><Icon name="check" className="h-4 w-4 flex-none text-brand-600" />{b}</li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 font-semibold text-brand-700">Learn more<Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest */}
      {(events.length > 0 || notices.length > 0) && (
        <section className="py-20 sm:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            {events.length > 0 && (
              <div>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <h2 className="text-3xl text-brand-900 sm:text-4xl">Latest events</h2>
                  <Link href="/events" className="font-semibold text-brand-700 hover:underline">All events</Link>
                </div>
                <ul className="grid gap-4">
                  {events.slice(0, 3).map((e) => (
                    <li key={e.id}>
                      <Link href={`/events/${e.slug}`} className="grid gap-4 rounded-3xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/5 sm:grid-cols-[160px_1fr]">
                        <Img src={e.image || IMG.campus} alt="" className="aspect-[4/3] w-full rounded-2xl" label="Event" />
                        <div className="py-1">
                          <p className="text-sm font-semibold text-brand-700">{formatDate(e.date)}</p>
                          <h3 className="mt-1 text-xl text-brand-900">{e.title}</h3>
                          <p className="mt-1 line-clamp-2 text-muted">{e.summary}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {notices.length > 0 && (
              <div>
                <div className="mb-8 flex items-end justify-between gap-4">
                  <h2 className="text-3xl text-brand-900 sm:text-4xl">Notices</h2>
                  <Link href="/notices" className="font-semibold text-brand-700 hover:underline">All notices</Link>
                </div>
                <ul className="grid divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
                  {notices.slice(0, 5).map((n) => (
                    <li key={n.id} className="flex gap-4 p-5">
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name="book" className="h-5 w-5" /></span>
                      <div>
                        <p className="text-sm text-muted">{formatDate(n.date)} &middot; {n.category}</p>
                        {n.url ? <a href={n.url} className="mt-1 block font-semibold text-brand-800 hover:underline">{n.title}</a> : <p className="mt-1 font-semibold">{n.title}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Admissions banner on the gate photo */}
      <section className="relative isolate overflow-hidden bg-brand-900 text-white">
        <Img src={IMG.gate} alt="" className="absolute inset-0 -z-10 h-full w-full" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/95 via-brand-900/85 to-brand-800/60" />
        <div className="container-x grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow !text-leaf">Admissions</p>
            <h2 className="mt-3 text-4xl text-white sm:text-5xl">Your child&apos;s place is waiting</h2>
            <p className="mt-4 max-w-lg text-lg text-brand-100">Join a school that has been part of Shastri Nagar for over forty years. Tell us about your child and we will call you back.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/admissions" className="btn btn-white">Inquire now<Icon name="arrow" className="h-4 w-4" /></Link>
              <Link href="/contact" className="btn btn-outline-white">Visit the school</Link>
            </div>
          </div>
          <VideoModal videoId={s.tourVideoId} label="Take the school tour" />
        </div>
      </section>
    </>
  );
}
