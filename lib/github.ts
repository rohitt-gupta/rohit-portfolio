/**
 * Contribution data for the git graph.
 *
 * GitHub's own contribution counts are only exposed through the authenticated GraphQL
 * API, so we go through jogruber's public mirror instead — no token, no secret to leak
 * into a client bundle. Every failure path returns null and the section simply doesn't
 * render; a portfolio should never 500 because someone else's API had a bad minute.
 */

export type ContributionDay = {
  date: string;
  count: number;
  /** 0–4, as GitHub buckets them. */
  level: number;
};

export type ContributionGraph = {
  total: number;
  /** Columns of 7, Sunday first. `null` pads the partial weeks at either end. */
  weeks: (ContributionDay | null)[][];
  /** Month labels with the column they should sit above. */
  months: { label: string; weekIndex: number }[];
  from: string;
  to: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Parsed as UTC so a late-evening local timezone can't shunt a day into the wrong column. */
function utcDay(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

export async function getContributions(username: string): Promise<ContributionGraph | null> {
  let days: ContributionDay[] = [];
  let total = 0;

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { next: { revalidate: 60 * 60 * 6 } },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: ContributionDay[];
    };

    days = json.contributions ?? [];
    total =
      json.total?.lastYear ??
      Object.values(json.total ?? {}).find((v) => typeof v === "number") ??
      0;
  } catch {
    return null;
  }

  if (!days.length) return null;

  // Pad to whole weeks so every column has 7 cells and the rows line up as weekdays.
  const cells: (ContributionDay | null)[] = [];
  for (let i = 0; i < utcDay(days[0].date).getUTCDay(); i++) cells.push(null);
  cells.push(...days);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // One label per month, skipped when the month owns too few columns to fit the word.
  const months: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const first = week.find(Boolean);
    if (!first) return;
    const month = utcDay(first.date).getUTCMonth();
    if (month === lastMonth) return;
    lastMonth = month;
    const previous = months[months.length - 1];
    if (previous && weekIndex - previous.weekIndex < 3) return;
    months.push({ label: MONTHS[month], weekIndex });
  });

  return {
    total,
    weeks,
    months,
    from: days[0].date,
    to: days[days.length - 1].date,
  };
}
