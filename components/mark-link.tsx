import React from "react";

import { BrandIcon } from "@/components/brand-icon";
import { SfxLink } from "@/components/sfx-link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & (
  | { /** A key in `brand-icon`'s table. */ mark: string; logo?: never }
  | {
      /** A square image under /public, for the brands whose mark is a photo. */ logo: string;
      mark?: never;
    }
);

/**
 * A name with its logo in front of it, linked out, the way ozzyx.xyz sets
 * "soft machine" in his opening line.
 *
 * The mark and the full ink around it are the emphasis, which is why this carries
 * no highlight and no rule underneath: in a paragraph that already has pastel
 * chips in it, a third kind of mark would be noise. The whole affordance on hover
 * is the pair fading back together — on the page's own curve, since `--ease-out-strong`
 * happens to be the same one he eases on — so the logo and the word answer as one
 * object rather than as a word with a picture beside it.
 *
 * The mark is sized in `em` rather than at the fixed 14px the toolkit chips use:
 * the paragraphs this lives in run from 16px to 30px with the viewport, and a fixed
 * mark would shrink against the words as the screen grows.
 *
 * This stays a server component and hands the anchor to `SfxLink`, the client half
 * that plays the hover tick. Marking this file `use client` instead would be simpler
 * by one file and would ship all 49KB of `brand-icon` to the browser, since its marks
 * live in one object with nothing to tree-shake.
 */
export function MarkLink({ href, children, className, mark, logo }: Props) {
  return (
    <SfxLink
      href={href}
      className={cn(
        "inline-flex items-center gap-[0.3em] transition-opacity duration-200 ease-(--ease-out-strong) hover:opacity-60",
        className,
      )}
    >
      {logo ? (
        // A plain img, the way `experience-row.tsx` takes these: square avatars of a
        // few KB, already smaller than they are drawn, so the optimiser has nothing
        // to win. Rounded a touch, because each one carries its own background.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="size-[0.85em] shrink-0 rounded-[0.18em] object-cover"
        />
      ) : mark ? (
        <BrandIcon name={mark} className="size-[0.85em]" />
      ) : null}
      {children}
    </SfxLink>
  );
}
