import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import React from "react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Read loosely so adding `instagram` (or anything else below) to SITE.socials is
 * enough to make it appear in both the footer and the CTA. Keys that aren't set are
 * skipped rather than rendered as dead links.
 */
const socials = SITE.socials as Record<string, string | undefined>;

const ORDER = [
  { key: "github", label: "GitHub", Icon: IconBrandGithub },
  { key: "x", label: "X", Icon: IconBrandX },
  { key: "linkedin", label: "LinkedIn", Icon: IconBrandLinkedin },
  { key: "instagram", label: "Instagram", Icon: IconBrandInstagram },
] as const;

export const SOCIAL_LINKS = ORDER.flatMap(({ key, label, Icon }) => {
  const href = socials[key];
  return href ? [{ key, label, Icon, href }] : [];
});

export function SocialLinks({
  className,
  showLabels = false,
}: {
  className?: string;
  showLabels?: boolean;
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {SOCIAL_LINKS.map(({ key, label, Icon, href }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-accent inline-flex items-center gap-2 text-sm transition-colors"
          >
            <Icon className="size-4" stroke={1.6} aria-hidden />
            {showLabels ? <span className="font-secondary text-[0.8125rem]">{label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
