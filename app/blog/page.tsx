import type { Metadata } from "next";

import { BlogIndex, type BlogIndexPost } from "@/components/blog/blog-index";
import { Section } from "@/components/section";
import { Subheading } from "@/components/subheading";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog - ${SITE.name}`,
  description: "Notes on building for the web, the things I learn and the things I break.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllFilesFrontMatter<BlogIndexPost>("blog");

  return (
    <Section innerClassName="min-h-screen">
      <Subheading>My thoughts on things</Subheading>
      <p className="text-foreground pt-4 text-base">
        I write here every now and then — mostly about things I ran into while building, and
        whatever I want to keep in my own corner of the internet.
      </p>

      <BlogIndex posts={posts} />
    </Section>
  );
}
