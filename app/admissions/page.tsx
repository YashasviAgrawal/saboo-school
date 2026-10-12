import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import { getSettings, lines } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { VideoModal } from "@/components/VideoModal";

export const metadata: Metadata = { title: "Admissions", description: "How to apply to Shri Hari Ram Saboo Public School, Jaipur, from Nursery to Class X." };
export const dynamic = "force-dynamic";

export default async function Admissions() {
  const s = await getSettings();
  const phone = lines(s.phones)[0];
  return (
    <>
      <PageHero image={IMG.gate} focus="center" title="Admissions" lead="Join a school that has been part of Shastri Nagar for over forty years. Tell us about your child and we will call you back." />
      <div className="container-x grid items-start gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <h2 className="text-3xl text-brand-900">How admission works</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="text-xl text-brand-900">Nursery to UKG</h3>
              <p className="mt-2 text-muted">{s.admissionNursery}</p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6">
              <h3 className="text-xl text-brand-900">Class I and above</h3>
              <p className="mt-2 text-muted">{s.admissionHigher}</p>
            </div>
          </div>
          <p className="mt-6 text-muted">Fees, the academic calendar and other required details are listed on the <a className="font-semibold text-brand-700 underline" href="/mandatory-disclosure">Mandatory disclosure</a> page. You can also ask the school office on <span className="font-semibold text-ink">{phone}</span>.</p>
          <div className="mt-10"><VideoModal videoId={s.tourVideoId} label="Take the school tour" /></div>
        </div>
        <div className="lg:sticky lg:top-32"><EnquiryForm phone={phone} /></div>
      </div>
    </>
  );
}
