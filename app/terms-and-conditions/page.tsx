import type { Metadata } from "next";
import { getSettings } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Terms and conditions" };
export const dynamic = "force-dynamic";

// Starter text. Have the school or its legal adviser review it before launch.
export default async function Terms() {
  const s = await getSettings();
  return (
    <>
      <PageHero title="Terms and conditions" lead="Please read these terms before using this website." />
      <div className="container-x max-w-3xl py-16">
        <div className="prose-sps [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-brand-900">
          <h2>About this website</h2>
          <p>This website is run by {s.name}. It gives general information about the school, its admissions and its activities.</p>
          <h2>Accuracy</h2>
          <p>We try to keep the information current. Fees, dates and rules can change, so please confirm important details with the school office before acting on them.</p>
          <h2>Admission enquiries</h2>
          <p>Sending an enquiry does not guarantee admission. Admission follows the school&apos;s published process and the management&apos;s decision.</p>
          <h2>Content</h2>
          <p>The text, photographs and logo on this website belong to the school or their owners. Please do not copy or reuse them without permission.</p>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent to {s.email}.</p>
        </div>
      </div>
    </>
  );
}
