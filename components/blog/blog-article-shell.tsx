import { format, parseISO } from "date-fns";
import Link from "next/link";

import { Section } from "@/components/section";
import { Eyebrow, Heading } from "@/components/typography";
import { SITE } from "@/lib/site";

export type BlogArticleFrontMatter = {
  title: string;
  publishedAt: string;
  summary?: string;
  readingTime?: { text: string };
};

/**
 * TODO: unique view count and the likes/popcorn button belong in the meta row below
 * the title; both need a persistence layer first.
 */
export function BlogArticleShell({
  frontMatter,
  children,
}: {
  frontMatter: BlogArticleFrontMatter;
  children: React.ReactNode;
}) {
  const dateLabel = format(parseISO(frontMatter.publishedAt), "d MMMM yyyy");

  return (
    <article>
      <Section innerClassName="py-12 sm:py-14">
        <div className="flex flex-col gap-4">
          <Eyebrow>
            <Link href="/blog" className="hover:text-accent transition-colors">
              ← Blog
            </Link>
          </Eyebrow>

          <Heading as="h1">{frontMatter.title}</Heading>

          {frontMatter.summary ? (
            <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
              {frontMatter.summary}
            </p>
          ) : null}

          <div className="text-faint flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1 font-mono text-xs">
            <span>{SITE.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={frontMatter.publishedAt}>{dateLabel}</time>
            {frontMatter.readingTime?.text ? (
              <>
                <span aria-hidden>·</span>
                <span>{frontMatter.readingTime.text}</span>
              </>
            ) : null}
          </div>
        </div>
      </Section>

      <Section innerClassName="py-12 sm:py-14">
        <div className="prose prose-neutral dark:prose-invert prose-headings:font-display prose-headings:tracking-[-0.02em] prose-headings:scroll-mt-24 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-code:font-mono prose-code:text-[0.85em] prose-pre:border prose-pre:border-connection max-w-[68ch] text-[0.9375rem]">
          {children}
        </div>
      </Section>
    </article>
  );
}
