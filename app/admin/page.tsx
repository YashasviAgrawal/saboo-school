import type { Metadata } from "next";
import { adminEnabled, isAdmin } from "@/lib/auth";
import { collections } from "@/lib/schema";
import { storageDriver } from "@/lib/store";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminApp } from "@/components/admin/AdminApp";

export const metadata: Metadata = { title: "School admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminEnabled()) {
    return (
      <section className="container-x max-w-2xl py-24">
        <h1 className="text-3xl text-brand-900">Admin is switched off</h1>
        <p className="mt-3 text-muted">Set the <code className="rounded bg-brand-50 px-1.5 py-0.5">ADMIN_PASSWORD</code> environment variable, restart the server, and reload this page.</p>
      </section>
    );
  }
  if (!(await isAdmin())) return <AdminLogin />;

  const metas = collections.map((c) => ({
    key: c.key, label: c.label, description: c.description, kind: c.kind, titleField: c.titleField,
    fields: c.fields, canAdd: c.canAdd, canDelete: c.canDelete,
  }));
  return <AdminApp collections={metas} driver={storageDriver} />;
}
