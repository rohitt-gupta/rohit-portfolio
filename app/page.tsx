import type { Metadata } from "next";

import { Cta } from "@/components/cta";
import { CurrentProject } from "@/components/current-project";
import { GitGraph } from "@/components/git-graph";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SelectedWork } from "@/components/selected-work";
import { StackSection } from "@/components/stack-section";
import { getContributions } from "@/lib/github";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Null when GitHub's mirror is down or rate-limited — the band just doesn't render.
  const contributions = await getContributions(SITE.github);

  return (
    <>
      <Section innerClassName="py-12 sm:py-16">
        <Hero />
      </Section>

      <Section>
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
