import React from "react";

import { cn } from "@/lib/utils";

/**
 * A chapter's picture, and on a phone the place tag that keeps it company.
 *
 * From `lg` the picture stands alone in the right-hand column, which is where it
 * always was. Below that it drops under the prose, and one print sitting at the left
 * of a 335px screen with nothing beside it looked abandoned rather than placed. So
 * the row fills: the print on the left, at its angle, and beside it a tag set square
 * to the page with the place, a line of coordinates or a handle, and the years, in
 * the mono the map's own labels use. A caption that grew a box, which is what it is.
 *
 * The tag is a stand-in as much as a design. A chapter with a second photograph can
 * drop it into this slot instead and the row works the same.
 */
export function StoryAside({
  place,
  lines,
  caption,
  children,
  className,
}: {
  /** Where the chapter happens. The tag's heading. */
  place: string;
  /** Under the place: coordinates, a handle, the years. One string per row. */
  lines: string[];
  /** One line under the picture from `lg`, where the tag is hidden. */
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-stretch gap-3", className)}>
      <figure className="m-0 flex shrink-0 flex-col gap-1.5">
        {children}
        {caption ? (
          <figcaption className="text-faint hidden font-mono text-[0.5625rem] tracking-wide lg:block">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {/* The tag. Hairline frame like the prints, no fill, so it reads as a label
          rather than a second picture. The dot is the map's town marker, reused. */}
      <div className="border-rule flex min-w-0 flex-1 flex-col justify-between gap-6 rounded-xl border p-3.5 lg:hidden">
        <p className="font-secondary text-muted-foreground flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.18em] uppercase">
          <span aria-hidden className="bg-accent size-1.5 shrink-0 rounded-full" />
          {place}
        </p>
        <div className="text-faint flex flex-col gap-0.5 font-mono text-[0.625rem] leading-relaxed tracking-wide">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
