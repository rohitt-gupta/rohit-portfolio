import React from "react";

import { cn } from "@/lib/utils";

/**
 * Where a section rule meets a column rail we don't want a corner — we want a plus.
 * Two background-coloured bars erase both hairlines over a 24px square, then the
 * glyph sits in the gap they leave behind.
 *
 * Drawn in --rule like every other hairline, at the stroke width that renders to 1px
 * once the 24-unit viewBox is scaled into 20px (24 / 20 × 1 = 1.2) — so the plus is
 * the same colour AND the same weight as the lines it marks.
 */
const Cross = () => (
  <div aria-hidden className="relative size-6">
    <div className="bg-background absolute left-3 h-6 w-px" />
    <div className="bg-background absolute top-3 h-px w-6" />
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      className="text-rule absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  </div>
);

export type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  /** Classes on the railed column itself — padding, layout, min-height. */
  innerClassName?: string;
  /** Omit the plus markers where this section meets the next. */
  hideCrosses?: boolean;
};

/**
 * One band of the page: a rule bleeding to the viewport edges, a centred content
 * column with a rail down each side, and a diagonally hatched gutter beyond it.
 *
 * Five grid tracks, collapsing to a single column below `sm`:
 *
 *     1fr | 38px hatch | min(54rem, 100% - 76px) | 38px hatch | 1fr
 *
 * The hatch is a fixed-width band hugging the column, not the whole gutter — plain
 * background runs from there out to the viewport edge. Capping the middle track at
 * `100% - 76px` reserves room for both bands, so they never collapse and the plus
 * markers never get clipped against the screen edge.
 *
 * 54rem rather than a rounder 48rem because the contribution graph needs 781px of
 * content box in its worst case (a 54-column year); 54rem leaves 800px. Long-form
 * text doesn't get dragged out with it — body copy is capped at `max-w-prose`.
 *
 * Each band carries only its OUTER hairline; the inner one is the column's own rail,
 * so the two can't double up into a 2px line. Rules, rails and band edges all draw
 * from --rule, so the whole frame is a single weight.
 */
export function Section({
  children,
  className,
  innerClassName,
  hideCrosses = false,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("border-rule border-b", className)} {...rest}>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_38px_min(54rem,calc(100%_-_76px))_38px_1fr]">
        <div aria-hidden className="hidden sm:block" />
        <div aria-hidden className="bg-hatch border-rule hidden border-l sm:block" />

        {/* min-w-0 so a wide child (the contribution graph) scrolls itself rather than
            stretching the track past its 54rem cap. */}
        <div className="border-rule relative min-w-0 sm:border-x">
          <div className={cn("px-5 py-10 sm:px-8 sm:py-14", innerClassName)}>{children}</div>

          {hideCrosses ? null : (
            <>
              <div className="absolute -bottom-3 -left-3 z-10 hidden sm:block">
                <Cross />
              </div>
              {/* Nudged a pixel left so the glyph centres on the rail, not outside it. */}
              <div className="absolute -right-3 -bottom-3 z-10 hidden -translate-x-px sm:block">
                <Cross />
              </div>
            </>
          )}
        </div>

        <div aria-hidden className="bg-hatch border-rule hidden border-r sm:block" />
        <div aria-hidden className="hidden sm:block" />
      </div>
    </section>
  );
}
