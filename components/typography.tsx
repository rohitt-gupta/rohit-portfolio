import React from "react";

import { cn } from "@/lib/utils";

/**
 * The small tracked label that sits above a heading and tells you what band of the
 * page you're in. Space Grotesk, because it holds up at 11px where Bricolage doesn't.
 */
export const Eyebrow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p
    className={cn(
      "font-secondary text-muted-foreground text-[0.6875rem] font-medium tracking-[0.18em] uppercase",
      className,
    )}
  >
    {children}
  </p>
);

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  /** Rendered element. Defaults to h2 — the hero passes h1. */
  as?: "h1" | "h2" | "h3";
};

/** Bricolage Grotesque, tight and dark. The only thing on the page allowed to shout. */
export const Heading = ({ children, className, as: Tag = "h2" }: HeadingProps) => (
  <Tag
    className={cn(
      "font-display text-foreground text-balance",
      Tag === "h1"
        ? "text-[2.125rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl"
        : Tag === "h2"
          ? "text-2xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[1.75rem]"
          : "text-lg leading-snug font-semibold tracking-[-0.02em]",
      className,
    )}
  >
    {children}
  </Tag>
);

/** Body copy at the size everything else is measured against. */
export const Lede = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={cn("text-muted-foreground text-[0.9375rem] leading-relaxed", className)}>
    {children}
  </p>
);

/**
 * Eyebrow + heading + an optional link pinned to the right (View all projects, and
 * friends). Every section on the site opens with one of these.
 */
export const SectionHeader = ({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex items-end justify-between gap-6", className)}>
    <div className="flex flex-col gap-2">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading>{title}</Heading>
    </div>
    {action ? <div className="shrink-0 pb-1">{action}</div> : null}
  </div>
);
