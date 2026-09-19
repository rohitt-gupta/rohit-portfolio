/**
 * The tools I actually open on a given week — not everything I've ever touched.
 * Grouped, because a flat list of twenty logos says nothing about how I work.
 */

export type StackGroup = {
  label: string;
  items: string[];
};

export const STACK: StackGroup[] = [
  {
    label: "Language",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    label: "Web",
    items: ["React", "Next.js", "Vue", "Nuxt", "Tailwind CSS", "Motion"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Expo Router", "NativeWind"],
  },
  {
    label: "Backend & data",
    items: ["Node.js", "Supabase", "PostgreSQL", "Prisma", "Drizzle"],
  },
  {
    label: "Ship it",
    items: ["Docker", "Vercel", "GitHub Actions", "Git"],
  },
];
