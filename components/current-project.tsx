import React from "react";

import { ActionLink } from "@/components/action-link";
import { Eyebrow, Heading } from "@/components/typography";
import { CURRENT_PROJECT } from "@/lib/projects";

/** Slow breathing dot. The only thing on the page that loops. */
const LiveDot = () => (
  <span aria-hidden className="relative flex size-1.5">
    <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-60 [animation-duration:2.4s]" />
    <span className="bg-accent relative inline-flex size-1.5 rounded-full" />
  </span>
);

/**
 * The "what's he actually doing right now" band. Deliberately given more room than
 * a grid card — this is the one project worth reading a paragraph about.
 */
export const CurrentProject = () => {
  const { title, status, tagline, description, href, stack } = CURRENT_PROJECT;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>Currently building</Eyebrow>
        <span className="font-secondary text-accent inline-flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
          <LiveDot />
          {status}
        </span>
      </div>

      <div className="border-connection bg-card relative overflow-hidden rounded-lg border p-6 sm:p-7">
        {/* A wash of accent in the corner so the card reads warm without a border colour. */}
        <div
          aria-hidden
          className="from-accent-soft pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-radial to-transparent opacity-60"
        />
        <div className="relative flex flex-col gap-3">
          <Heading>{title}</Heading>
          <p className="text-foreground text-[0.9375rem] leading-relaxed font-medium">{tagline}</p>
          <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
            {description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="font-secondary text-muted-foreground border-connection rounded-full border px-2.5 py-1 text-[0.6875rem] tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>

          {href ? (
            <div className="mt-3">
              <ActionLink href={href} variant="outline" external>
                Take a look
              </ActionLink>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
