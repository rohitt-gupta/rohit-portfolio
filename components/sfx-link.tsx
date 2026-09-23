"use client";

import React from "react";

import { hoverSfx } from "@/lib/sfx";

/**
 * An external link that ticks when the pointer arrives, and nothing else.
 *
 * It is its own client component so that the things inside it do not have to be.
 * `brand-icon.tsx` is 135KB of paths — 49KB gzipped — in a single object that
 * cannot be tree-shaken, which is the very reason this repo draws its own marks
 * rather than taking a dependency on a library that ships all of them. A client
 * component that imported it would hand the browser that whole table to render
 * one atom. So the marks stay server-rendered and arrive here as children, and
 * these few lines are all that cross the boundary.
 */
export function SfxLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...hoverSfx()} className={className}>
      {children}
    </a>
  );
}
