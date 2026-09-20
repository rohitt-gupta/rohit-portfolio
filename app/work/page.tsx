import type { Metadata } from "next";

import { ActionLink } from "@/components/action-link";
import { CurrentProject } from "@/components/current-project";
import { ExperienceList } from "@/components/experience-list";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { Eyebrow, Heading, SectionHeader } from "@/components/typography";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Everything I've built and everywhere I've worked — side projects, client work and the day job.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Section innerClassName="py-12 sm:py-16">
        <div className="flex flex-col gap-4">
          <Eyebrow>Work</Eyebrow>
          <Heading as="h1">Everything I&apos;ve shipped</Heading>
          <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
            Side projects, client builds and the day job. Some of it is polished, some of it was a
            weekend spent answering a question I couldn&apos;t stop thinking about.
          </p>
        </div>
      </Section>

      <Section>
        <CurrentProject />
      </Section>

      <Section>
        <div className="flex flex-col gap-7">
          <SectionHeader eyebrow="Projects" title="Built and shipped" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-7">
          <SectionHeader eyebrow="Experience" title="Where I've worked" />
          <ExperienceList />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-4">
          <Heading>Got something to build?</Heading>
          <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
            I&apos;m open to freelance work and full-time roles. Tell me what you&apos;re making.
          </p>
          <div className="pt-1">
            <ActionLink href="/#contact" variant="outline">
              Get in touch
            </ActionLink>
          </div>
        </div>
      </Section>
    </>
  );
}
