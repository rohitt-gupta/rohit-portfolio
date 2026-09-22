import Image from "next/image";
import React from "react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type Photo = { src: string; width: number; height: number };

/**
 * One photo, framed and dropped at an angle, in the spirit of the prints
 * braydoncoyer.dev scatters under his hero.
 *
 * Two things stacked: an empty frame sitting square to the page, and the print
 * lying on top of it turned a few degrees. The frame is the same hairline ring and
 * debossed dish the avatar sits in. This site already took that detail from him,
 * so the two read as one idea rather than two takes on it. Leaving the frame
 * straight while the print is not is the whole effect: the dish shows only at the
 * corners, where the rotation uncovers it, and the shadow gets an edge to fall on.
 *
 * `object-top`, because a 2:3 crop of a square photo has to lose something and
 * losing the feet beats losing the face.
 */
export function Print({
  photo,
  rotate = "-rotate-[4deg]",
  sizes = "(min-width: 1024px) 176px, 128px",
  className,
}: {
  photo: Photo;
  /** A Tailwind rotation. Hand-picked per print: random would differ between the
   *  server and the client, and React calls that a hydration error. */
  rotate?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[2/3] w-32 shrink-0 lg:w-44", className)}>
      <div aria-hidden className="border-rule absolute inset-0 rounded-xl border" />
      <div aria-hidden className="avatar-well absolute inset-[6%] rounded-lg" />
      <Image
        src={photo.src}
        alt={SITE.name}
        fill
        sizes={sizes}
        className={cn(
          "rounded-lg object-cover object-top shadow-lg shadow-black/15",
          "transition-transform duration-300 ease-(--ease-out-strong) hover:rotate-0",
          rotate,
        )}
      />
    </div>
  );
}
