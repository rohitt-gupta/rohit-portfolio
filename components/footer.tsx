"use client";

import Link from "next/link";
import React from "react";

import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { hoverSfx } from "@/lib/sfx";
import { SITE } from "@/lib/site";

export const Footer = () => {
  return (
    /* The extra bottom padding is room for the sticky "Book a call" pill, which is
       fixed to this corner of the viewport: without it, the last thing the page
       scrolls to is the sound and theme toggles sitting underneath the pill.

       80px is measured rather than guessed. Scrolled to the very bottom the pill
       occupies the last 68px of the viewport — 44 of button and 24 of offset — so
       this clears it by 12 and nothing more. Both breakpoints spell out `pb`, since
       tailwind-merge only drops the `py` that this one actually conflicts with. */
    <Section className="border-b-0" hideCrosses innerClassName="py-10 pb-20 sm:py-12 sm:pb-20">
      <footer className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/links"
            {...hoverSfx()}
            className="text-muted-foreground hover:text-accent text-sm transition-colors"
          >
            Links
          </Link>
          <SocialLinks />
        </div>

        <div className="border-connection flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <p className="text-faint text-xs">
            Built by yours truly,{" "}
            <a
              href={SITE.repo}
              target="_blank"
              rel="noopener noreferrer"
              {...hoverSfx()}
              className="hover:text-accent underline decoration-dotted underline-offset-4 transition-colors"
            >
              here&apos;s the code
            </a>
            .
          </p>
          <div className="flex items-center gap-3">
            <span className="text-faint font-mono text-xs">© {new Date().getFullYear()}</span>
            <SoundToggle />
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </Section>
  );
};
