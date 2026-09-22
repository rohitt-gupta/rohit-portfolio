import React from "react";

import { AvatarHint } from "@/components/avatar-hint";
import { AvatarToy } from "@/components/avatar-toy";
import { LinkPreview } from "@/components/link-preview";
import { Heading } from "@/components/typography";
import { SITE } from "@/lib/site";

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
            Full-stack developer,{" "}
            {/* A display:none br leaves no break behind, so the line only splits once
                there is room for the split to be deliberate. */}
            <br className="hidden sm:inline" />
            mostly on the web.
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
          I&apos;m Rohit. For the last four years I&apos;ve been building product end to end:{" "}
          <LinkPreview url="https://nextjs.org" highlight="sky">
            React and Next.js
          </LinkPreview>{" "}
          <Note>
            on the front, TypeScript and Node behind it, and lately a lot of React Native.
          </Note>{" "}
          I care more about the thing feeling right than about which framework got it there.
        </p>
        <p>
          Everyone has a superpower. <Note>For some it&apos;s music, for others sport.</Note> For me
          it has always been computers, so most of what I make ends up in the open on{" "}
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
