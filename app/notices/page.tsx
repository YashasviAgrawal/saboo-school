import type { Metadata } from "next";
import { IMG } from "@/lib/defaults";
import Link from "next/link";
import { getNotices } from "@/lib/content";
import { PageHero, Empty } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Publication", description: "Notices, circulars and announcements from Shri Hari Ram Saboo Public School." };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ cat?: string }> };

export default async function Notices({ searchParams }: Props) {
  const { cat } = await searchParams;
  const all = await getNotices();
  const cats = Array.from(new Set(all.map((n) => n.category))).filter(Boolean);
  const list = cat ? all.filter((n) => n.category === cat) : all;

  return (
    <>
      <PageHero image={IMG.campus} focus="bottom" title="Publication" lead="Notices, circulars and announcements for parents and students." />
      <div className="container-x py-16">
        {cats.length > 0 && (
          <nav aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
            <Link href="/notices" className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${!cat ? "border-brand-700 bg-brand-700 text-white" : "border-line hover:bg-brand-50"}`}>All</Link>
            {cats.map((c) => (
              <Link key={c} href={`/notices?cat=${encodeURIComponent(c)}`} className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${cat === c ? "border-brand-700 bg-brand-700 text-white" : "border-line hover:bg-brand-50"}`}>{c}</Link>
            ))}
          </nav>
        )}
        {list.length === 0 ? (
          <Empty title="No notices to show" text="Circulars and announcements will be listed here when the school publishes them." />
        ) : (
          <ul className="grid divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {list.map((n) => (
              <li key={n.id} className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  <p className="text-sm text-muted">{formatDate(n.date)} &middot; {n.category}</p>
                  <p className="mt-1 text-lg font-semibold text-brand-900">{n.title}</p>
                </div>
                {n.url && (
                  <a href={n.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2">
                    <Icon name="file" className="h-4 w-4" />Open
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
