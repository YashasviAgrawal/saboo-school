// Fills the file store with clearly labelled SAMPLE content so you can see the dynamic sections.
// Run: npm run seed:demo      Remove: delete the files in data/store (or edit them in /admin).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const dir = process.env.DATA_DIR || path.join(process.cwd(), "data", "store");
await mkdir(dir, { recursive: true });
const put = (k, v) => writeFile(path.join(dir, `${k}.json`), JSON.stringify(v, null, 2));
const day = (offset) => new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10);

await put("notices", [
  { id: "n1", title: "Sample notice: school timing for the winter season", date: day(-2), category: "Circular", url: "", pinned: true, active: true },
  { id: "n2", title: "Sample notice: admission enquiries are open", date: day(-6), category: "Admission", url: "", pinned: true, active: true },
  { id: "n3", title: "Sample notice: holiday on account of a festival", date: day(-12), category: "Holiday", url: "", pinned: false, active: true },
]);

await put("events", [
  { id: "e1", slug: "sample-annual-function", title: "Sample event: Annual Function", date: day(20), endDate: "", venue: "School auditorium",
    summary: "A sample upcoming event to show how events appear on the site.",
    body: "This is sample text. Replace it from the admin panel.\n\nSecond paragraph of the sample description.", image: "", gallery: [], active: true },
  { id: "e2", slug: "sample-navratri-celebration", title: "Sample event: Navratri Celebration", date: day(-30), endDate: "", venue: "School campus",
    summary: "A sample past event, shown under Past events.", body: "Sample description.", image: "", gallery: [], active: true },
]);

await put("awards", [
  { id: "a1", title: "Sample award: Inter-school drawing competition", year: String(new Date().getFullYear()), description: "Sample text. Replace it from the admin panel.", image: "" },
]);

await put("careers", [
  { id: "c1", title: "Sample opening: Primary Teacher", type: "Full time", description: "Sample description of the role.", applyEmail: "", active: true },
]);

await put("tcRecords", [
  { id: "t1", tcNumber: "DEMO-001", studentName: "Sample Student", className: "Class X", dob: "2010-01-15", issueDate: day(-60), fileUrl: "" },
]);

console.log("Sample content written to", dir);
