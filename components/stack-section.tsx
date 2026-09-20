import React from "react";

import { BrandIcon } from "@/components/brand-icon";
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
                  className="border-connection text-foreground group inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[0.8125rem]"
                >
                  {/* Two copies of the mark rolling through a clipped window: the one
                      on show leaves upward as its twin arrives from below, and the
                      pair reverses on the way out. Outgoing is the quicker of the
                      two so the window is never empty mid-roll.

                      ease-in-out rather than the page's shared --ease-out-strong:
                      that curve spends four fifths of its travel in the first
                      fifth of the time, which is right for a colour or a nudge but
                      turns fourteen pixels of travel into a snap. This one wants
                      to be seen moving. */}
                  <span aria-hidden className="relative block size-3.5 shrink-0 overflow-hidden">
                    <BrandIcon
                      name={item}
                      uid="-out"
                      className="absolute inset-0 transition duration-[250ms] ease-in-out group-hover:-translate-y-full group-hover:opacity-0"
                    />
                    <BrandIcon
                      name={item}
                      uid="-in"
                      className="absolute inset-0 translate-y-full opacity-0 transition duration-[350ms] ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </span>
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
