import React from "react";

import { ActionLink } from "@/components/action-link";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/typography";
import { FEATURED_PROJECTS } from "@/lib/projects";

/** Four tiles, two rows at desktop, one column on a phone. Everything else lives on /work. */
export const SelectedWork = () => {
  return (
    <div className="flex flex-col gap-7">
      <SectionHeader
        eyebrow="Selected work"
        title="Things I've built"
        action={<ActionLink href="/work">View all projects</ActionLink>}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
};
