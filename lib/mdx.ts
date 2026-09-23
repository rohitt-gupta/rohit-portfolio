import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";

const root = process.cwd();

export type FrontMatter = {
  slug: string;
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
};

export type PostFrontMatter = FrontMatter & {
  wordCount: number;
  readingTime: ReturnType<typeof readingTime>;
};

/** Filenames (with extension) inside `data/<type>`. */
export async function getFiles(type: string): Promise<string[]> {
  return fs.readdirSync(path.join(root, "data", type));
}

export async function getFileBySlug(type: string, slug: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, "data", type, `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${type}.mdx`), "utf8");

  const { data, content } = matter(source);
  const normalizedContent = content
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/HighlightBox>\s+([^\n])/g, "</HighlightBox>\n\n$1");

  let mdxSource;
  try {
    mdxSource = await serialize(normalizedContent);
  } catch {
    mdxSource = await serialize("This article has MDX syntax that needs migration.");
  }

  return {
    mdxSource,
    frontMatter: {
      wordCount: normalizedContent.split(/\s+/gu).length,
      readingTime: readingTime(normalizedContent),
      slug,
      ...data,
    } as PostFrontMatter,
  };
}

/** Front matter for every post in `data/<type>`, newest file order preserved by caller. */
export async function getAllFilesFrontMatter<T extends FrontMatter = FrontMatter>(
  type: string,
): Promise<T[]> {
  const files = fs.readdirSync(path.join(root, "data", type));

  return files.reduce<T[]>((allPosts, postSlug) => {
    const source = fs.readFileSync(path.join(root, "data", type, postSlug), "utf8");
    const { data } = matter(source);

    return [{ ...data, slug: postSlug.replace(".mdx", "") } as T, ...allPosts];
  }, []);
}
