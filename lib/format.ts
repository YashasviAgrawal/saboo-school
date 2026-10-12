export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-IN", { ...opts, timeZone: "UTC" }).format(d);
}

export const telHref = (num: string) => `tel:${num.replace(/[^\d+]/g, "")}`;
