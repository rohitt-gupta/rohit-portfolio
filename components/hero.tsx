import React from "react";

import { AvatarHint } from "@/components/avatar-hint";
import { AvatarToy } from "@/components/avatar-toy";
import { BrandIcon } from "@/components/brand-icon";
import { LinkPreview } from "@/components/link-preview";
import { Heading } from "@/components/typography";
import { SITE } from "@/lib/site";
import { TECH_LINKS } from "@/lib/tech-links";

/** The half-step down that lets a clause hang off a claim without competing with it. */
const Note = ({ children }: { children: React.ReactNode }) => (
  <span className="text-muted-foreground font-normal">{children}</span>
);

/**
 * Face, and the shortest honest version of who I am. Everything below this section
 * is evidence for the claims made in it.
 */
export const Hero = () => {
  return (
    <div className="flex flex-col gap-8">
      {/*
        Three pieces, two arrangements. On a phone the photo keeps the left and the
        note takes the space beside it, with the heading dropping underneath to the
        full measure — squeezed into the 200px left over next to a 34px heading it
        breaks into four ragged lines, and underneath it settles into two. From `sm`
        up there is room for the old shape: note above, photo and heading side by side.

        Grid rather than nested flex because those are the same three children in a
        different order, and swapping template areas says that in one line instead of
        duplicating the note into a mobile copy and a desktop copy.
      */}
      <div
        className={
          "grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-5 " +
          "[grid-template-areas:'avatar_hint''heading_heading'] " +
          "sm:gap-x-6 sm:gap-y-2 sm:[grid-template-areas:'hint_hint''avatar_heading']"
        }
      >
        <AvatarHint className="[grid-area:hint] sm:pl-10" />
        <AvatarToy className="shrink-0 [grid-area:avatar]" />
        <div className="flex flex-col gap-2 [grid-area:heading] sm:pt-1">
          <Heading as="h1">
            Product engineer,{" "}
            {/* A display:none br leaves no break behind, so the line only splits once
                there is room for the split to be deliberate. */}
            <br className="hidden sm:inline" />
            end to end.
          </Heading>
          <p className="font-secondary text-muted-foreground text-[0.8125rem] tracking-wide">
            {SITE.location}
          </p>
        </div>
      </div>

      {/*
        The bio carries the page, the way ozzyx.xyz's does: Space Grotesk at a fluid
        16→30px, medium weight, tight leading. Claims are set in full ink and the
        elaborations that hang off them drop to muted at regular weight, so the
        paragraph can be skimmed for its spine and read for the rest.
      */}
      <div className="font-secondary text-foreground flex max-w-prose flex-col gap-5 text-[clamp(1rem,0.45rem+2.28vw,1.875rem)] leading-[1.42] font-medium tracking-[-0.02em]">
        <p>
          Hey, I&apos;m Rohit! For the last five years I&apos;ve been building products on the
          internet with{" "}
          <LinkPreview url="https://nextjs.org" highlight="sky">
            React and Next.js
          </LinkPreview>{" "}
          <Note>on the front, TypeScript and Node behind it, and lately a lot of</Note>{" "}
          {/* The mark rides in front of the words, the way ozzyx.xyz sets soft machine:
              the logo and full ink are the emphasis, so this one needs no highlight and
              no rule under it, and the whole affordance on hover is the pair fading back
              — which is his too, down to the curve, since it is the same one the rest of
              this page eases on.

              The mark is sized in `em` rather than at the chips' fixed 14px, because this
              paragraph runs from 16px to 30px with the viewport and a fixed mark would
              shrink against the words as the screen grows. */}
          <a
            href={TECH_LINKS["React Native"]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[0.3em] transition-opacity duration-200 ease-(--ease-out-strong) hover:opacity-60"
          >
            <BrandIcon name="React Native" className="size-[0.85em]" />
            React Native
          </a>
          <Note>. That list changes every few years.</Note>
        </p>
        <p>
          Right now I&apos;m at{" "}
          {/* fynk gets the mark-in-front treatment too, and for the same reason: the
              logo and full ink say "this is a place" without another highlight colour
              entering the paragraph. A plain img rather than next/image, the way
              `experience-row.tsx` takes them — the file is a 100px square of a few KB
              and is already smaller than it is drawn. */}
          <a
            href="https://fynk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[0.3em] transition-opacity duration-200 ease-(--ease-out-strong) hover:opacity-60"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/fynk.jpg"
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="size-[0.85em] shrink-0 rounded-[0.18em] object-cover"
            />
            fynk
          </a>
          <Note>
            , where I&apos;m automating the contract lifecycle with AI, from the first draft to the
            signature.
          </Note>{" "}
          Most of what I make ends up in the open on{" "}
          <LinkPreview url={SITE.socials.github} highlight="lilac">
            GitHub
          </LinkPreview>
          <Note>, and most of what I think ends up on </Note>
          <LinkPreview url={SITE.socials.x} highlight="mint">
            X
          </LinkPreview>
          <Note>.</Note>
        </p>
      </div>
    </div>
  );
};
