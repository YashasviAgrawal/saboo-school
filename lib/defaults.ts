import type {
  Settings, Slide, Stage, Tile, House, Notice, EventItem, Award, Job, GalleryItem, DisclosureRow, TcRecord, Enquiry,
} from "./types";

// Self-hosted copies of the photos from the old site (public/images).
// campus and gate are the only real photographs; letterhead, letterheadStacked, logo and tata
// are graphics, so always show them with fit "contain" on a white panel, never cropped.
export const IMG = {
  logo: "/images/logo.jpg",
  letterhead: "/images/letterhead.jpg",
  letterheadStacked: "/images/letterhead-stacked.jpg",
  campus: "/images/campus.jpg",
  gate: "/images/gate.jpg",
  principal: "/images/principal.jpg",
  tata: "/images/tata-classedge.jpg",
  shadow: "/images/shadow.png",
};

export const defaultSettings: Settings = {
  name: "Shri Hari Ram Saboo Public School",
  shortName: "Saboo Public School",
  tagline: "A neighbourhood school since 1985",
  description:
    "Shri Hari Ram Saboo Public School, Shastri Nagar, Jaipur. CBSE, English medium, Nursery to Class X. Admission enquiries welcome.",
  address: "Subhash Nagar, Shastri Nagar\nJaipur 302016, Rajasthan",
  phones: "0141-2280141\n090248 64993",
  email: "hariramsabooschool@rediffmail.com",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Shri+Hari+Ram+Saboo+Public+School+Jaipur",
  facebook: "https://www.facebook.com/ShriHariRamSabooPublicSchool/",
  instagram: "https://www.instagram.com/saboopublicschooljaipur/",
  youtube: "https://www.youtube.com/watch?v=CSbfuZVgV8I",
  established: "1985",
  affiliationNo: "1730087",
  schoolCode: "10449",
  tourVideoId: "CSbfuZVgV8I",
  topBarText: "Admission enquiries are welcome for Nursery to Class X",
  logoUrl: IMG.logo,
  principalName: "Harendra Kumar Maheshwari",
  principalTitle: "Principal",
  principalPhoto: IMG.principal,
  // DRAFT: the school must review and approve this message before it goes live.
  principalMessage:
    "Every child who walks through our gates arrives with their own questions, strengths and pace. Our work is to notice each of them and give them the confidence to keep learning.\n\nWe combine the CBSE curriculum with steady guidance, clear values and a school community that feels like family. Our doors are open to every parent who wants to see this for themselves.",
  trustName: "Shri Hari Ram Saboo Charitable Trust",
  trustText:
    "Shri Hari Ram Saboo Public School is managed by the Shri Hari Ram Saboo Charitable Trust, registered under the Rajasthan Public Trust Act, 1959.\n\nLate Shri G. P. Birla inaugurated the school on 21 February 1985, and the first classes began that July. The school has grown with its neighbourhood ever since.",
  trustImage: IMG.campus,
  admissionNursery:
    "Complete the admission form and provide proof of age. Nursery is for children aged 3+ and UKG for 4+, calculated as on 31 March.",
  admissionHigher:
    "Admission depends on a written test and the transfer certificate from the previous school. The management makes the final choice of candidates.",
};

export const defaultSlides: Slide[] = [
  {
    id: "s1",
    title: "A neighbourhood school since 1985",
    text: "Shri Hari Ram Saboo Public School teaches Nursery to Class X in English on the CBSE curriculum, in the heart of Shastri Nagar, Jaipur.",
    image: IMG.campus,
    fit: "cover",
    focus: "center",
    ctaLabel: "Who we are",
    ctaHref: "/about",
    active: true,
  },
  {
    id: "s2",
    title: "Lessons children can see and understand",
    text: "Teachers bring concepts to life with Tata ClassEdge, a multimedia learning platform built for classroom teaching.",
    image: IMG.tata,
    fit: "contain",
    focus: "center",
    ctaLabel: "See how we teach",
    ctaHref: "/curriculum",
    active: true,
  },
  {
    id: "s3",
    title: "Admissions are open",
    text: "Our gates are open to new families from Play group upwards. Visit the school, meet the teachers and see where your child will learn.",
    image: IMG.gate,
    fit: "cover",
    focus: "center",
    ctaLabel: "Inquire about admission",
    ctaHref: "/admissions",
    active: true,
  },
  {
    id: "s4",
    title: "Four houses, one school family",
    text: "From Class 1, every student belongs to Tagore, Pratap, Tilak or Shivaji house and grows with a team of teachers beside them.",
    image: IMG.campus,
    fit: "cover",
    focus: "right",
    ctaLabel: "Meet the houses",
    ctaHref: "/curriculum#houses",
    active: true,
  },
];

