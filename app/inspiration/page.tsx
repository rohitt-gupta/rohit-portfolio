import {
  IconArticleFilled,
  IconBrandFigma,
  IconBrandNextjs,
  IconBrandPrisma,
  IconBrandSupabase,
  IconBrandVercel,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Inspiration - ${SITE.name}`,
  description: "People, products and websites that shape how I build things.",
  alternates: {
    canonical: "/inspiration",
  },
};

// NOTE: this list is a starting point — swap in your own picks whenever you like.
const items = [
  {
    title: "shadcn/ui",
    description: "The library that changed how I build interfaces.",
    href: "https://ui.shadcn.com",
    src: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-4">
        <rect width="256" height="256" fill="none"></rect>
        <line
          x1="208"
          y1="128"
          x2="128"
          y2="208"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        ></line>
        <line
          x1="192"
          y1="40"
          x2="40"
          y2="192"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        ></line>
      </svg>
    ),
  },
  {
    title: "Tailwind CSS",
    description: "Where it all started for me and styling.",
    href: "https://tailwindcss.com",
    src: (
      <svg viewBox="0 0 34 21" fill="none" className="size-4 text-black dark:text-white">
        <path
          className="fill-sky-400"
          d="M17.183 0C12.6 0 9.737 2.291 8.59 6.873c1.719-2.29 3.723-3.15 6.014-2.577 1.307.326 2.242 1.274 3.275 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.291 8.591-6.872-1.718 2.29-3.723 3.15-6.013 2.576-1.308-.326-2.243-1.274-3.276-2.324C23.39 1.98 21.44 0 17.183 0ZM8.59 10.309C4.01 10.309 1.145 12.6 0 17.182c1.718-2.291 3.723-3.15 6.013-2.577 1.308.326 2.243 1.274 3.276 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.29 8.59-6.872-1.718 2.29-3.722 3.15-6.013 2.577-1.307-.327-2.242-1.276-3.276-2.325-1.684-1.71-3.634-3.689-7.893-3.689Z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Next.js",
    description: "The framework I reach for by default.",
    href: "https://nextjs.org",
    src: <IconBrandNextjs className="size-4" />,
  },
  {
    title: "Vercel",
    description: "Ship on Friday, sleep on Saturday.",
    href: "https://vercel.com",
    src: <IconBrandVercel className="size-4" />,
  },
  {
    title: "Fireship",
    description: "All time favourite YouTube channel.",
    href: "https://youtube.com/@fireship",
    src: (
      <svg xmlns="http://www.w3.org/2000/svg" width="45" viewBox="0 0 300 301" className="size-4">
        <path
          d="M115.44.64c-.53-.45-1.74-.43-2.75-.64-.53.78-1.21,1.4-1.38,2.08-.4,1.72-.69,3.47-.85,5.23-3.9,39.25-18.51,75.68-46.94,109.02-15.77,18.49-31.47,37.39-43.07,57.48-28.8,49.84-3.17,100.74,59.65,122.99,2.07.73,4.39,1.06,9.57,2.27-21.31-19.27-32.28-38.85-28.58-62.02,3.52-22.1,14.7-41.82,31.64-59.8,1.25,2.5,1.32,4.68,1.24,6.86-.83,19.72,5.7,37.12,25.86,50.86,9.32,6.35,17.69,13.54,26.12,20.61,8.56,7.2,11.04,15.85,8.61,25.28-1.17,4.58-2.88,9.09-4.73,14.74,14.35-1.42,27.62-3.4,36.53-11.33,8.52-7.57,14.82-16.55,23.91-27.01.64,8.85,1.88,15.74,1.4,22.56-.51,7.09-2.7,14.12-4.16,21.18,43.61-6.57,82.08-49.36,83.77-93.13,1.24-31.94-25.94-78.72-48.76-83.26,1.28,3,2.47,5.84,3.75,8.64,7.92,17.44,10.24,35.12,5.23,53.37-5.01,18.15-30.43,38.52-52.85,41.09.76-1.82,1.08-3.52,2.12-4.91,24.15-32.54,24.45-66.6,10.72-101.36C193.12,74.99,157.88,36.14,115.44.64Z"
          fill="var(--color-orange-500)"
        ></path>
      </svg>
    ),
  },
  {
    title: "Aceternity UI",
    description: "Components with taste. This site's design owes it a lot.",
    href: "https://ui.aceternity.com",
    src: (
      <svg
        viewBox="48 48 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          d="M146 48H106.136L48 208H87.8644L116.932 128C116.932 128 122 114.5 124.4 108L131.466 88L146 48Z"
          fill="currentColor"
        />
        <path d="M110 48H149.864L168.032 98H127.84L110 48Z" fill="currentColor" />
        <path d="M139.587 113.833L171.458 208H208L172.807 113.833H139.587Z" fill="currentColor" />
        <path d="M173 114L140.8 208H104L139.545 114H173Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Josh W. Comeau",
    description: "The best writing on CSS and interaction on the internet.",
    href: "https://www.joshwcomeau.com",
    src: <IconArticleFilled className="size-4" />,
  },
  {
    title: "Prisma",
    description: "Made me actually enjoy working with databases.",
    href: "https://www.prisma.io",
    src: <IconBrandPrisma className="size-4" />,
  },
  {
    title: "Supabase",
    description: "Postgres with batteries included, done right.",
    href: "https://supabase.com",
    src: <IconBrandSupabase className="size-4" />,
  },
  {
    title: "Figma",
    description: "Where the ideas get shaped before they get built.",
    href: "https://figma.com",
    src: <IconBrandFigma className="size-4" />,
  },
];

export default async function InspirationPage() {
  return (
    <Section innerClassName="min-h-screen">
      <p className="text-foreground text-base">
        A list of the people I look up to, the websites I admire, the tools I use and everything
        else that follows.
      </p>
      <p className="text-foreground pt-4 text-base">
        I&apos;ll keep updating this list as I find more inspiration.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            className="group flex items-center gap-2"
          >
            <div className="mr-2 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-linear-to-b from-neutral-50 to-neutral-100 shadow-sm ring-1 shadow-black/10 ring-black/10 md:size-8">
              {item.src}
            </div>
            <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
              <p className="text-foreground shrink-0 font-medium">{item.title}</p>
              <div className="hidden size-1 rounded-full bg-neutral-200 md:block"></div>
              <p className="text-foreground/70 group-hover:text-primary text-balance transition-transform duration-300 group-hover:translate-x-1">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
