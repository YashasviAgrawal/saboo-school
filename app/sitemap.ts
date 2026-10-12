import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/content";

export const dynamic = "force-dynamic";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();
  const pages = ["", "/about", "/curriculum", "/life", "/events", "/notices", "/awards", "/careers", "/admissions", "/contact", "/mandatory-disclosure", "/tc-verify"];
  return [
    ...pages.map((p) => ({ url: `${SITE}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...events.map((e) => ({ url: `${SITE}/events/${e.slug}`, lastModified: e.date, priority: 0.5 })),
  ];
}
