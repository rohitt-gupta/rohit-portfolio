"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

import { cn } from "@/lib/utils";

/**
 * Monoline script "Rohit", drawn stroke by stroke on first paint.
 *
 * TODO: this is a stand-in built from bezier curves — a signature should be *yours*.
 * Sign on paper, scan it, run it through a trace (Figma's image trace or potrace),
 * and drop the resulting `d` strings into STROKES below. Order them the way your pen
 * moves and the animation stays correct for free.
 */
const STROKES: { d: string; duration: number }[] = [
  // Capital R: stem, bowl, leg.
  {
    d: "M20 80 C22 60 25 38 30 18 C48 12 66 22 60 40 C55 54 38 56 28 52 C40 62 52 72 64 80",
    duration: 0.9,
  },
  // o-h-i-t in one connected run.
  {
    d: "M64 80 C72 84 84 80 88 68 C92 56 86 46 78 48 C70 50 68 62 72 70 C76 78 88 82 96 78 C100 58 104 38 107 19 C109 38 105 60 104 76 C105 65 111 55 119 57 C126 59 125 70 123 80 C126 71 130 62 135 58 C136 66 135 74 137 80 C141 74 145 66 150 61 C152 48 154 34 155 24 C154 42 151 60 152 73 C153 82 162 85 170 79",
    duration: 1.5,
  },
  // Crossbar of the t.
  { d: "M142 53 C150 50 158 48 166 47", duration: 0.25 },
  // Dot over the i.
  { d: "M133 44 C134.5 43.4 136 43.4 137 44", duration: 0.18 },
  // The flourish that makes it a signature rather than handwriting.
  {
    d: "M170 79 C182 86 196 88 208 82 C214 79 216 74 214 71 C212 68 207 70 206 75 C205 82 212 88 222 88 C236 88 250 82 258 73",
    duration: 1.1,
  },
];

/**
 * Start time for each stroke, accumulated once at module scope. Strokes overlap by a
 * fifth so the pen never visibly stops between them.
 */
const DELAYS = STROKES.reduce<number[]>((acc, stroke, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + STROKES[i - 1].duration * 0.82);
  return acc;
}, []);

export function Signature({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 280 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      // Without this the SVG stretches to the flex line and the viewBox centres itself.
      preserveAspectRatio="xMinYMid meet"
      aria-label={`${"Rohit"} — signature`}
      className={cn(
        "text-foreground h-16 w-full max-w-[17rem] sm:h-20 sm:max-w-[21rem]",
        className,
      )}
    >
      {STROKES.map((stroke, i) => {
        return (
          <motion.path
            key={i}
            d={stroke.d}
            initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: reduceMotion ? 0 : stroke.duration,
              delay: reduceMotion ? 0 : DELAYS[i],
              ease: [0.22, 0.61, 0.36, 1],
            }}
          />
        );
      })}
    </svg>
  );
}
