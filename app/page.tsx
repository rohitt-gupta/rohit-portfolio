import type { Metadata } from "next";

import { Cta } from "@/components/cta";
import { CurrentProject } from "@/components/current-project";
import { GitGraph } from "@/components/git-graph";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SelectedWork } from "@/components/selected-work";
import { StackSection } from "@/components/stack-section";
import { EXPERIENCE } from "@/lib/experience";
import { getContributions } from "@/lib/github";
import { SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute`, because the layout's `%s – Rohit Gupta` template applies to every
  // child segment including this one — a plain string here came out as
  // "Rohit Gupta – Rohit Gupta" in the tab.
  title: { absolute: SITE.title },
  description: SITE.description,
  alternates: { canonical: "/" },
};

/**
 * The hero again, as schema.org data: what Google reads for the panel beside a
 * search for the name. The current employer is whoever leads `EXPERIENCE`.
 */
const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE_URL,
  image: `${SITE_URL}${SITE.avatar}`,
  jobTitle: SITE.role,
  description: SITE.description,
  homeLocation: { "@type": "Place", name: SITE.location },
  worksFor: { "@type": "Organization", name: EXPERIENCE[0].company, url: EXPERIENCE[0].url },
  sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.x],
};

export default async function Home() {
  // Null when GitHub's mirror is down or rate-limited, so the band just doesn't render.
  const contributions = await getContributions(SITE.github);

  return (
    <>
      <script
        type="application/ld+json"
        // Escaped so nothing in the data can close the tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON).replace(/</g, "\\u003c") }}
      />

      {/* Less air above than the other pages get. They open on an eyebrow and a
          heading; this one opens on the hint, which is small, pale and rotated,
          so the same padding reads as an empty band rather than as breathing
          room. The floor is unchanged. */}
      <Section innerClassName="pt-8 pb-12 sm:pt-10 sm:pb-16">
        <Hero />
      </Section>

      {/* The band carries its own padding so the screenshot panel can bleed to the rails. */}
      <Section innerClassName="p-0 sm:p-0">
        <CurrentProject />
      </Section>

      <Section>
        <SelectedWork />
      </Section>

      <Section>
        <StackSection />
      </Section>

      {contributions ? (
        <Section>
          <GitGraph data={contributions} />
        </Section>
      ) : null}

      <Section id="contact">
        <Cta />
      </Section>
    </>
  );
}
