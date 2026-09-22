import React from "react";

import { ActionLink } from "@/components/action-link";
import { CopyEmail } from "@/components/copy-email";
import { SectionHeader } from "@/components/typography";
import { SITE } from "@/lib/site";

/**
 * The last thing on the page, and the only one asking for something.
 *
 * TODO: the booking overlay now exists in `components/book-a-call.tsx`, as the sticky
 * pill in the corner. Lifting its trigger out of that file would let this section carry
 * a "Book a call" primary button above the email too — worth doing only if the pill
 * turns out not to be enough on its own.
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
