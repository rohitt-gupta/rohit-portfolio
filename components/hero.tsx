import React from "react";

import { AvatarToy } from "@/components/avatar-toy";
import { LinkPreview } from "@/components/link-preview";
import { Heading } from "@/components/typography";
import { SITE } from "@/lib/site";

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

      <div className="flex max-w-prose flex-col gap-4 text-[0.9375rem] leading-relaxed">
        <p className="text-muted-foreground">
          I&apos;m Rohit. For the last three years I&apos;ve been building product end to end —{" "}
          <LinkPreview url="https://nextjs.org" highlight="sky" className="font-medium">
            React and Next.js
          </LinkPreview>{" "}
          on the front, TypeScript and Node behind it, and lately a lot of React Native. I care more
          about the thing feeling right than about which framework got it there.
        </p>
        <p className="text-muted-foreground">
          Everyone has a superpower. For some it&apos;s music, for others sport. For me it has
          always been computers — so most of what I make ends up in the open on{" "}
          <LinkPreview url={SITE.socials.github} highlight="lilac" className="font-medium">
            GitHub
          </LinkPreview>
          , and most of what I think ends up on{" "}
          <LinkPreview url={SITE.socials.x} highlight="mint" className="font-medium">
            X
          </LinkPreview>
          .
        </p>
      </div>
    </div>
  );
};
