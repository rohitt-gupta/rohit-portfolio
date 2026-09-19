/** Companies and education. Shown on /work and /about. */

export type Role = {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string;
};

export const ROLES: Role[] = [
  {
    title: "Full-Stack Developer",
    company: "KrMroads",
    location: "Hyderabad",
    period: "2022 — present",
    description:
      "Building product end to end: React and Next.js on the front, TypeScript and Node behind it. Lately a lot of React Native with Expo Router, and Supabase for everything that needs a database.",
  },
  {
    title: "Junior Software Developer",
    company: "KrMroads",
    location: "Hyderabad",
    period: "Apr 2022 — Dec 2022",
    description:
      "Started on the front-end with React and Material UI. Mostly bug fixing, refactoring and untangling folder structure — which turned out to be the fastest way to learn a codebase.",
  },
];

export const EDUCATION: Role[] = [
  {
    title: "B.Tech, Electronics Engineering",
    company: "CTAE",
    location: "Udaipur",
    period: "2018 — 2022",
    description:
      "Studied electronics, wrote a lot of code on the side, and picked up several off-campus software offers before graduating.",
  },
];
