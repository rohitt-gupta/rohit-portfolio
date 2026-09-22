import React from "react";

import { AvatarHint } from "@/components/avatar-hint";
import { AvatarToy } from "@/components/avatar-toy";
import { LinkPreview } from "@/components/link-preview";
import { MarkLink } from "@/components/mark-link";
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
            {/* Broken by hand at every width, not just from `sm`. Left to wrap on its
                own a phone puts the break inside the second clause and strands the comma
                mid-line — "Product / engineer, from / idea to shipped." Forcing it here
                costs a third line at 320px, where the second clause is 322px against 280
                of column, and buys a clean two lines everywhere from 375 up. */}
            <br />
            from idea to shipped.
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
          <MarkLink href={TECH_LINKS.React} mark="React">
            React
          </MarkLink>{" "}
          and{" "}
          <MarkLink href={TECH_LINKS["Next.js"]} mark="Next.js">
            Next.js
          </MarkLink>{" "}
          <Note>on the front, TypeScript and Node behind it, and lately a lot of</Note>{" "}
          <MarkLink href={TECH_LINKS.Expo} mark="Expo">
            Expo
          </MarkLink>
          <Note>. That list changes every few years.</Note>
        </p>
        <p>
          Right now I&apos;m at{" "}
          <MarkLink href="https://fynk.com" logo="/logos/fynk.jpg">
            fynk
          </MarkLink>
          <Note>
            , where I&apos;m automating the contract lifecycle with AI, from the first draft to the
            signature.
          </Note>{" "}
          Most of what I make ends up in the open on{" "}
          {/* Both of these ship their screenshot rather than taking Microlink's. Logged
              out, x.com serves a wall and github.com a stranger's view of the profile,
              so the live shot is the wrong picture in both cases.

              Each carries its own ratio, because the 200x125 default would squash them,
              and each file is 440px wide — twice what the card draws — rather than the
              2000px original, which is 11KB and 17KB instead of 138KB and 144KB. */}
          <LinkPreview
            url={SITE.socials.github}
            highlight="lilac"
            isStatic
            imageSrc="/previews/github.webp"
            width={220}
            height={126}
          >
            GitHub
          </LinkPreview>
          <Note>, and most of what I think ends up on </Note>
          <LinkPreview
            url={SITE.socials.x}
            highlight="mint"
            isStatic
            imageSrc="/previews/x.webp"
            width={220}
            height={167}
          >
            X
          </LinkPreview>
          <Note>.</Note>
        </p>
      </div>
    </div>
  );
};
