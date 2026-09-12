"use client";
import Link from "next/link";

import { formatPostDate } from "@/lib/format-post-date";

import { Subheading } from "../subheading";

export type BlogListPost = {
  slug: string;
  title: string;
  publishedAt: string;
};

export const BlogList = ({ posts }: { posts: BlogListPost[] }) => {
  return (
    <section className="flex flex-col gap-4">
      <Subheading>Writing</Subheading>
      {posts.slice(0, 3).map((post) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="group flex items-center justify-between gap-20 transition-colors duration-200 md:gap-20"
        >
          <span className="text-foreground group-hover:text-primary truncate">{post.title}</span>
          <span className="text-foreground/50 group-hover:text-primary shrink-0 font-mono text-xs font-light">
            {formatPostDate(post.publishedAt)}
          </span>
        </Link>
      ))}
    </section>
  );
};
