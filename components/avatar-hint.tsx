"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

import { cn } from "@/lib/utils";

/**
 * The hint waits for the page to finish arriving before it speaks. Any sooner and
 * it competes with the heading; much later and it reads as a popup.
 */
const START = 0.85;

/**
 * Three strokes in the order a hand would make them: the shaft in one motion, then
 * the two barbs, which are flicks rather than lines and so take almost no time.
 *
 * The shaft leaves the text at the top right, runs left, loops once on itself and
 * then drops to the tip at the bottom, where the photo is. The loop is the whole
 * character of the thing: a straight arrow is a diagram, a looped one is somebody's
 * pen wandering.
 */
const STROKES: { d: string; delay: number; duration: number }[] = [
  {
    d: "M94,8C84,5 66,4 54,10C42,16 34,26 36,34C37.6,40.4 46,44 51,41C56,38 55,30 49,27C43,24 34,26 29,32C24,38 22,46 22.5,56",
    delay: 0,
    duration: 0.78,
  },
  // the two barbs of the head, thrown on after the pen has stopped falling
  { d: "M22.5,58C23.5,53 26,46 30,41", delay: 0.82, duration: 0.13 },
  { d: "M22.5,58C20,54 16.5,50 12,47", delay: 0.94, duration: 0.13 },
];

/**
 * Two lines, because a whisper is short — and both kept under about twenty characters,
 * because beside a 112px photo on a 320px screen the note has 156px to live in, and a
 * longer line wraps itself into "is a / toy," which reads as a bug rather than a hand.
 */
const LINES = ["psst — that photo", "is a toy, click it"];

/**
 * The aside that hangs above the avatar and points down into it, in the spirit of
 * the one on swamii.me: a hand-drawn arrow and a line of handwriting in the margin,
 * saying the thing the interface can't say for itself.
 *
 * It draws itself on load the way the signature does — stroke by stroke, pen never
 * lifting mid-shaft — and then stays, because it's a piece of the page rather than
 * a tooltip waiting to be dismissed.
 *
 * Hovering the handwriting darkens the whole note, arrow included, so it answers to
 * the pointer as one object rather than two. Only the text takes the pointer: the
 * box around it is left transparent to clicks so it can't shadow anything beneath.
 *
 * On a phone the note stacks — arrow first, handwriting under it — and sits in the
 * column beside the photo. Side by side it measures 245px, which next to a 112px photo
 * does not fit a 320px screen; stacked it is only as wide as its longest line.
 *
 * Stacked, the arrow is also turned a quarter-turn's worth clockwise about its own tip.
 * Drawn flat it falls from top-right to bottom-left, which beside the photo aims it at
 * the floor below the frame; pivoting on the tip swings the shaft round to come in from
 * the right instead, so it runs at the photo rather than past it, and leaves the tail
 * sitting over the handwriting that follows. The handwriting is then indented to hang
 * off that tail, which is what keeps the two reading as one gesture.
 *
 * Nothing here is announced — it's aria-hidden, and `AvatarToy` keeps the real label
 * for anyone not looking at the page.
 */
export function AvatarHint({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn(
        "text-faint pointer-events-none flex w-fit flex-col items-start gap-1 transition-colors duration-200 select-none",
        "sm:flex-row",
        "hover:text-muted-foreground",
        className,
      )}
    >
      <svg
        viewBox="0 0 100 68"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        preserveAspectRatio="xMidYMid meet"
        className="h-10 w-14 shrink-0 origin-bottom-left rotate-[28deg] sm:h-12 sm:w-16 sm:rotate-0"
      >
        {STROKES.map((stroke, i) => (
          <motion.path
            key={i}
            d={stroke.d}
            initial={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                duration: reduceMotion ? 0 : stroke.duration,
                delay: reduceMotion ? 0 : START + stroke.delay,
                ease: "easeInOut",
              },
              // A round cap paints a dot even at zero length, so a stroke has to
              // stay invisible until the pen reaches it.
              opacity: { duration: 0, delay: reduceMotion ? 0 : START + stroke.delay },
            }}
          />
        ))}
      </svg>

      {/* The tilt is what keeps this reading as a margin note rather than a caption.
          Set on the block, not the lines, so the two stay parallel.

          Shallower on a phone, where the note is already sitting at an angle under the
          turned arrow and the full 7° reads as two things leaning against each other.
          The 32px indent is as far right as it can hang: at 320px the column beside the
          photo is 156px wide and the longest line measures 114px, so this leaves about
          eight to spare before "is a toy, click it" starts breaking across lines. */}
      <motion.p
        className="pointer-events-auto ml-8 origin-left -rotate-[3deg] font-mono text-[0.625rem] leading-[1.6] tracking-wide sm:ml-0 sm:-rotate-[7deg] sm:text-[0.6875rem]"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.45,
          delay: reduceMotion ? 0 : START + 0.5,
          ease: "easeOut",
        }}
      >
        {LINES.map((line, i) => (
          <React.Fragment key={line}>
            {i > 0 ? <br /> : null}
            {line}
          </React.Fragment>
        ))}
      </motion.p>
    </div>
  );
}
