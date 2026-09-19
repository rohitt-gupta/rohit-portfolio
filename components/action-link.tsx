import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

/** The little arrow that slides on hover. Shared by every "go somewhere" affordance. */
const Arrow = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className={cn("size-3.5 transition-transform duration-200", className)}
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Solid accent block instead of the quiet bordered pill. */
  variant?: "ghost" | "solid" | "outline";
  external?: boolean;
};

export function ActionLink({ href, children, className, variant = "ghost", external }: Props) {
  const content = (
    <>
      <span>{children}</span>
      <Arrow className="group-hover:translate-x-0.5" />
    </>
  );

  const classes = cn(
    "font-secondary group inline-flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors",
    variant === "ghost" && "text-muted-foreground hover:text-accent",
    variant === "outline" &&
      "border-border hover:border-accent hover:text-accent rounded-md border px-3.5 py-2",
    variant === "solid" && "bg-foreground text-background rounded-md px-3.5 py-2 hover:opacity-90",
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
