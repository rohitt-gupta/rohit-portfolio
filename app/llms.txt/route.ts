import { EXPERIENCE } from "@/lib/experience";
import { ELSEWHERE, SITE_PAGES } from "@/lib/links";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { CURRENT_PROJECT, PROJECTS } from "@/lib/projects";
import { SITE, SITE_URL } from "@/lib/site";

/**
 * /llms.txt, in the shape llmstxt.org proposes: the site as markdown, for a language
 * model that wants the facts without the page around them. Built from the same data
 * the pages render, so it cannot drift from them, and once at build time.
 */
export const dynamic = "force-static";

/** One markdown list item, linked when there is somewhere to link to. */
const item = (label: string, href?: string, note?: string) => {
  const url = href?.startsWith("/") ? `${SITE_URL}${href}` : href;
  return `- ${url ? `[${label}](${url})` : label}${note ? `: ${note}` : ""}`;
};

export async function GET() {
  const posts = (await getAllFilesFrontMatter("blog")).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.role} based in ${SITE.location}.`,
    "",
    "## Pages",
    "",
    ...SITE_PAGES.map((page) => item(page.label, page.href, page.description)),
    "",
    "## Experience",
    "",
    ...EXPERIENCE.map((company) => {
      const roles = company.positions.map((p) => `${p.title}, ${p.period}`).join("; ");
      // "Vienna, Austria (Hybrid)", the way the work page sets it.
      const place =
        company.location && company.mode
          ? `${company.location} (${company.mode})`
          : (company.location ?? company.mode);
      const terms = [company.employment, place].filter(Boolean).join(", ");
      const note = [roles, terms, company.blurb?.replace(/\.$/, "")].filter(Boolean).join(". ");
      return item(company.company, company.url, `${note}.`);
    }),
    "",
    "## Projects",
    "",
    item(CURRENT_PROJECT.title, CURRENT_PROJECT.href, `Building now, ${CURRENT_PROJECT.tagline}`),
    ...PROJECTS.map((project) => item(project.title, project.href, project.tagline)),
    "",
    "## Writing",
    "",
    ...posts.map((post) => item(post.title, `/blog/${post.slug}`, post.summary)),
    "",
    "## Contact",
    "",
    `- Email: ${SITE.email}`,
    item("Book a call", SITE.socials.cal),
    item("GitHub", SITE.socials.github),
    item("LinkedIn", SITE.socials.linkedin),
    item("X", SITE.socials.x),
    ...ELSEWHERE.map((link) => item(link.label, link.href, link.description)),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
