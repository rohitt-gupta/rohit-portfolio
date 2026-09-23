/** Everything that shows up under Work. Add here, both the home page and /work follow. */

export type Project = {
  slug: string;
  title: string;
  /**
   * The shot that sits on the card. Landscape; it is letterboxed onto a 4:3 tile,
   * so nothing important should hug the very top or bottom.
   *
   * Optional. Without one the tile carries the project's name and address in an
   * empty window instead, which is how work still waiting on a screenshot shows.
   */
  shot?: { src: string; width: number; height: number };
  /**
   * Optional screen recording, revealed over the shot on hover. Muted and looped,
   * so keep it a few silent seconds of the product doing one thing.
   */
  video?: string;
  /**
   * The scene behind the shot, revealed on hover; the screenshot reads as a
   * window sitting on it. Self-hosted rather than hotlinked, so the cards do not
   * depend on someone else's CDN staying up.
   *
   * All six are wide, calm landscapes on the free Unsplash License; nothing from
   * Unsplash+. Attribution is not required by that licence but is only polite:
   * @friskygeek, @nidheeshkavalan, @alexanderstartsev, @vidarnm, @betagamma and
   * @thugbong. There are more cards than scenes, so some cards share one.
   */
  backdrop: string;
  /** One line. It sits next to the title on the home grid, so keep it short. */
  tagline?: string;
  /** The longer version, only shown on /work. */
  description?: string;
  /** Where the card opens. Leave it out for work with nothing public to link to:
   *  the card still shows, it just is not a link. */
  href?: string;
  repo?: string;
  year?: string;
  stack: string[];
};

/**
 * The shot that fills the right half of the "currently building" band. It's cropped
 * hard, inset from the top-left and bleeding off the right and bottom edges, so
 * feed it a wide, landscape capture and let the interesting part sit top-left.
 */
export type ProjectPreview = {
  src: string;
  alt: string;
  /** Intrinsic pixels, only used for the aspect ratio. */
  width: number;
  height: number;
};

export type CurrentProject = {
  title: string;
  /** Free text inside the pulsing pill: "Building", "In beta", "Shipping soon". */
  status: string;
  /** Set in full ink, straight after the project name. The claim. */
  tagline: string;
  /** Drops to muted behind it. The elaboration nobody has to read. */
  description: string;
  /** Empty string while there's nothing worth linking to; the button disappears. */
  href: string;
  stack: readonly string[];
  /** Omit and the band collapses to one column instead of showing an empty panel. */
  preview?: ProjectPreview;
  /**
   * Replaces the hatch behind the preview on hover. Free Unsplash License, self
   * hosted; coconut palms at golden hour by @jordanfmcqueen.
   */
  backdrop?: string;
};

/**
 * The one at the top of the home page. Title and tagline run together as one
 * sentence, so write the tagline as a clause: "Flowy is {tagline}".
 *
 * `stack` is the iPhone app's, not the marketing site's.
 */
export const CURRENT_PROJECT: CurrentProject = {
  title: "Flowy",
  status: "Live on iOS",
  tagline: "a private period and cycle tracker for iPhone.",
  description: "One quiet minute a day turns into a calendar you can actually read.",
  href: "https://flowyhealth.com",
  stack: ["React Native", "Expo", "TypeScript"],
  backdrop: "/backgrounds/palms.jpg",
  preview: {
    src: "/flowy.jpg",
    alt: "The Flowy landing page: your cycle makes more sense here",
    width: 1520,
    height: 1125,
  },
};

