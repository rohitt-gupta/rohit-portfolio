/** Everything that shows up under Work. Add here, both the home page and /work follow. */

export type Project = {
  slug: string;
  title: string;
  /** One line. It sits next to the title on the home grid, so keep it short. */
  tagline: string;
  /** The longer version, only shown on /work. */
  description: string;
  href: string;
  repo?: string;
  year: string;
  stack: string[];
};

/**
 * The one at the top of the home page. `status` is free text and renders inside the
 * pulsing pill, so "Building", "In beta", "Shipping soon" all work.
 *
 * TODO: this is scaffolding — swap in the real Flowy copy, link and stack.
 */
export const CURRENT_PROJECT = {
  title: "Flowy",
  status: "Building",
  tagline: "What I'm pouring most of my evenings into right now.",
  description:
    "Flowy is the thing I keep coming back to after work. It's early — the shape is still moving — but it's the project I'm most excited to talk about at the moment.",
  href: "",
  stack: ["TypeScript", "Next.js", "Supabase"],
} as const;

export const PROJECTS: Project[] = [
  {
    slug: "caption-me",
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
    title: "Ecommerce Admin + Store",
    tagline: "Multi-store platform with a public storefront API.",
    description:
      "An admin dashboard that can run several stores at once, each exposing a public API the storefront consumes. Products, variants, orders, billboards — the whole loop.",
    href: "https://ecom-dashboard-five.vercel.app/",
    year: "2024",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
  },
  {
    slug: "jam-and-play",
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
    title: "Travel Agency",
    tagline: "A landing page built to sharpen my UI taste.",
    description:
      "No brief, no client — just a landing page I designed and built to spend time on spacing, type and motion without a deadline attached.",
    href: "https://landing-page-tan-seven.vercel.app/",
    year: "2023",
    stack: ["React", "Tailwind", "Framer Motion"],
  },
];

/** The home page shows a 2×2 grid; /work shows everything. */
export const FEATURED_PROJECTS = PROJECTS.slice(0, 4);