export const defaultStages: Stage[] = [
  {
    id: "st1",
    title: "Pre-primary",
    classes: "Play group, Nursery, LKG and UKG",
    text: "Play, stories, songs and early numbers in a warm setting. Children join Nursery at 3+ and UKG at 4+, as on 31 March.",
    icon: "child",
    image: IMG.gate,
    focus: "center",
  },
  {
    id: "st2",
    title: "Primary",
    classes: "Classes I to V",
    text: "Strong foundations in English, Hindi, mathematics and science, with houses, art and activities that build teamwork from Class 1.",
    icon: "book",
    image: IMG.campus,
    focus: "left",
  },
  {
    id: "st3",
    title: "Middle and secondary",
    classes: "Classes VI to X",
    text: "Deeper subject learning through labs and the CBSE curriculum, with guidance leading up to the Class X board examination.",
    icon: "cap",
    image: IMG.campus,
    focus: "right",
  },
];

export const defaultTiles: Tile[] = [
  {
    id: "t1",
    title: "CBSE academics",
    text: "A complete CBSE programme from Nursery to Class X, taught in English, with proper attention to Hindi and Sanskrit.",
    bullets: [],
    icon: "book",
    size: "normal",
    href: "/curriculum",
    image: IMG.campus,
    fit: "cover",
    focus: "center",
  },
  {
    id: "t2",
    title: "Multimedia learning",
    text: "Tata ClassEdge supports teachers with visual lessons, so ideas are easier to grasp and remember.",
    bullets: [],
    icon: "screen",
    size: "normal",
    href: "/curriculum",
    image: IMG.tata,
    fit: "contain",
  },
  {
    id: "t3",
    title: "Labs and library",
    text: "",
    bullets: ["Library and reading room", "Science laboratory", "Computer lab", "Mathematics lab"],
    icon: "flask",
    size: "normal",
    href: "/life",
    image: IMG.campus,
    fit: "cover",
    focus: "left",
  },
  {
    id: "t4",
    title: "Shared spaces",
    text: "",
    bullets: ["Two auditorium halls", "A.V. room", "Resource room", "Dance and music rooms"],
    icon: "building",
    size: "normal",
    href: "/life",
    image: IMG.gate,
    fit: "cover",
    focus: "top",
  },
  {
    id: "t5",
    title: "House system",
    text: "Four houses, each guided by four or more teachers, give every child a team to belong to.",
    bullets: [],
    icon: "flag",
    size: "normal",
    href: "/curriculum#houses",
    image: IMG.campus,
    fit: "cover",
    focus: "right",
  },
  {
    id: "t6",
    title: "Values we live by",
    text: "Our emblem carries three words: shraddha, gyan and karm. Respect, knowledge and effort guide daily life at school.",
    bullets: [],
    icon: "cap",
    size: "normal",
    href: "/about",
    image: IMG.logo,
    fit: "contain",
  },
];

export const defaultHouses: House[] = [
  { id: "h1", name: "Tagore", color: "#2f6fde" },
  { id: "h2", name: "Pratap", color: "#d64545" },
  { id: "h3", name: "Tilak", color: "#2e9e5b" },
  { id: "h4", name: "Shivaji", color: "#f2b705" },
];

export const defaultGallery: GalleryItem[] = [
  { id: "g1", image: IMG.campus, caption: "The school building, Subhash Nagar" },
  { id: "g2", image: IMG.gate, caption: "The main gate on admission day" },
  { id: "g3", image: IMG.principal, caption: "The Principal's office" },
];

export const defaultDisclosure: DisclosureRow[] = [
  { id: "d1", label: "Name of the school", value: "Shri Hari Ram Saboo Public School", url: "" },
  { id: "d2", label: "CBSE affiliation number", value: "1730087", url: "" },
  { id: "d3", label: "School code", value: "10449", url: "" },
  { id: "d4", label: "Address", value: "Subhash Nagar, Shastri Nagar, Jaipur 302016, Rajasthan", url: "" },
  { id: "d5", label: "Principal", value: "Harendra Kumar Maheshwari", url: "" },
  { id: "d6", label: "Managed by", value: "Shri Hari Ram Saboo Charitable Trust, registered under the Rajasthan Public Trust Act, 1959", url: "" },
  { id: "d7", label: "Classes and medium", value: "Nursery to Class X, English medium", url: "" },
  { id: "d8", label: "Fee structure", value: "", url: "" },
  { id: "d9", label: "Annual academic calendar", value: "", url: "" },
  { id: "d10", label: "School management committee details", value: "", url: "" },
  { id: "d11", label: "Class X board results, last three years", value: "", url: "" },
];

export const defaultNotices: Notice[] = [];
export const defaultEvents: EventItem[] = [];
export const defaultAwards: Award[] = [];
export const defaultJobs: Job[] = [];
export const defaultTcRecords: TcRecord[] = [];
export const defaultEnquiries: Enquiry[] = [];
