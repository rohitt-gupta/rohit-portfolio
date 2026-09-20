import React from "react";

import { BrandIcon } from "@/components/brand-icon";
import { TECH_LINKS } from "@/lib/tech-links";
import { cn } from "@/lib/utils";

/**
 * One technology: its mark, its name, and a link out to it.
 *
 * Shared by the toolkit and the experience list so the two never drift — the hover
 * roll and the id namespacing are fiddly enough that a second copy would.
 * A label with no entry in TECH_LINKS renders as a plain span rather than a dead
 * link, so adding a technology can never produce a chip that goes nowhere.
 */
export function TechChip({
  name,
  uid = "",
  className,
}: {
  name: string;
  /** Namespaces the marks' internal ids. Must be unique per chip on the page. */
  uid?: string;
  className?: string;
}) {
  const href = TECH_LINKS[name];
  const Tag = href ? "a" : "span";

  return (
    <Tag
      {...(href && { href, target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "border-connection group inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 transition-colors",
        href && "hover:border-accent/50 hover:text-accent",
        className,
      )}
    >
      {/* The mark keeps full ink while the label may be muted, so the marks drawn in
          currentColor sit at the same weight as the coloured ones instead of washing
          out beside them — and they stay themselves on hover rather than turning
          the accent colour with the text.

          Two copies of the mark roll through a clipped window: the one on show
          leaves upward as its twin arrives from below, and the pair reverses on the
          way out. Outgoing is the quicker of the two so the window is never empty
          mid-roll. ease-in-out rather than the page's shared --ease-out-strong:
          that curve spends four fifths of its travel in the first fifth of the time,
          which is right for a colour or a nudge but turns fourteen pixels of travel
          into a snap. This one wants to be seen moving. */}
      <span
        aria-hidden
        className="text-foreground relative block size-3.5 shrink-0 overflow-hidden"
      >
        <BrandIcon
          name={name}
          uid={`-${uid}-out`}
          className="absolute inset-0 transition duration-[250ms] ease-in-out group-hover:-translate-y-full group-hover:opacity-0"
        />
        <BrandIcon
          name={name}
          uid={`-${uid}-in`}
          className="absolute inset-0 translate-y-full opacity-0 transition duration-[350ms] ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
        />
      </span>
      {name}
    </Tag>
  );
}
