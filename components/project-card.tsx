import React from "react";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Typographic tile — title, one line, stack, year. No screenshots on purpose: they
 * look great for a month and dated forever after.
 */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group border-connection hover:border-accent/50 hover:bg-card flex flex-col gap-3 rounded-lg border p-5 transition-colors",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-foreground group-hover:text-accent text-base font-semibold tracking-[-0.02em] transition-colors">
          {project.title}
        </h3>
        <span className="text-faint shrink-0 font-mono text-xs">{project.year}</span>
      </div>

      <p className="text-muted-foreground flex-1 text-sm leading-relaxed">{project.tagline}</p>

      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {project.stack.map((tech) => (
          <span key={tech} className="font-secondary text-faint text-[0.6875rem] tracking-wide">
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}
