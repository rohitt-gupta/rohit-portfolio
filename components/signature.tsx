"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

import { cn } from "@/lib/utils";

/**
 * A drawn signature for Rohit.
 *
 * The name is a single path, so it animates as one continuous pen motion rather than
 * pieces appearing, which is what makes it read as writing rather than assembly.
 * Only the bar, the dot and the underline lift the pen, and they come in that order,
 * the way you finish a signature.
 *
 * The pen climbs in on a line, tops out above the R and brings the stem back down,
 * then retraces up into the bowl; o hands to h and i to t on the join.
 */
const STROKES: { d: string; delay: number; duration: number }[] = [
  // the name, in one unbroken motion
  {
    d: "M4.0,58.0C6.1,57.3 12.2,56.3 16.6,54.0C20.9,51.7 25.4,48.3 30.0,44.0C34.6,39.7 39.8,33.3 44.2,28.0C48.6,22.7 52.9,16.0 56.5,12.0C60.0,8.0 64.8,2.7 65.6,4.0C66.4,5.3 63.4,14.0 61.3,20.0C59.3,26.0 56.1,33.3 53.5,40.0C50.9,46.7 48.2,53.3 45.7,60.0C43.3,66.7 38.8,79.3 38.9,80.0C39.0,80.7 43.5,70.0 46.2,64.0C48.8,58.0 52.3,50.2 55.0,44.0C57.7,37.8 59.3,31.0 62.4,27.0C65.4,23.0 69.8,20.5 73.3,20.0C76.9,19.5 82.2,21.2 83.8,24.0C85.4,26.8 85.0,33.3 83.0,37.0C80.9,40.7 75.3,44.0 71.7,46.0C68.1,48.0 61.5,47.2 61.3,49.0C61.0,50.8 67.2,54.3 70.1,57.0C73.1,59.7 76.4,62.2 79.0,65.0C81.6,67.8 83.4,74.2 85.8,74.0C88.1,73.8 91.4,67.3 93.2,64.0C95.0,60.7 94.8,56.8 96.6,54.0C98.3,51.2 100.9,48.2 103.5,47.0C106.2,45.8 110.2,45.7 112.5,47.0C114.9,48.3 117.0,51.8 117.4,55.0C117.8,58.2 116.8,63.0 114.9,66.0C113.0,69.0 108.8,72.3 105.9,73.0C103.0,73.7 98.9,72.0 97.3,70.0C95.8,68.0 95.7,64.0 96.6,61.0C97.5,58.0 100.5,54.7 102.8,52.0C105.2,49.3 108.3,47.3 110.8,45.0C113.3,42.7 115.5,41.2 117.8,38.0C120.1,34.8 122.1,30.0 124.5,26.0C126.9,22.0 129.7,17.5 132.2,14.0C134.7,10.5 137.4,5.7 139.4,5.0C141.5,4.3 144.5,6.8 144.7,10.0C145.0,13.2 142.6,19.0 140.8,24.0C138.9,29.0 135.6,34.8 133.5,40.0C131.5,45.2 129.7,49.7 128.4,55.0C127.2,60.3 125.1,71.2 126.0,72.0C126.9,72.8 130.6,63.5 133.7,60.0C136.9,56.5 141.5,51.8 145.0,51.0C148.4,50.2 152.8,52.3 154.4,55.0C156.0,57.7 154.5,63.8 154.7,67.0C155.0,70.2 154.5,74.5 155.8,74.0C157.0,73.5 159.9,68.2 162.2,64.0C164.4,59.8 167.6,52.5 169.3,49.0C170.9,45.5 171.4,43.0 172.1,43.0C172.8,43.0 173.2,45.8 173.3,49.0C173.3,52.2 172.7,58.0 172.4,62.0C172.2,66.0 170.8,71.0 171.9,73.0C172.9,75.0 176.6,74.2 178.8,74.0C180.9,73.8 182.8,75.8 185.0,72.0C187.2,68.2 189.6,58.2 192.0,51.0C194.3,43.8 196.9,36.3 199.1,29.0C201.3,21.7 204.7,7.0 205.2,7.0C205.7,7.0 203.1,21.7 202.1,29.0C201.0,36.3 199.6,44.2 199.0,51.0C198.4,57.8 197.4,65.8 198.3,70.0C199.2,74.2 201.7,75.3 204.5,76.0C207.2,76.7 211.4,75.2 214.8,74.0C218.1,72.8 222.8,69.8 224.5,69.0",
    delay: 0,
    duration: 1.7,
  },
  // the bar across the t
  {
    d: "M187.0,37.0C189.2,36.5 195.7,35.2 200.4,34.0C205.0,32.8 212.5,30.7 214.9,30.0",
    delay: 1.77,
    duration: 0.16,
  },
  // the dot on the i
  { d: "M173.2,28.0 L175.4,27.0", delay: 1.99, duration: 0.08 },
  // the underline, left to right
  {
    d: "M10.7,96.0C18.3,95.8 40.4,95.7 56.8,95.0C73.2,94.3 91.7,93.2 109.2,92.0C126.7,90.8 144.9,89.7 161.8,88.0C178.7,86.3 196.0,84.0 210.6,82.0C225.2,80.0 239.9,78.0 249.5,76.0C259.1,74.0 265.2,71.0 268.3,70.0",
    delay: 2.17,
    duration: 0.46,
  },
];

export function Signature({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 272.3 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      // Without this the SVG stretches to the flex line and the viewBox centres itself.
      preserveAspectRatio="xMinYMid meet"
      aria-label="Rohit signature"
      className={cn("text-foreground h-12 w-33", className)}
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
              delay: reduceMotion ? 0 : stroke.delay,
              ease: "easeInOut",
            },
            // A round cap paints a dot even at zero length, so a stroke stays
            // invisible until the pen reaches it.
            opacity: { duration: 0, delay: reduceMotion ? 0 : stroke.delay },
          }}
        />
      ))}
    </svg>
  );
}
