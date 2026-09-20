import React from "react";

import { ActionLink } from "@/components/action-link";
import { SectionHeader } from "@/components/typography";
import type { ContributionGraph } from "@/lib/github";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LEVEL_CLASS = ["bg-graph-0", "bg-graph-1", "bg-graph-2", "bg-graph-3", "bg-graph-4"] as const;

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function levelClass(level: number) {
  return LEVEL_CLASS[Math.min(Math.max(level, 0), 4)];
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * A year of commits. At `sm` and up the whole grid fits the content column, so nothing
 * scrolls. Section sizes that column for this section's worst case, a 54-week year.
 *
 * Below `sm` it has to scroll, so the scroller flips to RTL and a phone opens on the
 * most recent weeks rather than on last autumn. That flip is deliberately undone from
 * `sm` up: RTL also right-aligns content that fits, which would strand the grid 33px
 * away from its own weekday labels. The inner wrapper stays LTR either way so the
 * weeks always read oldest-to-newest.
 *
 * The weekday gutter is a fixed 20px rather than shrink-to-fit, so the width the grid
 * has to fit into doesn't shift when the font swaps in.
 */
export function GitGraph({ data }: { data: ContributionGraph }) {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeader
        eyebrow="Receipts"
        title="A year of commits"
        action={
          <ActionLink href={SITE.socials.github} external>
            GitHub
          </ActionLink>
        }
      />

      <div className="flex flex-col gap-3">
        <p className="text-muted-foreground text-sm">
          <span className="text-foreground font-medium">{data.total.toLocaleString("en-GB")}</span>{" "}
          contributions between {formatDate(data.from)} and {formatDate(data.to)}.
        </p>

        <div className="flex gap-2">
          {/* Weekday gutter, outside the scroller so it stays put while the grid moves. */}
          <div
            aria-hidden
            className="text-faint grid w-5 shrink-0 grid-rows-7 gap-[3px] pt-[1.125rem] text-[0.5625rem] leading-none"
          >
            {DAY_LABELS.map((label, i) => (
              <span key={i} className="flex h-[11px] items-center">
                {label}
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1 overflow-x-auto pb-1 [direction:rtl] sm:[direction:ltr]">
            <div className="w-max [direction:ltr]">
              <div
                aria-hidden
                className="text-faint relative mb-1 h-3.5 text-[0.5625rem] leading-none"
              >
                {data.months.map((month) => (
                  <span
                    key={`${month.label}-${month.weekIndex}`}
                    className="absolute top-0"
                    style={{ left: `${month.weekIndex * 14}px` }}
                  >
                    {month.label}
                  </span>
                ))}
              </div>

              <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                {data.weeks.flatMap((week, weekIndex) =>
                  week.map((day, dayIndex) =>
                    day ? (
                      <span
                        key={day.date}
                        title={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatDate(day.date)}`}
                        className={cn("size-[11px] rounded-[2px]", levelClass(day.level))}
                      />
                    ) : (
                      <span key={`pad-${weekIndex}-${dayIndex}`} className="size-[11px]" />
                    ),
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-faint flex items-center justify-end gap-1.5 text-[0.625rem]">
          <span>Less</span>
          {LEVEL_CLASS.map((cls, i) => (
            <span key={i} className={cn("size-[11px] rounded-[2px]", cls)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
