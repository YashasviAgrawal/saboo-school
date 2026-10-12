import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import { getSettings, lines } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { telHref } from "@/lib/format";

export const metadata: Metadata = { title: "Contact", description: "Address, phone numbers and email of Shri Hari Ram Saboo Public School, Shastri Nagar, Jaipur." };
export const dynamic = "force-dynamic";

export default async function Contact() {
  const s = await getSettings();
  const cards = [
    { icon: "pin", title: "Address", body: <address className="not-italic text-muted">{s.name}<br />{lines(s.address).map((l) => (<span key={l}>{l}<br /></span>))}</address>, action: <a className="btn btn-ghost mt-4" href={s.mapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a> },
    { icon: "phone", title: "Phone", body: <p className="grid gap-1">{lines(s.phones).map((p) => (<a key={p} href={telHref(p)} className="font-semibold text-ink hover:text-brand-700">{p}</a>))}</p> },
    { icon: "mail", title: "Email", body: <a href={`mailto:${s.email}`} className="break-all font-semibold text-ink hover:text-brand-700">{s.email}</a> },
  ];
  return (
    <>
      <PageHero image={IMG.gate} focus="right" title="Contact" lead="Parents are welcome at the school office on any working day. Please call ahead so we can make time for you." />
      <div className="container-x grid gap-6 py-16 md:grid-cols-3">
        {cards.map((c) => (
          <section key={c.title} className="rounded-3xl border border-line bg-white p-7">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700"><Icon name={c.icon} className="h-6 w-6" /></span>
            <h2 className="mb-2 text-xl text-brand-900">{c.title}</h2>
            {c.body}
            {c.action}
          </section>
        ))}
      </div>
    </>
  );
}
