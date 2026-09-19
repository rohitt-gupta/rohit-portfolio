"use client";

import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/lib/site";

/** Hand-drawn "RG" monogram that draws itself when it scrolls into view. */
const Monogram = () => {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: {
      pathLength: { duration: 1.6, ease: "easeInOut" as const, delay },
      opacity: { duration: 0.2, delay },
    },
  });

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 70"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground/70 h-8"
      aria-label={SITE.name}
      role="img"
    >
      <motion.path
        d="M14 58 C16 42 17 26 19 13 C31 9 45 12 45 24 C45 34 31 37 21 35 C31 41 39 49 49 58"
        {...draw(0)}
      />
      <motion.path
        d="M104 22 C100 10 80 6 70 16 C60 26 60 44 72 51 C82 57 95 52 98 42 C99 38 99 35 99 34 L85 34"
        {...draw(0.4)}
      />
    </motion.svg>
  );
};

export const Footer = () => {
  return (
    <Section className="border-b-0" hideCrosses innerClassName="py-10 sm:py-12">
      <footer className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Monogram />
          <div className="flex items-center gap-5">
            <Link
              href="/links"
              className="text-muted-foreground hover:text-accent text-sm transition-colors"
            >
              Links
            </Link>
            <SocialLinks />
          </div>
        </div>

        <div className="border-connection flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <p className="text-faint text-xs">
            Built by yours truly —{" "}
            <a
              href={SITE.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent underline decoration-dotted underline-offset-4 transition-colors"
            >
              here&apos;s the code
            </a>
            .
          </p>
          <div className="flex items-center gap-3">
            <span className="text-faint font-mono text-xs">© {new Date().getFullYear()}</span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </Section>
  );
};
