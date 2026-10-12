import Link from "next/link";
import type { Focus } from "@/lib/types";
import { IMG } from "@/lib/defaults";
import { Img } from "./Img";

/** Inner-page banner: a campus photo under a green wash, with breadcrumb and title. */
export function PageHero({
  title,
  lead,
  crumb,
  image = IMG.campus,
  focus = "center",
}: {
  title: string;
  lead?: string;
  crumb?: { href: string; label: string }[];
  image?: string;
  focus?: Focus;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 text-white">
      <Img src={image} alt="" focus={focus} eager className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-900/40" />
      <div className="container-x relative py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-brand-100">
          <Link href="/" className="hover:text-white hover:underline">Home</Link>
          {crumb?.map((c) => (
            <span key={c.href}> / <Link href={c.href} className="hover:text-white hover:underline">{c.label}</Link></span>
          ))}
          <span> / <span className="text-white">{title}</span></span>
        </nav>
        <h1 className="max-w-3xl text-4xl text-white sm:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-brand-50/90">{lead}</p>}
      </div>
      <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-leaf via-brand-400 to-brand-700" />
    </section>
  );
}

export function SectionHead({
  title,
  lead,
  eyebrow,
  className = "",
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl text-brand-900 sm:text-4xl">{title}</h2>
      {lead && <p className="mt-3 text-lg text-muted">{lead}</p>}
    </div>
  );
}

export function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
      <h3 className="text-xl text-brand-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-muted">{text}</p>
    </div>
  );
}
