import React from "react";

import { SITE } from "@/lib/site";

import { LinkPreview } from "./link-preview";

export const Header = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-foreground text-base">
        I&apos;m a full-stack developer with three years of experience, working mostly with{" "}
        <LinkPreview url="https://nextjs.org">React and Next.js</LinkPreview> on the front-end and
        Node.js with TypeScript behind it. I&apos;m mostly active on{" "}
        <LinkPreview url={SITE.socials.x}>X / Twitter</LinkPreview>, where I share what I&apos;m
        building.
      </div>
      <div className="text-foreground text-base">
        Everyone has their superpower. For some it&apos;s music, for others it&apos;s sport. For me
        it has always been computers. I love building things, learning new things and meeting new
        people &mdash; I just love tech in general.
      </div>
      <div className="text-foreground text-base">
        Most of what I build ends up on <LinkPreview url={SITE.socials.github}>GitHub</LinkPreview>{" "}
        &mdash; everything from a video captioning tool to a multi-store ecommerce platform. If you
        have something cool to build, feel free to reach out.
      </div>
    </div>
  );
};
