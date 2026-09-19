import type { Metadata } from "next";

import { BlogList } from "@/components/blog/blog-list";
import { Experience } from "@/components/experience";
import { GetInTouch } from "@/components/get-in-touch";
import { Header } from "@/components/header";
import { Section } from "@/components/section";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const posts = (await getAllFilesFrontMatter("blog")).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <>
      <Section>
        <Header />
      </Section>
      <Section>
        <Work />
      </Section>
      <Section>
        <Stack />
      </Section>
      <Section>
        <Experience />
      </Section>
      <Section>
        <GetInTouch />
      </Section>
      {posts.length > 0 ? (
        <Section>
          <BlogList posts={posts} />
        </Section>
      ) : null}
    </>
  );
}
