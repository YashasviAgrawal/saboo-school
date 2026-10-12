# Saboo Public School website

Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. White and green theme, layout modelled on nmajs.edu.in.

Everything the school will want to change lives in the **admin panel at `/admin`**, so nobody edits code to update the site.

## Run it

```bash
npm install
cp .env.example .env.local      # set ADMIN_PASSWORD at least
npm run dev                     # http://localhost:3000
npm run seed:demo               # optional: fills clearly labelled SAMPLE notices, events, awards, a job and a TC
```

Admin: open `/admin`, sign in with `ADMIN_PASSWORD`.

## What is dynamic

| Section | Where you edit it | Shows on |
|---|---|---|
| School details, contacts, social links, Principal and Trust text | Admin: School details | Header, footer, About, Contact, Admissions, SEO |
| Hero slides | Admin: Home slides | Home |
| Notices and circulars (pin one to show in the top bar) | Admin: Notices | Top bar, Home, Publication, Search |
| Events with their own pages and photo galleries | Admin: Events | Home, Events, `/events/[slug]`, sitemap |
| Awards, Careers, Photo gallery, Houses, Stages, Tiles | Admin | Matching pages |
| Mandatory disclosure rows with document links | Admin: Mandatory disclosure | `/mandatory-disclosure` |
| Transfer certificate records | Admin: Transfer certificates | `/tc-verify` (lookup by TC number and date of birth, never a public list) |
| Admission enquiries | Arrive from the website form | Admin: Admission enquiries (status, delete, CSV export) |

Also built in: site search, `sitemap.xml`, `robots.txt`, School schema markup (JSON-LD), per-page metadata, skip link, keyboard-friendly menus, reduced-motion support.

## Where data is stored

* **Default: JSON files** in `data/store` (override with `DATA_DIR`). Use this on a VPS or EC2 with a persistent disk. Back this folder up.
* **Supabase**, for Vercel or any read-only host. Run `supabase.sql`, then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The code switches over by itself.

Vercel without Supabase will lose admin edits, because its disk is read-only.

## Deploy

**Vercel + Supabase:** import the repo, add the env vars from `.env.example`, deploy.

**EC2 or any server:** `npm ci && npm run build && npm start` behind nginx, with `DATA_DIR` on a persistent path. Or use the included `Dockerfile` and mount a volume at `/data`.

Set `NEXT_PUBLIC_SITE_URL` to the real domain before building. It feeds the sitemap, canonical URLs and schema markup.

## Before going live

1. **Principal's message** (Admin: School details) is a draft written for this build. Get Mr. Maheshwari's approval or replace it.
2. **Fill the Mandatory disclosure rows** that are empty (fee structure, academic calendar, SMC details, three years of Class X results). CBSE expects these on the site.
3. **Facts to confirm:** that Tata ClassEdge is still in use, the "about 18 students per teacher" line (294 students and 16 teachers in UDISE+ data), and the activity list on Life at SPS.
4. **Photos** are self-hosted in `public/images`. Only two are real photographs (`campus.jpg`, `gate.jpg`), so the design reuses them with different crops (the "Photo focus" field in the admin). `letterhead*.jpg`, `logo.jpg` and `tata-classedge.jpg` are graphics: keep "Image fit" on contain for them. New photos of classrooms, labs, assemblies and events will lift the design the most. Upload them and set them on the slides, stage cards, tiles and gallery in the admin.
5. **Privacy policy and Terms** are starter text. Have them reviewed.
6. **Email:** the school still uses a rediffmail address. Create one on its own domain and update it in School details.
7. **TC records:** enter them in Admin: Transfer certificates, then remove the public TC lists from the old site.

## Security notes

* Admin uses one shared password and an HttpOnly, SameSite=Strict cookie that expires after 8 hours. Use a long password.
* Login, enquiry and TC lookups are rate limited in memory per server. If you run several servers, move this to Redis or Upstash.
* Admin writes are validated against `lib/schema.ts`: unknown fields are dropped, unsafe links (`javascript:`) are removed, enquiry details cannot be edited or invented.
* CSV export neutralises spreadsheet formulas.
* Optional `ENQUIRY_WEBHOOK_URL` forwards each new enquiry to Zapier, Make, n8n or your CRM.

## Project map

```
app/                 pages, API routes (enquiry, tc, admin)
components/          Hero, Header, Footer, forms, lightbox, admin UI
lib/defaults.ts      starting content (edit in /admin afterwards)
lib/schema.ts        every editable field, in one place
lib/store.ts         file and Supabase storage
```

To add an editable section: add a type in `lib/types.ts`, a default in `lib/defaults.ts`, an entry in `lib/schema.ts` (it appears in the admin automatically), then read it with a helper in `lib/content.ts`.
