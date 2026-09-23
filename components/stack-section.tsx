"use client";

import React from "react";

import { TechChip } from "@/components/tech-chip";
import { SectionHeader } from "@/components/typography";
import { hoverSfx, sfx } from "@/lib/sfx";
import { STACK } from "@/lib/stack";

/** Each mark's internal ids need a namespace of their own on the page. */
const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * One wrapped run of marks. The order in `lib/stack.ts` carries the grouping that
 * the row labels used to spell out.
 *
 * The hover sound is the ladder rather than the usual tick: this is the one place
 * on the page with a long row of identical small targets, which is exactly where a
 * single repeated tick turns into a rattle and a climbing scale turns into a toy.
 * It sits on the `li` so the chip itself stays shared with the experience list,
 * where a pointer passing one mark should not start a scale.
 *
 * TODO: once /toolbox exists, add an ActionLink action here pointing at it.
 */
export const StackSection = () => {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeader eyebrow="Toolkit" title="What I build with" />

      <ul className="flex flex-wrap gap-2">
        {STACK.map((item) => (
          <li key={item} {...hoverSfx(sfx.rung)}>
            <TechChip name={item} uid={slug(item)} className="text-foreground text-[0.8125rem]" />
          </li>
        ))}
      </ul>
    </div>
  );
};
