import React from "react";

import { SfxLink } from "@/components/sfx-link";
import { cn } from "@/lib/utils";

/**
 * A link inside running prose, and the quietest one on the site.
 *
 * The home page has two louder devices: a pastel highlight behind the word, and a
 * logo set in front of it. Both are for the handful of links a reader should stop
 * at. The about page is the opposite problem, thirty-odd links inside a story, and
 * either of those would turn it into a page of tags. So this is the whole
 * treatment: full ink against the muted prose, and a dotted rule underneath.
 *
 * The rule is dotted rather than solid because solid underlines at this size read
 * as a form field, and dotted is already the site's mark for "there is more here"
 * on the nav and the footer.
 */
export function ProseLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SfxLink
      href={href}
      className={cn(
        "text-foreground decoration-connection hover:decoration-accent hover:text-accent underline decoration-dotted decoration-1 underline-offset-[3px] transition-colors",
        className,
      )}
    >
      {children}
    </SfxLink>
  );
}
