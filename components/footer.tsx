"use client";

import Link from "next/link";
import React from "react";

import { Section } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/lib/site";

export const Footer = () => {
  return (
    <Section className="border-b-0" hideCrosses innerClassName="py-10 sm:py-12">
      <footer className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/links"
            className="text-muted-foreground hover:text-accent text-sm transition-colors"
          >
            Links
          </Link>
          <SocialLinks />
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
            <SoundToggle />
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </Section>
  );
};
