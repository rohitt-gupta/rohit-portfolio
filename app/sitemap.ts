import type { MetadataRoute } from "next";

import { getAllFilesFrontMatter } from "@/lib/mdx";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllFilesFrontMatter("blog");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/work` },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/inspiration` },
    { url: `${SITE_URL}/links` },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.publishedAt ? { lastModified: post.publishedAt } : {}),
  }));

  return [...staticRoutes, ...blogRoutes];
}
