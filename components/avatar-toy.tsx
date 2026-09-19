"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Springs the photo back to full size with a touch of overshoot. */
const POP = { type: "spring" as const, stiffness: 300, damping: 18 };
/** The frame breathes slower than the photo, so the two reads don't collide. */
const BREATHE = { type: "spring" as const, stiffness: 200, damping: 20 };
/** Leaving is quicker than arriving — a slow exit just looks like lag. */
const DROP = { duration: 0.18, ease: [0.4, 0, 1, 1] as const };

/**
 * The photo you can poke, framed the way braydoncoyer.dev frames his — but
 * square. Three concentric layers: a hairline outer ring, a debossed well, and
 * the photo sitting in it.
 *
 * Clicking drops the photo into the well (shrink + fade) and springs the next
 * one back out, while the frame widens a hair on the way. The beat where the
 * well sits empty is the point: it's what tells you the photo is a thing
 * resting in a dish rather than a texture painted on one.
 *
 * Insets and radii are percentages so the whole frame stays in proportion
 * across the breakpoint without a second set of numbers to keep in sync. The
 * 1 : 0.78 : 0.68 ring ratio is the reference's; the radii are then solved so
 * all three corners turn about one centre, which is what stops nested rounded
 * squares from looking like they were drawn by three different people.
 */
export function AvatarToy({ className }: { className?: string }) {
  const photos = SITE.photos;
  const [index, setIndex] = useState(0);
  const [poked, setPoked] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const reduceMotion = useReducedMotion();

  const multiple = photos.length > 1;

  const cycle = () => {
    if (!multiple) return;
    setIndex((i) => (i + 1) % photos.length);
    setPoked(true);
    setSwapping(true);
  };

  return (
    <div className={cn("group relative w-fit", className)}>
      <motion.button
        type="button"
        onClick={cycle}
        aria-label={multiple ? "Show another photo of me" : `Photo of ${SITE.name}`}
        disabled={!multiple}
        animate={{ scale: swapping && !reduceMotion ? 1.04 : 1 }}
        whileTap={multiple && !reduceMotion ? { scale: 0.97 } : undefined}
        transition={BREATHE}
        className={cn(
          "relative block size-28 rounded-[22%] sm:size-32",
          multiple && "cursor-pointer",
        )}
      >
        {/* Outer lip. Purely a ring — the page shows through it. */}
        <span aria-hidden className="border-rule absolute inset-0 rounded-[22%] border" />

        {/* The dish the photo drops into, and what you see during the swap. */}
        <span aria-hidden className="avatar-well absolute inset-[11%] rounded-[14%]" />

        {/* No clipping here: the photo scales as a whole rounded tile, so the
            well is revealed behind it rather than the image sliding under a mask. */}
        <span className="absolute inset-[16%]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={photos[index]}
              className="absolute inset-0 block overflow-hidden rounded-[9%]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0, transition: { duration: 0.12 } }
                  : { opacity: 0, scale: 0.8, transition: DROP }
              }
              transition={
                reduceMotion ? { duration: 0.12 } : { ...POP, opacity: { duration: 0.2 } }
              }
              onAnimationComplete={() => setSwapping(false)}
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src={photos[index]}
                alt={`${SITE.name}, photo ${index + 1} of ${photos.length}`}
                fill
                sizes="128px"
                priority={index === 0}
                className="object-cover"
              />
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.button>

      {multiple && !poked ? (
        <span
          aria-hidden
          className="font-secondary text-faint bg-background pointer-events-none absolute -right-2 -bottom-1 translate-y-1 rounded-full border border-current/20 px-2 py-0.5 text-[0.625rem] tracking-wide opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          click me
        </span>
      ) : null}
    </div>
  );
}
