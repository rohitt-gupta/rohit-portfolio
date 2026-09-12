"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { BlogArticleShell } from "@/components/blog/blog-article-shell";
import MDXComponents from "@/components/mdx-components";

type BlogPostRendererProps = {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    publishedAt: string;
    summary?: string;
    readingTime?: { text: string };
  };
};

export default function BlogPostRenderer({ mdxSource, frontMatter }: BlogPostRendererProps) {
  return (
    <BlogArticleShell frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </BlogArticleShell>
  );
}
