import React from "react";

import { cn } from "@/lib/utils";

/**
 * Where a section rule meets a column rail we don't want a corner — we want a plus.
 * Two background-coloured bars erase both hairlines over a 24px square, then the
 * glyph sits in the gap they leave behind.
 */
const Cross = () => (
  <div aria-hidden className="relative size-6">
    <div className="bg-theme-bg absolute left-3 h-6 w-px" />
    <div className="bg-theme-bg absolute top-3 h-px w-6" />
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className="text-connection-strong absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
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
 * One band of the page: a rule bleeding to the viewport edges, rails down both sides
 * of the content column, and a plus wherever the two cross. Rails and crosses only
 * appear from `sm` up, where there is gutter to spare outside the column.
 */
export function Section({
  children,
  className,
  innerClassName,
  hideCrosses = false,
  ...rest
}: SectionProps) {
  return (
    <section className={cn("border-connection border-b", className)} {...rest}>
      <div className="relative mx-auto max-w-2xl">
        <div
          className={cn("border-connection px-4 py-8 sm:border-x sm:px-6 sm:py-10", innerClassName)}
        >
          {children}
        </div>
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
    </section>
  );
}
