import "server-only";
import { readJSON } from "./store";
import * as D from "./defaults";
import type {
  Settings, Slide, Stage, Tile, House, Notice, EventItem, Award, Job, GalleryItem, DisclosureRow, TcRecord, Enquiry,
} from "./types";

export async function getSettings(): Promise<Settings> {
  const s = await readJSON<Partial<Settings>>("settings", {});
  return { ...D.defaultSettings, ...s };
}

export const getSlides = () => readJSON<Slide[]>("slides", D.defaultSlides);
export const getStages = () => readJSON<Stage[]>("stages", D.defaultStages);
export const getTiles = () => readJSON<Tile[]>("tiles", D.defaultTiles);
export const getHouses = () => readJSON<House[]>("houses", D.defaultHouses);
export const getGallery = () => readJSON<GalleryItem[]>("gallery", D.defaultGallery);
export const getDisclosure = () => readJSON<DisclosureRow[]>("disclosure", D.defaultDisclosure);
export const getAwards = () => readJSON<Award[]>("awards", D.defaultAwards);
export const getTcRecords = () => readJSON<TcRecord[]>("tcRecords", D.defaultTcRecords);
export const getEnquiries = () => readJSON<Enquiry[]>("enquiries", D.defaultEnquiries);

export async function getNotices(): Promise<Notice[]> {
  const all = await readJSON<Notice[]>("notices", D.defaultNotices);
  return all.filter((n) => n.active).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEvents(): Promise<EventItem[]> {
  const all = await readJSON<EventItem[]>("events", D.defaultEvents);
  return all.filter((e) => e.active).sort((a, b) => b.date.localeCompare(a.date));
}

export async function getJobs(): Promise<Job[]> {
  const all = await readJSON<Job[]>("careers", []);
  return all.filter((j) => j.active);
}

export const lines = (s: string | string[] | undefined) =>
  (Array.isArray(s) ? s : String(s ?? "").split("\n")).map((x) => String(x).trim()).filter(Boolean);
export const paragraphs = (s: string) => s.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
