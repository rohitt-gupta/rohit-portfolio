import type { Metadata } from "next";

import { ActionLink } from "@/components/action-link";
import { CurrentProject } from "@/components/current-project";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { Eyebrow, Heading, SectionHeader } from "@/components/typography";
import { EXPERIENCE } from "@/lib/experience";
import { PROJECTS } from "@/lib/projects";
import { cn } from "@/lib/utils";

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
          <ol className="flex flex-col gap-10">
            {EXPERIENCE.map((company) => (
              <li key={company.company} className="flex flex-col gap-3">
                {/* Company header. The meta line is assembled from whatever is set,
                    so a role with no location doesn't leave a stray separator. */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-foreground text-base font-semibold tracking-[-0.02em]">
                    {company.company}
                  </h3>
                  {company.period ? (
                    <span className="text-faint shrink-0 font-mono text-xs">{company.period}</span>
                  ) : null}
                </div>
                <p className="font-secondary text-muted-foreground -mt-1.5 text-[0.8125rem]">
                  {[company.employment, company.location, company.mode].filter(Boolean).join(" · ")}
                </p>

                {company.blurb ? (
                  <p className="text-faint max-w-prose text-sm leading-relaxed">{company.blurb}</p>
                ) : null}

                {/* One position renders flat; several get a rail, so a promotion
                    inside one company reads as one story rather than two jobs. */}
                <ol
                  className={cn(
                    "flex flex-col gap-6",
                    company.positions.length > 1 && "border-rule mt-1 border-l pl-5",
                  )}
                >
                  {company.positions.map((position) => (
                    <li key={position.title} className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="text-foreground text-sm font-medium">{position.title}</h4>
                        <span className="text-faint shrink-0 font-mono text-xs">
                          {position.period}
                        </span>
                      </div>

                      {position.summary ? (
                        <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
                          {position.summary}
                        </p>
                      ) : null}

                      {position.highlights?.length ? (
                        <ul className="mt-1 flex max-w-prose flex-col gap-2">
                          {position.highlights.map((item) => (
                            <li
                              key={item}
                              className="text-muted-foreground relative pl-4 text-sm leading-relaxed before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-current/40"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
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
