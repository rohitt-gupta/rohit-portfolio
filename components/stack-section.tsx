import React from "react";

import { SectionHeader } from "@/components/typography";
import { STACK } from "@/lib/stack";

/**
 * Grouped rather than a wall of logos — what I reach for, sorted by the layer of the
 * problem it solves.
 *
 * TODO: once /toolbox exists, add an ActionLink action here pointing at it.
 */
export const StackSection = () => {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeader eyebrow="Toolkit" title="What I build with" />

      <dl className="flex flex-col gap-5">
        {STACK.map((group) => (
          <div
            key={group.label}
            className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:items-baseline sm:gap-4"
          >
            <dt className="font-secondary text-faint text-[0.6875rem] tracking-[0.16em] uppercase">
              {group.label}
            </dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="border-connection text-foreground rounded-md border px-2.5 py-1 text-[0.8125rem]"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
