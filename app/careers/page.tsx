import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import { getJobs, getSettings, paragraphs } from "@/lib/content";
import { PageHero, Empty } from "@/components/PageHero";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Careers", description: "Teaching and staff openings at Shri Hari Ram Saboo Public School." };
export const dynamic = "force-dynamic";

export default async function Careers() {
  const [jobs, s] = await Promise.all([getJobs(), getSettings()]);
  return (
    <>
      <PageHero image={IMG.campus} focus="left" title="Careers" lead="Join the team that teaches and looks after our students." />
      <div className="container-x py-16">
        {jobs.length === 0 ? (
          <Empty title="No openings right now" text={`You can still send your resume to ${s.email}. We keep it on file for future vacancies.`} />
        ) : (
          <ul className="grid gap-5">
            {jobs.map((j) => (
              <li key={j.id} className="rounded-3xl border border-line bg-white p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl text-brand-900">{j.title}</h2>
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800">{j.type}</span>
                </div>
                <div className="prose-sps mt-4">{paragraphs(j.description).map((p, i) => (<p key={i}>{p}</p>))}</div>
                <p className="mt-2 flex items-center gap-2 font-semibold text-brand-700"><Icon name="mail" className="h-4 w-4" />Apply at <span className="break-all">{j.applyEmail || s.email}</span></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
