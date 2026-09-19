import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

import { ActionLink } from "@/components/action-link";
import { AvatarToy } from "@/components/avatar-toy";
import { BlogPostLink, type BlogPostLinkProps } from "@/components/blog/blog-post-link";
import { CopyEmail } from "@/components/copy-email";
import { Section } from "@/components/section";
import { SOCIAL_LINKS } from "@/components/social-links";
import { Eyebrow, Heading, SectionHeader } from "@/components/typography";
import { ELSEWHERE, type LinkItem, SITE_PAGES } from "@/lib/links";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Links",
  description: `Every way to find ${SITE.firstName} — socials, writing and the rest of the site, on one page.`,
  alternates: { canonical: "/links" },
};

/**
 * A row in one of the lists below. The arrow only appears on hover, so a column of
 * these reads as text at rest and as buttons the moment you go near one.
 */
function LinkRow({ label, description, href, meta, external }: LinkItem) {
  const inner = (
    <>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="font-display text-foreground group-hover:text-accent text-[0.9375rem] font-semibold tracking-[-0.02em] transition-colors">
          {label}
        </span>
        <span className="text-muted-foreground text-sm leading-relaxed">{description}</span>
      </span>

      <span className="flex shrink-0 items-center gap-2">
        {meta ? <span className="text-faint font-mono text-xs">{meta}</span> : null}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="text-faint group-hover:text-accent size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <path d={external ? "M5 11 11 5M6 5h5v5" : "M3 8h10M9 4l4 4-4 4"} />
        </svg>
      </span>
    </>
  );

  const className =
    "group border-connection hover:border-accent/50 hover:bg-card flex items-center justify-between gap-4 rounded-lg border p-4 transition-colors";

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export default async function LinksPage() {
  const posts = (await getAllFilesFrontMatter<BlogPostLinkProps>("blog"))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <>
      {/* The only centred band on the site — this page gets pasted into a bio, so it
          should read as a card rather than as another left-aligned article. */}
      <Section innerClassName="py-12 sm:py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <AvatarToy />

          <div className="flex flex-col items-center gap-3">
            <Heading as="h1">Hey, I&apos;m {SITE.firstName}</Heading>
            <p className="font-secondary text-muted-foreground text-[0.8125rem] tracking-wide">
              {SITE.role} · {SITE.location}
            </p>
            <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed text-balance">
              I build product end to end — TypeScript, React, Next.js and React Native. This page is
              every way to find me, in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <ActionLink href="/" variant="solid">
              View the full site
            </ActionLink>
            <CopyEmail />
          </div>
        </div>
      </Section>

      {/* Glyphs only — no heading, no wordmarks, no handles. Flexed rather than gridded
          so the row stays full-width whatever SITE.socials ends up holding. */}
      <Section>
        <ul className="flex gap-3">
          {SOCIAL_LINKS.map(({ key, label, Icon, href }) => (
            <li key={key} className="flex-1">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-connection hover:border-accent/50 hover:bg-card flex items-center justify-center rounded-lg border py-6 transition-colors"
              >
                <Icon
                  className="text-foreground group-hover:text-accent size-6 transition-colors"
                  stroke={1.5}
                  aria-hidden
                />
                <span className="sr-only">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {posts.length ? (
        <Section>
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Writing"
              title="Latest posts"
              action={<ActionLink href="/blog">All posts</ActionLink>}
            />
            <ul className="flex flex-col gap-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <BlogPostLink {...post} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="flex flex-col gap-6">
          <Eyebrow>Around the site</Eyebrow>
          <ul className="flex flex-col gap-3">
            {SITE_PAGES.map((item) => (
              <li key={item.href}>
                <LinkRow {...item} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-6">
          <Eyebrow>Elsewhere</Eyebrow>
          <ul className="flex flex-col gap-3">
            {ELSEWHERE.map((item) => (
              <li key={item.href}>
                <LinkRow {...item} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
