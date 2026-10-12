import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSettings, getNotices } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { lines } from "@/lib/content";

export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(SITE),
    title: { default: `${s.name}, Jaipur`, template: `%s | ${s.shortName}` },
    description: s.description,
    openGraph: { title: s.name, description: s.description, type: "website", locale: "en_IN" },
    alternates: { canonical: "/" },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b6b42" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [s, notices] = await Promise.all([getSettings(), getNotices()]);
  const pinned = notices.filter((n) => n.pinned).slice(0, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: s.name,
    url: SITE,
    telephone: lines(s.phones)[0],
    email: s.email,
    foundingDate: s.established,
    address: { "@type": "PostalAddress", streetAddress: lines(s.address)[0], addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    sameAs: [s.facebook, s.instagram, s.youtube].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white">
          Skip to main content
        </a>
        <Header settings={s} pinned={pinned.map((n) => ({ id: n.id, title: n.title, url: n.url }))} />
        <main id="main">{children}</main>
        <Footer settings={s} />
      </body>
    </html>
  );
}
