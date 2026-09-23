import Link from "next/link";

import { formatPostDate } from "@/lib/format-post-date";
import { cn } from "@/lib/utils";

export type BlogPostLinkProps = {
  title: string;
  slug: string;
  publishedAt: string;
  summary?: string;
  className?: string;
};

/**
 * TODO: the view count and popcorn tally go on the right of the date once there's a
 * store behind them.
 */
export function BlogPostLink({ title, slug, publishedAt, summary, className }: BlogPostLinkProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group border-connection hover:border-accent/50 hover:bg-card flex flex-col gap-1.5 rounded-lg border p-4 transition-colors",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-foreground group-hover:text-accent text-[0.9375rem] font-semibold tracking-[-0.02em] transition-colors">
          {title}
        </span>
        <span className="text-faint shrink-0 font-mono text-xs">{formatPostDate(publishedAt)}</span>
      </div>
      {summary ? (
        <span className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {summary}
        </span>
      ) : null}
    </Link>
  );
}
