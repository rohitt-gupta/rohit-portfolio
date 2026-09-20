import React from "react";

import { TechIcon } from "@/components/tech-icon";
import { type Company, EXPERIENCE } from "@/lib/experience";
import { cn } from "@/lib/utils";

/**
 * A tracked label with a hairline running out to the right edge — the device
 * gentlejoseph.com uses to open a sub-block. It separates without a heading
 * weight, which is what you want this far down a nested list.
 */
const RuledLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-secondary text-faint flex items-baseline gap-3 text-[0.625rem] tracking-[0.2em] uppercase">
    <span className="shrink-0">{children}</span>
    <span aria-hidden className="bg-rule h-px flex-1" />
  </p>
);

/** Dot-marked list. One marker style, since there's only one kind of list here. */
const Bullets = ({ items }: { items: string[] }) => (
  <ul className="flex max-w-prose flex-col gap-2">
    {items.map((item) => (
      <li
        key={item}
        className="text-muted-foreground relative pl-4 text-sm leading-relaxed before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-current/40"
      >
        {item}
      </li>
    ))}
  </ul>
);

function CompanyBlock({ company }: { company: Company }) {
  const multiple = company.positions.length > 1;

  /**
   * The line above the name carries everything factual, so the name itself can
   * just be the name. With one position its dates live here; with several, the
   * span lives here and each position keeps its own on the right.
   */
  const meta = [
    company.period ?? company.positions[0].period,
    company.employment,
    company.location && company.mode
      ? `${company.location} (${company.mode})`
      : (company.location ?? company.mode),
  ].filter(Boolean);

  /**
   * With one position and nothing written about it, the whole list is empty
   * markup — and an empty flex child still collects a gap. Skip it, or the four
   * bare entries sit in noticeably more air than the ones carrying content.
   */
  const hasPositionDetail = company.positions.some((p) => p.summary || p.highlights?.length);
  const showPositions = multiple || hasPositionDetail;

  return (
    <li className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <p className="text-faint font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
          {meta.join("  ·  ")}
        </p>
        {/* Brand casing kept as written — "fynk" and "mroads" are lowercase on
            purpose, and the display face carries the hierarchy without shouting. */}
        <h3 className="font-display text-foreground text-xl font-semibold tracking-[-0.025em]">
          {company.company}
        </h3>
        {!multiple ? (
          <p className="text-foreground text-sm font-medium">{company.positions[0].title}</p>
        ) : null}
      </div>

      {company.blurb ? (
        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">{company.blurb}</p>
      ) : null}

      {company.stack?.length ? (
        <ul className="flex flex-wrap gap-2 pt-0.5">
          {company.stack.map((tech) => (
            <li
              key={tech}
              className="border-connection text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs"
            >
              <TechIcon name={tech} />
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Several positions get a rail with a node each, so a promotion inside one
          company reads as one run rather than as separate jobs. */}
      {showPositions ? (
        <ol className={cn("flex flex-col", multiple && "border-rule mt-2 gap-8 border-l pl-6")}>
          {company.positions.map((position) => (
            <li key={position.title} className="relative flex flex-col gap-2">
              {multiple ? (
                <>
                  <span
                    aria-hidden
                    className="border-connection bg-background absolute top-[0.3rem] -left-[29px] size-2.5 rounded-full border"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-foreground text-sm font-medium">{position.title}</h4>
                    <span className="text-faint shrink-0 font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
                      {position.period}
                    </span>
                  </div>
                </>
              ) : null}

              {position.summary ? (
                <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
                  {position.summary}
                </p>
              ) : null}

              {position.highlights?.length ? (
                <div className="mt-2 flex max-w-prose flex-col gap-3">
                  <RuledLabel>Highlights</RuledLabel>
                  <Bullets items={position.highlights} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}
    </li>
  );
}

/** The /work experience list. Structure borrowed from gentlejoseph.com. */
export function ExperienceList() {
  return (
    <ol className="flex flex-col gap-12">
      {EXPERIENCE.map((company) => (
        <CompanyBlock key={company.company} company={company} />
      ))}
    </ol>
  );
}
