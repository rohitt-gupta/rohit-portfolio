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
    /* The sticky "Book a call" pill is fixed to the bottom-right corner of the
       viewport, so nothing clickable lives in that corner of the footer. The year
       and the toggles sit above the line, where the pill can never reach them, and
       below it there is only the credit, short and on the left. That lets the footer
       keep the same padding below as above, with no reserve for the pill.

       Except on the narrowest phones. The credit is 193px wide and the pill 126px,
       so under 23rem the pill reaches far enough left to land on the end of "here's
       the code" once the page is scrolled all the way down. There, and only there,
       the credit gets 72px below it: at the bottom of the page the pill takes the
       last 60px of the viewport, 16 of offset and 44 of button, and 72 clears it by
       12. From 23rem up the two simply sit side by side. */
    <Section
      className="border-b-0"
      hideCrosses
      innerClassName="py-10 max-[23rem]:pb-[4.5rem] sm:py-12"
    >
      <footer className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/links"
              {...hoverSfx()}
              className="text-muted-foreground hover:text-accent text-sm transition-colors"
            >
              Links
            </Link>
            <Link
              href="/inspiration"
              {...hoverSfx()}
              className="text-muted-foreground hover:text-accent text-sm transition-colors"
            >
              Inspiration
            </Link>
            <SocialLinks />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-faint font-mono text-xs">© {new Date().getFullYear()}</span>
            <SoundToggle />
            <ThemeToggle />
          </div>
        </div>

        <p className="border-connection text-faint border-t pt-6 text-xs">
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
      </footer>
    </Section>
  );
};
