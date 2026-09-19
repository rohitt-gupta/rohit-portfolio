import type { Metadata } from "next";

import { BlogIndex, type BlogIndexPost } from "@/components/blog/blog-index";
import { Section } from "@/components/section";
import { Eyebrow, Heading } from "@/components/typography";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building for the web — the things I learn and the things I break.",
  alternates: { canonical: "/blog" },
};

/**
 * TODO: newsletter signup goes at the bottom of this page, once there's somewhere for
 * the addresses to land.
 */
export default async function BlogPage() {
  const posts = await getAllFilesFrontMatter<BlogIndexPost>("blog");

  return (
    <>
      <Section innerClassName="py-12 sm:py-16">
        <div className="flex flex-col gap-4">
          <Eyebrow>Writing</Eyebrow>
          <Heading as="h1">Notes, mostly to myself</Heading>
          <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
            I write here every now and then — usually about something I ran into while building, and
            whatever else I want to keep in my own corner of the internet.
          </p>
        </div>
      </Section>

      <Section innerClassName="min-h-[50vh]">
        <BlogIndex posts={posts} />
      </Section>
    </>
  );
}
