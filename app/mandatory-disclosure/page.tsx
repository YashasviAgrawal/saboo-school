import type { Metadata } from "next";
import { getDisclosure } from "@/lib/content";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Mandatory disclosure", description: "CBSE mandatory public disclosure for Shri Hari Ram Saboo Public School." };
export const dynamic = "force-dynamic";

export default async function Disclosure() {
  const rows = await getDisclosure();
  return (
    <>
      <PageHero title="Mandatory disclosure" lead="Information that CBSE requires every affiliated school to publish on its website." />
      <div className="container-x py-16">
        <div className="overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[560px] text-left">
            <caption className="sr-only">Mandatory public disclosure</caption>
            <thead className="bg-brand-50 text-sm text-brand-900">
              <tr><th scope="col" className="p-4 font-semibold">Item</th><th scope="col" className="p-4 font-semibold">Details</th><th scope="col" className="p-4 font-semibold">Document</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.id} className="align-top">
                  <th scope="row" className="w-1/3 p-4 font-semibold text-ink">{r.label}</th>
                  <td className="p-4 text-muted">{r.value || <span className="italic text-muted/70">Not yet published</span>}</td>
                  <td className="p-4">
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:underline"><Icon name="file" className="h-4 w-4" />Open</a>
                    ) : (
                      <span className="text-muted/70">&ndash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
