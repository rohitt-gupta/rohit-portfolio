"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const SPRING = { type: "spring" as const, stiffness: 320, damping: 22 };

/**
 * The photo you can poke. Each click flips it and swaps in the next shot from
 * SITE.photos; the hint only shows until you've worked that out for yourself.
 */
export function AvatarToy({ className }: { className?: string }) {
  const photos = SITE.photos;
  const [index, setIndex] = useState(0);
  const [poked, setPoked] = useState(false);
  const reduceMotion = useReducedMotion();

  const multiple = photos.length > 1;

  const cycle = () => {
    if (!multiple) return;
    setIndex((i) => (i + 1) % photos.length);
    setPoked(true);
  };

  return (
    <div className={cn("group relative w-fit", className)}>
      <motion.button
        type="button"
        onClick={cycle}
        aria-label={multiple ? "Show another photo of me" : `Photo of ${SITE.name}`}
        disabled={!multiple}
        whileTap={multiple ? { scale: 0.94 } : undefined}
        transition={SPRING}
        className={cn(
          "border-border bg-muted relative block size-20 overflow-hidden rounded-xl border sm:size-24",
          multiple && "cursor-pointer",
        )}
        style={{ perspective: 800 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={photos[index]}
            className="absolute inset-0 block"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: -70, scale: 1.1 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: 70, scale: 1.1 }}
            transition={SPRING}
          >
            <Image
              src={photos[index]}
              alt={`${SITE.name}, photo ${index + 1} of ${photos.length}`}
              fill
              sizes="96px"
              priority={index === 0}
              className="object-cover"
            />
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {multiple && !poked ? (
        <span
          aria-hidden
          className="font-secondary text-faint bg-background pointer-events-none absolute -right-2 -bottom-2 translate-y-1 rounded-full border border-current/20 px-2 py-0.5 text-[0.625rem] tracking-wide opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          click me
        </span>
      ) : null}
    </div>
  );
}
