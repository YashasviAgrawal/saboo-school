import * as D from "./defaults";

export type FieldType = "text" | "textarea" | "lines" | "date" | "url" | "image" | "select" | "boolean" | "color";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  readonly?: boolean;
  urls?: boolean;
  help?: string;
  max?: number;
};

export type CollectionDef = {
  key: string;
  label: string;
  description: string;
  kind: "list" | "single";
  titleField: string;
  fields: Field[];
  canAdd: boolean;
  canDelete: boolean;
  defaults: unknown;
};

const t = (name: string, label: string, extra: Partial<Field> = {}): Field => ({ name, label, type: "text", ...extra });
const ta = (name: string, label: string, extra: Partial<Field> = {}): Field => ({ name, label, type: "textarea", ...extra });
const FOCUS_FIELD: Field = {
  name: "focus",
  label: "Photo focus",
  type: "select",
  options: ["center", "top", "bottom", "left", "right"],
  help: "Which part of the photo stays in view when it is cropped.",
};

export const collections: CollectionDef[] = [
  {
    key: "settings",
    label: "School details",
    description: "Name, contacts, social links, Principal and Trust messages. These show across the whole site.",
    kind: "single",
    titleField: "name",
    canAdd: false,
    canDelete: false,
    defaults: D.defaultSettings,
    fields: [
      t("name", "Full school name", { required: true }),
      t("shortName", "Short name (header)", { required: true }),
      t("tagline", "Tagline"),
      ta("description", "Search engine description", { max: 300 }),
      t("topBarText", "Top bar message"),
      ta("address", "Address", { help: "One line per row." }),
      ta("phones", "Phone numbers", { help: "One number per line.", max: 300 }),
      t("email", "Email"),
      { name: "mapUrl", label: "Google Maps link", type: "url" },
      { name: "facebook", label: "Facebook link", type: "url" },
      { name: "instagram", label: "Instagram link", type: "url" },
      { name: "youtube", label: "YouTube link", type: "url" },
      t("tourVideoId", "School tour YouTube video ID", { help: "The part after v= in the YouTube link." }),
      t("established", "Year established"),
      t("affiliationNo", "CBSE affiliation number"),
      t("schoolCode", "CBSE school code"),
      { name: "logoUrl", label: "Logo", type: "image" },
      t("principalName", "Principal's name"),
      t("principalTitle", "Principal's title"),
      { name: "principalPhoto", label: "Principal's photo", type: "image" },
      ta("principalMessage", "Principal's message", { help: "Leave a blank line between paragraphs. Get the Principal's approval before publishing.", max: 3000 }),
      t("trustName", "Trust name"),
      ta("trustText", "About the Trust", { max: 3000 }),
      { name: "trustImage", label: "Trust section image", type: "image" },
      ta("admissionNursery", "Admission note: Nursery to UKG"),
      ta("admissionHigher", "Admission note: Class I and above"),
    ],
  },
  {
    key: "slides",
    label: "Home slides",
    description: "The large banner slides on the home page. Drag order is the list order.",
    kind: "list",
    titleField: "title",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultSlides,
    fields: [
      t("title", "Headline", { required: true, max: 120 }),
      ta("text", "Supporting text", { max: 300 }),
      { name: "image", label: "Image", type: "image" },
      { name: "fit", label: "Image fit", type: "select", options: ["cover", "contain"], help: "Use contain for logos." },
      FOCUS_FIELD,
      t("ctaLabel", "Button label"),
      { name: "ctaHref", label: "Button link", type: "url", help: "A page like /admissions or a full https link." },
      { name: "active", label: "Show on site", type: "boolean" },
    ],
  },
  {
    key: "notices",
    label: "Notices and circulars",
    description: "Appear on the Publication page. Pinned notices also scroll in the top bar.",
    kind: "list",
    titleField: "title",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultNotices,
    fields: [
      t("title", "Title", { required: true, max: 160 }),
      { name: "date", label: "Date", type: "date", required: true },
      { name: "category", label: "Category", type: "select", options: ["Circular", "Admission", "Exam", "Holiday", "General"] },
      { name: "url", label: "PDF or page link", type: "url" },
      { name: "pinned", label: "Pin to top bar", type: "boolean" },
      { name: "active", label: "Show on site", type: "boolean" },
    ],
  },
  {
    key: "events",
    label: "Events",
    description: "Each event gets its own page. Use the slug for the web address, for example annual-day-2026.",
    kind: "list",
    titleField: "title",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultEvents,
    fields: [
      t("title", "Title", { required: true, max: 140 }),
      t("slug", "Web address slug", { required: true, help: "Lowercase letters, numbers and hyphens." }),
      { name: "date", label: "Start date", type: "date", required: true },
      { name: "endDate", label: "End date (optional)", type: "date" },
      t("venue", "Venue"),
      ta("summary", "Short summary", { max: 300 }),
      ta("body", "Full description", { max: 8000, help: "Leave a blank line between paragraphs." }),
      { name: "image", label: "Cover image", type: "image" },
      { name: "gallery", label: "Photo links", type: "lines", urls: true, help: "One image link per line." },
      { name: "active", label: "Show on site", type: "boolean" },
    ],
  },
  {
    key: "awards",
    label: "Awards and achievements",
    description: "Shown on the Awards page.",
    kind: "list",
    titleField: "title",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultAwards,
    fields: [
      t("title", "Title", { required: true }),
      t("year", "Year"),
      ta("description", "Description", { max: 600 }),
      { name: "image", label: "Photo", type: "image" },
    ],
  },
  {
    key: "careers",
    label: "Careers",
    description: "Job openings for the Careers page.",
    kind: "list",
    titleField: "title",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultJobs,
    fields: [
      t("title", "Role", { required: true }),
      { name: "type", label: "Type", type: "select", options: ["Full time", "Part time", "Contract"] },
      ta("description", "Description", { max: 3000 }),
      t("applyEmail", "Apply to email"),
      { name: "active", label: "Show on site", type: "boolean" },
    ],
  },
  {
    key: "gallery",
    label: "Photo gallery",
    description: "Photos for the Life at SPS page.",
    kind: "list",
    titleField: "caption",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultGallery,
    fields: [{ name: "image", label: "Image", type: "image", required: true }, t("caption", "Caption")],
  },
  {
    key: "stages",
    label: "Learning stages",
    description: "The three stage cards on the home and curriculum pages.",
    kind: "list",
    titleField: "title",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultStages,
    fields: [
      t("title", "Title", { required: true }),
      t("classes", "Classes"),
      ta("text", "Description", { max: 400 }),
      { name: "image", label: "Photo", type: "image" },
      FOCUS_FIELD,
      { name: "icon", label: "Icon", type: "select", options: ["child", "book", "cap", "flask", "flag", "screen", "building"] },
    ],
  },
  {
    key: "tiles",
    label: "Path forward tiles",
    description: "The tiles in the Discover the path forward section.",
    kind: "list",
    titleField: "title",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultTiles,
    fields: [
      t("title", "Title", { required: true }),
      ta("text", "Description", { max: 500 }),
      { name: "bullets", label: "Bullet points", type: "lines", help: "One per line." },
      { name: "image", label: "Image", type: "image" },
      { name: "fit", label: "Image fit", type: "select", options: ["cover", "contain"], help: "Use contain for logos." },
      FOCUS_FIELD,
      { name: "icon", label: "Icon", type: "select", options: ["child", "book", "cap", "flask", "flag", "screen", "building"] },
      { name: "size", label: "Size", type: "select", options: ["wide", "normal"] },
      { name: "href", label: "Link", type: "url" },
    ],
  },
  {
    key: "houses",
    label: "Houses",
    description: "House names and colours.",
    kind: "list",
    titleField: "name",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultHouses,
    fields: [t("name", "Name", { required: true }), { name: "color", label: "Colour", type: "color" }],
  },
  {
    key: "disclosure",
    label: "Mandatory disclosure",
    description: "Rows on the Mandatory Disclosure page. Add a document link for each row once the school has it ready.",
    kind: "list",
    titleField: "label",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultDisclosure,
    fields: [
      t("label", "Item", { required: true }),
      ta("value", "Details", { max: 1000 }),
      { name: "url", label: "Document link", type: "url" },
    ],
  },
  {
    key: "tcRecords",
    label: "Transfer certificates",
    description: "Records parents can verify with the TC number and date of birth. Nothing here is shown publicly as a list.",
    kind: "list",
    titleField: "tcNumber",
    canAdd: true,
    canDelete: true,
    defaults: D.defaultTcRecords,
    fields: [
      t("tcNumber", "TC number", { required: true }),
      t("studentName", "Student name", { required: true }),
      t("className", "Class"),
      { name: "dob", label: "Date of birth", type: "date", required: true },
      { name: "issueDate", label: "Issue date", type: "date" },
      { name: "fileUrl", label: "Scanned TC link (optional)", type: "url" },
    ],
  },
  {
    key: "enquiries",
    label: "Admission enquiries",
    description: "Enquiries from the website form, newest first. Update the status as you follow up.",
    kind: "list",
    titleField: "parent",
    canAdd: false,
    canDelete: true,
    defaults: D.defaultEnquiries,
    fields: [
      { name: "createdAt", label: "Received", type: "text", readonly: true },
      t("parent", "Parent", { readonly: true }),
      t("phone", "Phone", { readonly: true }),
      t("child", "Child", { readonly: true }),
      t("cls", "Class", { readonly: true }),
      ta("message", "Message", { readonly: true }),
      { name: "status", label: "Status", type: "select", options: ["new", "contacted", "visited", "admitted", "closed"] },
    ],
  },
];

