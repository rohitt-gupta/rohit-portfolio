"use client";

import Image from "next/image";
import React from "react";

import { ActionLink } from "@/components/action-link";
import { Highlight } from "@/components/highlight";
import { Eyebrow } from "@/components/typography";
import { CURRENT_PROJECT, type ProjectPreview } from "@/lib/projects";
import { hoverSfx, sfx } from "@/lib/sfx";
import { withRef } from "@/lib/site";
import { TECH_LINKS } from "@/lib/tech-links";
import { cn } from "@/lib/utils";

/** Slow breathing dot. The only thing on the page that loops. */
const LiveDot = () => (
  <span aria-hidden className="relative flex size-1.5">
    <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-60 [animation-duration:2.4s]" />
    <span className="bg-accent relative inline-flex size-1.5 rounded-full" />
  </span>
);

/**
 * The screenshot half: hatch along the top and left, the shot itself running off the
 * right edge and the bottom. Cropping it is the point: a page that carries on past
 * the frame reads as a real thing being used, where a whole screenshot floating with
 * margin all round reads as a thumbnail.
 *
 * The frame is absolutely positioned and inset NEGATIVE on two sides, so its height
 * can never push the row: the band is exactly as tall as the column beside it and the
 * shot is cut wherever that lands. `object-cover` from the top-left then fills that
 * box whatever the source aspect is.
 *
 * The right inset is deliberately large. It isn't padding, it's how much of the shot
 * gets carried off the edge, and a timid 1rem reads as a misaligned image rather than
 * a deliberate crop.
 *
 * Only the top-left corner is rounded. The other three are off-screen.
 */
const Preview = ({
  preview,
  href,
  backdrop,
}: {
  preview: ProjectPreview;
  href?: string;
  backdrop?: string;
}) => {
  const Frame = href ? "a" : "div";

  return (
    <div
      className="bg-hatch border-rule group relative min-h-56 overflow-hidden border-t sm:min-h-72 lg:min-h-0 lg:border-t-0 lg:border-l"
      // The whole half is the hover target, not just the screenshot, so the
      // sound and the scene arrive together wherever the pointer crosses in.
      {...hoverSfx(sfx.hover)}
    >
      {/* The hatch is the resting state; hovering trades it for the photograph
          underneath the shot. Mounted at zero opacity rather than swapped in on
          hover, so the first hover is not a blank band waiting on a fetch. */}
      {backdrop ? (
        <Image
          aria-hidden
          alt=""
          src={backdrop}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
      ) : null}
      <Frame
        {...(href && {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-hidden": true,
          tabIndex: -1,
        })}
        className="absolute top-6 -right-10 -bottom-10 left-6 sm:top-8 sm:left-8 lg:-right-24"
      >
        <div className="border-connection bg-card relative size-full overflow-hidden rounded-tl-xl border shadow-[0_24px_48px_-28px_var(--well-shadow)]">
          {/* The shot leans in a little while the scene comes up behind it. From
              the top-left, matching object-left-top, so the zoom pushes further
              past the crop rather than drifting the whole page sideways. The
              frame itself stays put; its geometry is what makes the bleed read
              as deliberate. */}
          <Image
            src={preview.src}
            alt={preview.alt}
            fill
            sizes="(max-width: 1024px) 120vw, 640px"
            className="origin-top-left object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Frame>
    </div>
  );
};

/**
 * The "what's he actually doing right now" band: the one project worth reading a
 * paragraph about, so it gets the whole width rather than a tile in the work grid.
 * zagrodzki.me runs the same idea on his home page, and it is the reason this
 * section exists at all.
 *
 * Split 40/60 at `lg`, the thing itself taking the larger half. That ratio is the
 * whole design: the screenshot carries the section and the copy is a caption hung
 * beside it, which is why the prose here sits at body scale rather than the hero's.
 * An even split with display-size type gave both halves too little: a cramped
 * 30-character measure next to a screenshot too small to read.
 *
 * The section hands its padding over (`innerClassName="p-0 sm:p-0"` on the Section) so
 * the panel can reach the column rails and the hatch behind the screenshot lines up
 * with the same diagonals running down the page gutters.
 */
export const CurrentProject = () => {
  const { title, status, tagline, description, href, stack, preview, backdrop } = CURRENT_PROJECT;
  // All three ways out of the band, the name, the button and the screenshot, carry
  // the same tagged link.
  const outbound = href ? withRef(href) : undefined;

  return (
    <div
      className={cn(
        "grid",
        preview && "lg:min-h-[22rem] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
      )}
    >
      <div className="flex flex-col gap-5 px-5 py-10 sm:px-8 sm:py-12 lg:pt-8 lg:pr-7 lg:pb-10">
        <div className="flex items-center justify-between gap-3">
          <Eyebrow>Now</Eyebrow>
          <span className="font-secondary text-accent inline-flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.12em] uppercase">
            <LiveDot />
            {status}
          </span>
        </div>

        {/*
          Body scale, not hero scale. The claim stays in full ink and the elaboration
          drops to muted behind it, the same two-tone the hero bio uses, but at 15/16px,
          because this column is 40% of an already-capped 54rem and anything larger sets
          five words to a line. The project name is a marker-pen highlight rather than a
          heading, so the whole thing stays one sentence you can read.
        */}
        <p className="font-secondary text-foreground text-[0.9375rem] leading-[1.6] font-medium tracking-[-0.01em] lg:text-base">
          <Highlight tone="peach" href={outbound}>
            {title}
          </Highlight>{" "}
          is {tagline} <span className="text-muted-foreground font-normal">{description}</span>
        </p>

        {/* `mt-auto` drops this to the floor of the column. The gap it opens up under
            short copy is deliberate: the band is framed by its rules, and the button
            wants to sit on the bottom one. */}
        <div className="mt-auto flex flex-col items-start gap-4 pt-6">
          <div className="text-faint font-secondary flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] tracking-wide">
            {stack.map((tech, i) => (
              <React.Fragment key={tech}>
                {i > 0 ? <span aria-hidden>·</span> : null}
                {TECH_LINKS[tech] ? (
                  <a
                    href={TECH_LINKS[tech]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {tech}
                  </a>
                ) : (
                  <span>{tech}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {outbound ? (
            <ActionLink
              href={outbound}
              variant="outline"
              external
              className="bg-card shadow-[0_1px_2px_var(--well-shadow)]"
            >
              Check it out
            </ActionLink>
          ) : null}
        </div>
      </div>

      {preview ? <Preview preview={preview} href={outbound} backdrop={backdrop} /> : null}
    </div>
  );
};
