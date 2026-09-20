import { SITE } from "@/lib/site";

/**
 * Everything the /links page points at, in one place: the link-in-bio card I can
 * paste into a profile and forget about. Socials aren't listed here: the page renders
 * them straight from SITE.socials via SOCIAL_LINKS, so adding one there is enough.
 */

export type LinkItem = {
  label: string;
  description: string;
  href: string;
  /** Right-hand column, monospaced: a handle, a domain, a file. */
  meta?: string;
  external?: boolean;
};

/** The rest of the site, for anyone who landed here first. */
export const SITE_PAGES: LinkItem[] = [
  {
    label: "Home",
    description: "The short version of who I am and what I build.",
    href: "/",
  },
  {
    label: "Work",
    description: "Projects I've shipped, and what I actually did on each.",
    href: "/work",
  },
  {
    label: "About",
    description: "Longer form: the path here and where it's going.",
    href: "/about",
  },
  {
    label: "Blog",
    description: "Notes on things I ran into while building.",
    href: "/blog",
  },
  {
    label: "Inspiration",
    description: "People, tools and sites I keep stealing from.",
    href: "/inspiration",
  },
];

/** Off-site things that aren't social profiles. */
export const ELSEWHERE: LinkItem[] = [
  {
    label: "Résumé",
    description: "One page, current, no surprises.",
    href: SITE.resume,
    meta: "PDF",
    external: true,
  },
  {
    label: "This site's source",
    description: "Next.js, Tailwind, MDX. Take whatever's useful.",
    href: SITE.repo,
    meta: "GitHub",
    external: true,
  },
];
