"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import React from "react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The line running down the story, with me travelling along it as you scroll. The
 * device is braydoncoyer.dev's, from the work history on his about page.
 *
 * It measures its own box rather than taking a ref from the page, because the rail
 * is absolutely positioned to the full height of the story and so its scroll
 * progress already is the story's. That keeps the page a server component: this is
 * the only piece that needs to run in the browser.
 *
 * The offsets put the halfway point of the rail at the middle of the viewport, so
 * the avatar sits beside whatever paragraph you are actually reading rather than
 * racing ahead of it. The spring is what stops it juddering on a trackpad, where
 * scroll arrives in a hundred tiny steps.
 *
 * Nothing here is announced. It is decoration on a story that reads fine without
 * it, and a progress indicator that duplicates the scrollbar is not worth a line
 * in a screen reader.
 */
export function StoryRail({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end 50%"],
  });

  const smoothed = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.35 });
  const progress = reduceMotion ? scrollYProgress : smoothed;
  const top = useTransform(progress, [0, 1], ["0%", "100%"]);
  // The colour is the part of the story still ahead, draining from the bottom as I
  // travel down it. Colouring what has been read instead leaves the bar entirely grey
  // on arrival, which is the least inviting a page can look at the top.
  const ahead = useTransform(progress, (v) => 1 - v);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-y-0", className)}>
      {/* The track, and the part of it still to come. A soft bar rather than a
          hairline: at this height a single pixel reads as a border that lost its
          box, where a rounded 12px bar reads as a thing to travel along. */}
      <span className="bg-muted absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 rounded-full" />
      <motion.span
        style={{ scaleY: ahead }}
        className="bg-accent-soft absolute inset-y-0 left-1/2 w-3 origin-bottom -translate-x-1/2 rounded-full"
      />

      {/* Me, on the line. The ring is drawn in the page background rather than left
          transparent, so the track passes behind the photo instead of through it. */}
      <motion.span
        style={{ top }}
        className="ring-background bg-background absolute left-1/2 z-20 block size-12 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_4px_14px_-4px_var(--well-shadow)] ring-4"
      >
        <span className="border-rule absolute inset-0 z-10 rounded-full border" />
        <Image
          src={SITE.photos[0].src}
          alt=""
          fill
          sizes="48px"
          className="object-cover object-top"
        />
      </motion.span>
    </div>
  );
}