export const collectionMap: Record<string, CollectionDef> = Object.fromEntries(collections.map((c) => [c.key, c]));

const safeUrl = (v: string) => v === "" || /^https?:\/\//i.test(v) || v.startsWith("/") || v.startsWith("#");

function coerce(f: Field, raw: unknown): unknown {
  switch (f.type) {
    case "boolean":
      return raw === true || raw === "true";
    case "lines": {
      const arr = Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split("\n") : [];
      const out = arr.map((s) => String(s).trim()).filter(Boolean).slice(0, 60).map((s) => s.slice(0, 500));
      return f.urls ? out.filter(safeUrl) : out;
    }
    case "select": {
      const s = String(raw ?? "");
      return f.options?.includes(s) ? s : f.options?.[0] ?? "";
    }
    case "date": {
      const s = String(raw ?? "").trim();
      return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
    }
    case "color": {
      const s = String(raw ?? "").trim();
      return /^#[0-9a-f]{6}$/i.test(s) ? s : "#0b6b42";
    }
    case "url":
    case "image": {
      const s = String(raw ?? "").trim().slice(0, 1000);
      return safeUrl(s) ? s : "";
    }
    case "textarea":
      return String(raw ?? "").slice(0, f.max ?? 8000).replace(/\r\n/g, "\n");
    default:
      return String(raw ?? "").trim().slice(0, f.max ?? 500);
  }
}

export function sanitizeObject(def: CollectionDef, raw: Record<string, unknown>, existing?: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const f of def.fields) {
    out[f.name] = f.readonly && existing ? existing[f.name] : coerce(f, raw[f.name]);
  }
  return out;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
