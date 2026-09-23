"use client";

import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";

import { BlogPostLink } from "./blog-post-link";

export type BlogIndexPost = {
  slug: string;
  title: string;
  publishedAt: string;
  summary?: string;
};

export function BlogIndex({ posts }: { posts: BlogIndexPost[] }) {
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
    [posts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (p) => p.title.toLowerCase().includes(q) || (p.summary ?? "").toLowerCase().includes(q),
    );
  }, [sorted, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <label htmlFor="blog-search" className="sr-only">
          Search posts
        </label>
        <IconSearch
          className="text-faint pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          stroke={1.6}
          aria-hidden
        />
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts…"
          autoComplete="off"
          className="border-connection bg-card text-foreground placeholder:text-faint focus:border-accent w-full rounded-md border py-2.5 pr-3 pl-9 text-sm transition-colors focus:outline-none"
        />
      </div>

      {!filtered.length ? (
        <p className="text-muted-foreground text-sm">Nothing matches that. Try fewer words.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((post) => (
            <li key={post.slug}>
              <BlogPostLink {...post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
