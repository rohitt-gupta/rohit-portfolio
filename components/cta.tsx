import React from "react";

import { ActionLink } from "@/components/action-link";
import { CopyEmail } from "@/components/copy-email";
import { SectionHeader } from "@/components/typography";
import { SITE } from "@/lib/site";

/**
 * The last thing on the page, and the only one asking for something.
 *
 * TODO: add `cal` to SITE.socials and put a "Book a call" primary button above the
 * email. That becomes the better first action once the link exists.
 */
export const Cta = () => {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeader eyebrow="Say hello" title="Let's build something" />

      <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
        I&apos;m always up for a good problem: freelance, full-time, or just someone wanting to talk
        through an idea. The fastest way to reach me is email, and I read all of it.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <CopyEmail />
        <ActionLink href={SITE.resume} variant="outline" external>
          Résumé
        </ActionLink>
      </div>
    </div>
  );
};
