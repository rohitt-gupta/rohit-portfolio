"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

import { sfx } from "@/lib/sfx";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Springs the photo back to full size with a touch of overshoot. */
const POP = { type: "spring" as const, stiffness: 300, damping: 18 };
/** The frame breathes slower than the photo, so the two reads don't collide. */
const BREATHE = { type: "spring" as const, stiffness: 200, damping: 20 };
/** Leaving is quicker than arriving; a slow exit just looks like lag. */
const DROP = { duration: 0.18, ease: [0.4, 0, 1, 1] as const };

/**
 * The photo you can poke, framed the way braydoncoyer.dev frames his, but
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
  const [swapping, setSwapping] = useState(false);
  const reduceMotion = useReducedMotion();

  const multiple = photos.length > 1;

  const photo = photos[index];
  const longEdge = photo.height > photo.width ? { height: "100%" } : { width: "100%" };

  const cycle = () => {
    if (!multiple) return;
    // Two voices timed to the animation: a falling one for the drop into the
    // well, a rising one for the next photo springing back out of it.
    sfx.swap();
    setIndex((i) => (i + 1) % photos.length);
    setSwapping(true);
  };

  return (
    <div className={cn("relative w-fit", className)}>
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
        {/* Outer lip. Purely a ring; the page shows through it. */}
        <span aria-hidden className="border-rule absolute inset-0 rounded-[22%] border" />

        {/* The dish the photo drops into, and what you see during the swap. */}
        <span aria-hidden className="avatar-well absolute inset-[11%] rounded-[14%]" />

        {/* No clipping here: the photo scales as a whole rounded tile, so the
            well is revealed behind it rather than the image sliding under a mask.

            The tile is centred rather than stretched to the slot, because it is
            sized to the photo instead of the other way round. A portrait photo
            therefore leaves a little of the dish showing down each side, which is
            the right trade: the alternative is filling the square by enlarging the
            middle of the photo, which puts the lens six inches from my face. */}
        <span className="absolute inset-[16%] flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={photo.src}
              className="block overflow-hidden rounded-[9%]"
              /* One definite edge plus the ratio; the other edge follows. Which
                 edge is definite depends on the photo, since the slot is square:
                 constrain the long one and the short one can only come out
                 smaller. Set here rather than in a class because the ratio is
                 data, not design. */
              style={{
                aspectRatio: `${photo.width} / ${photo.height}`,
                ...longEdge,
                willChange: "transform, opacity",
              }}
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
            >
              <Image
                src={photo.src}
                alt={`${SITE.name}, photo ${index + 1} of ${photos.length}`}
                fill
                sizes="128px"
                priority={index === 0}
                /* The tile already matches the photo's ratio, so there is nothing
                   left to crop; this only absorbs the sub-pixel rounding that
                   percentage insets produce at 112px and 128px. */
                className="object-cover"
              />
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
}
