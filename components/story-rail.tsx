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

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-y-0", className)}>
      {/* The track, and the part of it already walked. */}
      <span className="bg-rule absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />
      <motion.span
        style={{ scaleY: progress }}
        className="bg-accent/45 absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2"
      />

      {/* Me, on the line. The ring is drawn in the page background rather than left
          transparent, so the track passes behind the photo instead of through it. */}
      <motion.span
        style={{ top }}
        className="ring-background bg-background absolute left-1/2 block size-7 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-4"
      >
        <span className="border-rule absolute inset-0 z-10 rounded-full border" />
        <Image
          src={SITE.photos[0].src}
          alt=""
          fill
          sizes="28px"
          className="object-cover object-top"
        />
      </motion.span>
    </div>
  );
}
