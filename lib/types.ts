export type Settings = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  address: string;
  phones: string; // one per line
  email: string;
  mapUrl: string;
  facebook: string;
  instagram: string;
  youtube: string;
  established: string;
  affiliationNo: string;
  schoolCode: string;
  tourVideoId: string;
  topBarText: string;
  logoUrl: string;
  principalName: string;
  principalTitle: string;
  principalPhoto: string;
  principalMessage: string;
  trustName: string;
  trustText: string;
  trustImage: string;
  admissionNursery: string;
  admissionHigher: string;
};

export type Slide = {
  id: string;
  title: string;
  text: string;
  image: string;
  fit: "cover" | "contain";
  focus?: Focus;
  ctaLabel: string;
  ctaHref: string;
  active: boolean;
};

/** Which part of a photo stays in view when it is cropped. */
export type Focus = "center" | "top" | "bottom" | "left" | "right";

export type Stage = { id: string; title: string; classes: string; text: string; icon: string; image?: string; focus?: Focus };
export type Tile = {
  id: string;
  title: string;
  text: string;
  bullets: string[];
  icon: string;
  size: "wide" | "normal";
  href: string;
  image?: string;
  fit?: "cover" | "contain";
  focus?: Focus;
};
export type House = { id: string; name: string; color: string };
export type Notice = { id: string; title: string; date: string; category: string; url: string; pinned: boolean; active: boolean };
export type EventItem = {
  id: string;
  slug: string;
  title: string;
  date: string;
  endDate: string;
  venue: string;
  summary: string;
  body: string;
  image: string;
  gallery: string[];
  active: boolean;
};
export type Award = { id: string; title: string; year: string; description: string; image: string };
export type Job = { id: string; title: string; type: string; description: string; applyEmail: string; active: boolean };
export type GalleryItem = { id: string; image: string; caption: string };
export type DisclosureRow = { id: string; label: string; value: string; url: string };
export type TcRecord = {
  id: string;
  tcNumber: string;
  studentName: string;
  className: string;
  dob: string;
  issueDate: string;
  fileUrl: string;
};
export type Enquiry = {
  id: string;
  createdAt: string;
  parent: string;
  phone: string;
  child: string;
  cls: string;
  message: string;
  status: "new" | "contacted" | "visited" | "admitted" | "closed";
};