export const PROJECTS: Project[] = [
  // The first four are the home page's selected work, in this order. The first
  // three are studio work: their copy, years and stacks follow the case studies on
  // launchbox.studio, and the screenshots are the ones those case studies use.
  // Names are each product's own wordmark.
  {
    slug: "alawyer",
    shot: { src: "/alawyer.png", width: 1600, height: 1037 },
    backdrop: "/backgrounds/coast.jpg",
    title: "Alawyer",
    tagline: "Engineering support for an AI legal intelligence platform.",
    description:
      "Engineering support for an AI-powered legal intelligence platform that helps people research, extract and understand legal information faster.",
    href: "https://alawyer.ai",
    year: "2026",
    // TODO: the case study names no framework, so the card shows no stack marks yet.
    stack: [],
  },
  {
    slug: "refco-club",
    // The top of a full-page capture: the nav and the hero, down to the card's edge.
    shot: { src: "/refco.jpg", width: 1600, height: 1133 },
    backdrop: "/backgrounds/hills.jpg",
    title: "REFCO Club",
    tagline: "A private real estate membership platform for Fort Worth.",
    description:
      "A premium real estate membership platform for private listings and exclusive opportunities in the Fort Worth market.",
    href: "https://www.refcoclub.com",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "scranton-ai",
    shot: { src: "/scranton.png", width: 1600, height: 1154 },
    backdrop: "/backgrounds/lake.jpg",
    title: "ScrantonAI",
    tagline: "An AI chatbot for Scranton's public records, contracts and more.",
    description:
      "An AI chatbot over the City of Scranton's public records, contracts and council documents, streaming its answers, built on Next.js and Supabase.",
    href: "https://www.scranton.ai",
    year: "2024",
    stack: ["Next.js", "Supabase", "Vercel AI SDK"],
  },
  {
    slug: "launchbox-studio",
    // The studio's home page, from the nav down through the client logos.
    shot: { src: "/launchbox-site.png", width: 1600, height: 928 },
    backdrop: "/backgrounds/dune.jpg",
    title: "Launchbox Studio",
    tagline: "The web design and development studio I founded.",
    description: "The web design and development studio I founded in 2024.",
    href: "https://www.launchbox.studio",
    year: "2024",
    stack: ["Next.js", "Tailwind CSS", "Motion"],
  },
  {
    slug: "caption-me",
    shot: { src: "/captionme.png", width: 1920, height: 1080 },
    backdrop: "/backgrounds/dune.jpg",
    title: "Caption Me",
    tagline: "Upload a video, get styled captions burned in.",
    description:
      "Upload a video, transcribe it in the browser and burn styled, word-timed captions straight into the export. Built because every tool that did this well was a subscription.",
    href: "https://caption-me.vercel.app/",
    year: "2024",
    stack: ["Next.js", "TypeScript", "FFmpeg"],
  },
  {
    slug: "ecommerce",
    shot: { src: "/ecom.png", width: 1300, height: 946 },
    backdrop: "/backgrounds/ridges.jpg",
    title: "Ecommerce Admin + Store",
    tagline: "Multi-store platform with a public storefront API.",
    description:
      "An admin dashboard that can run several stores at once, each exposing a public API the storefront consumes. Products, variants, orders, billboards, the whole loop.",
    href: "https://ecom-dashboard-five.vercel.app/",
    year: "2024",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
  },
  {
    slug: "jam-and-play",
    shot: { src: "/jamandplay.png", width: 1332, height: 938 },
    backdrop: "/backgrounds/lake.jpg",
    title: "Jam and Play",
    tagline: "A music course platform, built for a client.",
    description:
      "Course catalogue, lesson player and checkout for a music school. My first properly scoped client build, shipped end to end.",
    href: "https://www.jamandplay.com/",
    year: "2023",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    slug: "team-chat",
    shot: { src: "/discord.png", width: 1920, height: 1080 },
    backdrop: "/backgrounds/house.jpg",
    title: "Team Chat",
    tagline: "Real-time chat with servers, channels and roles.",
    description:
      "Discord, rebuilt to understand how the real-time parts fit together: websockets, presence, per-channel permissions and role hierarchies.",
    href: "https://discord-clone-rho-dun.vercel.app/",
    year: "2023",
    stack: ["Next.js", "Socket.io", "Prisma"],
  },
  {
    slug: "taskflow",
    shot: { src: "/trello.png", width: 1500, height: 950 },
    backdrop: "/backgrounds/hills.jpg",
    title: "TaskFlow",
    tagline: "Drag-and-drop task board backed by Appwrite.",
    description:
      "A Kanban board with optimistic drag-and-drop, built to get properly comfortable with drag state and reconciliation.",
    href: "https://trello-clone-xjcj.vercel.app/",
    year: "2023",
    stack: ["Next.js", "Appwrite", "Zustand"],
  },
  {
    slug: "travel-agency",
    shot: { src: "/travel-agency.png", width: 1920, height: 1080 },
    backdrop: "/backgrounds/coast.jpg",
    title: "Travel Agency",
    tagline: "A landing page built to sharpen my UI taste.",
    description:
      "No brief, no client, just a landing page I designed and built to spend time on spacing, type and motion without a deadline attached.",
    href: "https://landing-page-tan-seven.vercel.app/",
    year: "2023",
    stack: ["React", "Tailwind", "Framer Motion"],
  },
];

/** The home page shows the first four as a 2×2 grid; /work shows everything. */
export const FEATURED_PROJECTS = PROJECTS.slice(0, 4);
