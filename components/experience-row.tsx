"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import React from "react";

import { type HighlightTone, TONE_CLASS } from "@/components/highlight";
import { hoverSfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

/**
 * One company in the experience stack: a header that is always readable and a
 * body that is not, until you ask for it.
 *
 * The body arrives as `children` rather than being built here, so this file can
 * be the only client component in the section. Everything inside, the tech chips
 * and their 90-odd KB of brand marks included, stays server-rendered HTML that
 * this component only reveals.
 */

/** Points right when closed, down when open, the way a disclosure should. */
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(
      "size-4 shrink-0 transition-transform duration-300 ease-out",
      open ? "rotate-0" : "-rotate-90",
    )}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * Height on the outside, everything else on the inside.
 *
 * A single element cannot do both: `overflow-hidden` is what makes the height
 * animation possible, and it clips a blur into a hard edge against the row below.
 * So the outer box only ever changes height, and the inner one carries the blur,
 * the fade and the small lift with nothing clipping it.
 *
 * Opening leads with the height so the body has somewhere to land; closing leads
 * with the content, which is why the two have different delays.
 */
const PANEL: Variants = {
  open: { height: "auto", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  closed: { height: 0, transition: { duration: 0.32, ease: [0.4, 0, 1, 1], delay: 0.04 } },
};

const BODY: Variants = {
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1], delay: 0.06 },
  },
  closed: { opacity: 0, y: -8, filter: "blur(6px)", transition: { duration: 0.2 } },
};

export type ExperienceRowProps = {
  name: string;
  /** One or two characters for the tile. Defaults to the first of `name`. */
  mark?: string;
  /** The real logo, where there is one worth showing at this size. */
  logo?: { src: string };
  tone: HighlightTone;
  /** The pill beside the name: Full-time, Part-time, Self-employed. */
  badge?: string;
  /**
   * The job title, for a company with only one. Where there were several it is
   * left out, because the promotions belong on the rail inside the card.
   */
  role?: string;
  /** Dates, and where, on the line under the name. */
  meta: string;
  /** The company's own site. Without one the name is plain text. */
  href?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function ExperienceRow({
  name,
  mark,
  logo,
  tone,
  badge,
  role,
  meta,
  href,
  defaultOpen = false,
  children,
}: ExperienceRowProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const reduceMotion = useReducedMotion();
  const panelId = React.useId();

  return (
    <div className="group/row relative">
      {/* The toggle is a button stretched under the whole header rather than one
          wrapped around it, because a link inside a button is invalid HTML and
          browsers disagree about which one a click belongs to. Everything above
          it is pointer-events-none so clicks fall through to it, and only the
          company link opts back in. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        {...hoverSfx()}
        className="group-hover/row:bg-connection/20 absolute inset-0 z-0 w-full cursor-pointer transition-colors"
      >
        <span className="sr-only">{`${open ? "Hide" : "Show"} what I did at ${name}`}</span>
      </button>

      <div className="pointer-events-none relative z-10 flex items-center gap-4 p-4 sm:p-5">
        {/* The logo where the company publishes one, a tinted initial where it
            does not. Every logo is a square carrying its own ground, so it fills
            the tile and the tint only shows on the rows without one; the tones
            come from the highlight palette so those still belong to the page.

            A plain img, not next/image: these are 2 to 11 KB and already the
            size they are drawn at, so the optimiser has nothing to win. */}
        <span
          aria-hidden
          className={cn(
            "text-foreground/80 font-display grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl text-base font-semibold",
            !logo && TONE_CLASS[tone],
          )}
        >
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            (mark ?? name.charAt(0))
          )}
        </span>

        <span className="flex min-w-0 flex-col gap-1">
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...hoverSfx()}
                className="font-display text-foreground hover:text-accent pointer-events-auto text-base font-semibold tracking-[-0.02em] underline-offset-4 hover:underline sm:text-lg"
              >
                {name}
              </a>
            ) : (
              <span className="font-display text-foreground text-base font-semibold tracking-[-0.02em] sm:text-lg">
                {name}
              </span>
            )}
            {badge ? (
              <span className="border-connection text-muted-foreground font-secondary rounded-full border px-2 py-0.5 text-[0.6875rem] leading-none">
                {badge}
              </span>
            ) : null}
          </span>
          {role ? <span className="text-muted-foreground text-sm">{role}</span> : null}
          <span className="text-faint font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
            {meta}
          </span>
        </span>

        <span className="text-faint group-hover/row:text-muted-foreground ml-auto pl-2 transition-colors">
          <Chevron open={open} />
        </span>
      </div>

      <motion.div
        id={panelId}
        // Height zero leaves the body in the accessibility tree, and the chips
        // inside it are links, so this has to hide the subtree outright.
        aria-hidden={!open}
        inert={!open}
        initial={false}
        // Reduced motion leaves the variant system rather than animating to
        // nothing: naming variants that are no longer defined would resolve
        // against the parent and quietly do nothing.
        animate={reduceMotion ? undefined : open ? "open" : "closed"}
        variants={reduceMotion ? undefined : PANEL}
        style={reduceMotion ? { height: open ? "auto" : 0 } : undefined}
        className="overflow-hidden"
      >
        <motion.div
          variants={reduceMotion ? undefined : BODY}
          className="px-4 pb-5 sm:px-5 sm:pb-6"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
