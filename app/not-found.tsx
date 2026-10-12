import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-28 text-center">
      <p className="font-display text-7xl font-semibold text-brand-200">404</p>
      <h1 className="mt-4 text-4xl text-brand-900">This page could not be found</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">The link may be old or mistyped. Try the menu, or go back to the home page.</p>
      <Link href="/" className="btn mt-8">Back to home</Link>
    </section>
  );
}
