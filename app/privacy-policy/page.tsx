import type { Metadata } from "next";
import { getSettings } from "@/lib/content";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy policy" };
export const dynamic = "force-dynamic";

// Starter text. Have the school or its legal adviser review it before launch.
export default async function Privacy() {
  const s = await getSettings();
  return (
    <>
      <PageHero title="Privacy policy" lead="How this website handles the details you share with the school." />
      <div className="container-x max-w-3xl py-16">
        <div className="prose-sps [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-brand-900">
          <h2>What we collect</h2>
          <p>When you send an admission enquiry we collect the parent&apos;s name, phone number, the child&apos;s name and class, and any message you type. When you verify a transfer certificate we use the TC number and date of birth you enter only to check them against the school&apos;s records.</p>
          <h2>How we use it</h2>
          <p>We use enquiry details only to contact you about admission. We do not sell your details or use them for advertising.</p>
          <h2>Who can see it</h2>
          <p>Enquiries are visible to authorised staff of {s.name}. They are stored on the school&apos;s own systems or with its hosting and database providers.</p>
          <h2>Children&apos;s information</h2>
          <p>We never publish student names, photographs or certificates without the permission of a parent or guardian.</p>
          <h2>Your choices</h2>
          <p>To see, correct or delete the details you sent, write to {s.email} or call the school office.</p>
        </div>
      </div>
    </>
  );
}
