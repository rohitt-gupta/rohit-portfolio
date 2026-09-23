import type { Metadata } from "next";

import { getFileBySlug, getFiles } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

import BlogPostClient from "./BlogPostClient";

type PostFrontMatter = {
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
  readingTime?: { text: string };
};

export async function generateStaticParams() {
  const posts = await getFiles("blog");
  return posts.map((p: string) => ({
    slug: p.replace(/\.mdx/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getFileBySlug("blog", slug);
  const { title, summary, image } = post.frontMatter as unknown as PostFrontMatter;

  // A post with its own image uses it. The rest fall back to the site card, by URL,
  // because setting `openGraph` here replaces the one the layout would have passed down.
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/opengraph-image`;

  return {
    title,
    description: summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description: summary,
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      images: [ogImage],
    },
  };
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getFileBySlug("blog", slug);
  return (
    <BlogPostClient
      mdxSource={post.mdxSource}
      frontMatter={post.frontMatter as unknown as PostFrontMatter}
    />
  );
}
