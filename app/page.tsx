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
  // Null when GitHub's mirror is down or rate-limited, so the band just doesn't render.
  const contributions = await getContributions(SITE.github);

  return (
    <>
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
