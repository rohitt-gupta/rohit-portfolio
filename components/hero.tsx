import React from "react";

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
      <div className="flex items-start gap-5 sm:gap-6">
        <AvatarToy className="shrink-0" />
        <div className="flex flex-col gap-2 pt-1">
          <Heading as="h1">
            Full-stack developer,
            <br />
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
          I&apos;m Rohit. For the last four years I&apos;ve been building product end to end —{" "}
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
          it has always been computers — so most of what I make ends up in the open on{" "}
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
