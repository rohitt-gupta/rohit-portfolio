import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

export const HIGHLIGHT_TONES = ["butter", "sky", "mint", "lilac", "peach"] as const;

export type HighlightTone = (typeof HIGHLIGHT_TONES)[number];

/**
 * Written out rather than built from `bg-hl-${tone}`. Tailwind reads source as
 * plain text, so a class it can't see spelled in full never gets generated.
 */
export const TONE_CLASS: Record<HighlightTone, string> = {
  butter: "bg-hl-butter",
  sky: "bg-hl-sky",
  mint: "bg-hl-mint",
  lilac: "bg-hl-lilac",
  peach: "bg-hl-peach",
};

/** Paint for a highlight; `interactive` adds the hover lift links get. */
export const highlightClass = (tone: HighlightTone, interactive = false, className?: string) =>
  cn("highlight", TONE_CLASS[tone], interactive && "highlight-link", className);

type Props = {
  children: React.ReactNode;
  tone?: HighlightTone;
  className?: string;
  /** Renders a link instead of a plain span. */
  href?: string;
  /** Force a new tab. Inferred for absolute URLs. */
  external?: boolean;
};

/**
 * A word with a marker pen dragged over it. Emphasis that reads at a glance and
 * costs no extra weight, size or colour of its own, which is why it can carry
 * a link inside running prose without turning the paragraph into a list of
 * blue words.
 *
 * Tones are meant to be assigned per destination and then kept. A reader picks
 * up "lilac means code" after the second one, and that only works if the
 * mapping holds across the page.
 */
export function Highlight({ children, tone = "butter", className, href, external }: Props) {
  if (!href) {
    return <span className={highlightClass(tone, false, className)}>{children}</span>;
  }

  const classes = highlightClass(tone, true, className);
  const isExternal = external ?? /^https?:/.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
