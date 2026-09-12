import type { Metadata } from "next";

import { BlogList } from "@/components/blog/blog-list";
import Container from "@/components/container";
import { Experience } from "@/components/experience";
import { GetInTouch } from "@/components/get-in-touch";
import { Header } from "@/components/header";
import { DottedSeparator } from "@/components/separator";
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
    <Container>
      <Header />
      <DottedSeparator className="my-10" />
      <Work />
      <DottedSeparator className="my-10" />
      <Stack />
      <DottedSeparator className="my-10" />
      <Experience />
      <DottedSeparator className="my-10" />
      <GetInTouch />
      {posts.length > 0 ? (
        <>
          <DottedSeparator className="my-10" />
          <BlogList posts={posts} />
        </>
      ) : null}
      <DottedSeparator className="my-10" />
    </Container>
  );
}
