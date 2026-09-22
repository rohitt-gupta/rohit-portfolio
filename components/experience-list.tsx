import React from "react";

import { ExperienceRow } from "@/components/experience-row";
import { TechChip } from "@/components/tech-chip";
import { type Company, EXPERIENCE } from "@/lib/experience";
import { cn } from "@/lib/utils";

/** Dot-marked list. One marker style, since there's only one kind of list here. */
const Bullets = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-2.5">
    {items.map((item) => (
      <li
        key={item}
        className="text-muted-foreground relative pl-4 text-[0.9375rem] leading-relaxed before:absolute before:top-[0.62em] before:left-0 before:size-1 before:rounded-full before:bg-current/40"
      >
        {item}
      </li>
    ))}
  </ul>
);

/**
 * A tracked label with a hairline running out to the right edge. The device
 * gentlejoseph.com uses to open a sub-block. It separates without a heading
 * weight, which is what you want this far down a nested list.
 */
const RuledLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-secondary text-faint flex items-center gap-3 text-[0.625rem] tracking-[0.2em] uppercase">
    <span className="shrink-0">{children}</span>
    <span aria-hidden className="bg-rule h-px flex-1" />
  </p>
);

/** The stack, at the foot of the opened card. */
const StackChips = ({ company }: { company: Company }) => {
  const uid = company.company.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <ul className="flex flex-wrap gap-2">
      {company.stack?.map((tech) => (
        <li key={tech}>
          <TechChip
            name={tech}
            uid={`${uid}-${tech.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="text-muted-foreground text-xs"
          />
        </li>
      ))}
    </ul>
  );
};

/**
 * The inside of one card, rendered on the server and handed to the client row as
 * children. That is what keeps TechChip, and the brand marks it pulls in, out of
 * the client bundle: the row only reveals HTML that was already drawn.
 *
 * Copy runs the full width of the card rather than sitting at a reading measure
 * of its own. The card is the measure now.
 */
function CompanyBody({ company }: { company: Company }) {
  const multiple = company.positions.length > 1;

  return (
    <div className="flex flex-col gap-5">
      {company.blurb ? (
        <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">{company.blurb}</p>
      ) : null}

      {/* Several positions get a rail with a node each, so a promotion inside one
          company reads as one run rather than as separate jobs. */}
      <ol className={cn("flex flex-col", multiple && "border-rule gap-7 border-l pl-6")}>
        {company.positions.map((position) => (
          <li key={position.title} className="relative flex flex-col gap-3">
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
              <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">
                {position.summary}
              </p>
            ) : null}

            {position.highlights?.length ? (
              <div className="mt-1 flex flex-col gap-3">
                <RuledLabel>Highlights</RuledLabel>
                <Bullets items={position.highlights} />
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      {/* Last, not first. Inside a card the chips are a footnote on the work,
          and leading with them buries the sentence saying what the work was. */}
      {company.stack?.length ? <StackChips company={company} /> : null}
    </div>
  );
}

/**
 * One panel, a row per company, each opening onto its own detail. Modelled on
 * swamii.me, which is where the shape comes from: a tile, the name, a pill for
 * the arrangement, the dates underneath, a chevron at the far end.
 *
 * Collapsed by default except the current role. The write-ups run long, and
 * someone scanning for where you have worked should not have to scroll past
 * forty bullets to find out.
 */
export function ExperienceList() {
  return (
    <ol className="border-connection divide-connection bg-card/50 divide-y overflow-hidden rounded-2xl border">
      {EXPERIENCE.map((company, index) => (
        <li key={company.company}>
          <ExperienceRow
            name={company.company}
            mark={company.mark}
            logo={company.logo}
            tone={company.tone}
            badge={company.employment}
            role={company.positions.length === 1 ? company.positions[0].title : undefined}
            meta={[
              company.period ?? company.positions[0].period,
              company.location && company.mode
                ? `${company.location} (${company.mode})`
                : (company.location ?? company.mode),
            ]
              .filter(Boolean)
              .join("  ·  ")}
            href={company.url}
            defaultOpen={index === 0}
          >
            <CompanyBody company={company} />
          </ExperienceRow>
        </li>
      ))}
    </ol>
  );
}
