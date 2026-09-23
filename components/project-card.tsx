"use client";

import Image from "next/image";
import React from "react";

import { BrandIcon } from "@/components/brand-icon";
import type { Project } from "@/lib/projects";
import { hoverSfx, sfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

/** The corner glints that make the tile read as glass rather than a flat panel. */
const Sheen = () => (
  <span aria-hidden className="pointer-events-none absolute inset-0 z-10">
    <span className="absolute top-1 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent blur-[0.5px]" />
    <span className="absolute right-0 bottom-1 left-[30%] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[0.5px]" />
    <span className="absolute top-1 left-1 size-8 rounded-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_70%)] blur-[2px]" />
    <span className="absolute top-1 right-1 size-8 rounded-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6),transparent_70%)] blur-[2px]" />
  </span>
);

const Arrow = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

/** "scranton.ai" from "https://www.scranton.ai", for the cover's address bar. */
const hostOf = (href: string) => {
  try {
    return new URL(href).host.replace(/^www\./, "");
  } catch {
    return href;
  }
};

/**
 * What the tile carries when a project has no screenshot: the same inset window,
 * with the address where the page would load and the name set in the middle of it.
 * The grid stays one set of windows rather than a row with a hole in it, and the
 * shot, when it arrives, is one field in `lib/projects.ts`.
 */
const Cover = ({ title, href }: { title: string; href?: string }) => (
  <div className="border-connection bg-card absolute inset-x-[7%] top-[9%] flex aspect-[16/10] flex-col overflow-hidden rounded-[3px] border shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
    <span className="border-connection text-faint block truncate border-b px-2.5 py-1.5 font-mono text-[0.625rem] leading-none">
      {href ? hostOf(href) : "\u00a0"}
    </span>
    <span className="font-display text-muted-foreground flex flex-1 items-center justify-center px-4 text-center text-lg font-semibold tracking-[-0.02em] text-balance">
      {title}
    </span>
  </div>
);

/**
 * A screenshot on a tile that only finds its colour when you point at it.
 *
 * At rest every card is the same neutral grey, so the grid reads as one block and
 * nothing competes with the page. Hovering lifts exactly one out: the wash fades
 * up, the shot grows a fraction, the stack marks and the open-in-new arrow arrive,
 * and a twelve-millisecond tick confirms it.
 *
 * A project with nothing public to open still shows, just not as a link: no arrow
 * promising a new tab, no tick and no press.
 */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const Tag = project.href ? "a" : "div";
  const link = project.href
    ? {
        href: project.href,
        target: "_blank",
        rel: "noopener noreferrer",
        ...hoverSfx(sfx.hover),
      }
    : {};

  return (
    <Tag
      {...link}
      className={cn(
        "group flex flex-col",
        project.href && "transition-transform duration-150 ease-out active:scale-[0.985]",
        className,
      )}
    >
      <div className="border-connection bg-connection/40 relative mb-3 aspect-[4/3] w-full overflow-clip rounded-lg border transition-colors duration-300">
        {/* Held at zero opacity rather than mounted on hover: fetching only once
            the pointer lands would leave the first moment of every hover blank.
            Scaled slightly past the edges so the blur has nothing to crop to. */}
        <Image
          aria-hidden
          alt=""
          src={project.backdrop}
          width={900}
          height={675}
          sizes="(min-width: 640px) 22rem, 90vw"
          className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Inset and shadowed so it reads as a screen sitting on the tile rather
            than a picture cropped to it. */}
        {project.shot ? (
          <div className="absolute inset-x-[7%] top-[9%] overflow-hidden rounded-[3px] shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <Image
              src={project.shot.src}
              alt=""
              width={project.shot.width}
              height={project.shot.height}
              sizes="(min-width: 640px) 22rem, 90vw"
              className="block h-auto w-full"
            />
            {project.video ? (
              <video
                src={project.video}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                ref={(el) => {
                  if (!el) return;
                  el.onmouseenter = () => void el.play().catch(() => {});
                }}
              />
            ) : null}
          </div>
        ) : (
          <Cover title={project.title} href={project.href} />
        )}

        <Sheen />

        {project.href ? (
          <span
            aria-hidden
            className="text-foreground/70 absolute top-2.5 right-2.5 z-20 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Arrow />
          </span>
        ) : null}

        {project.stack.length > 0 ? (
          <span
            aria-hidden
            className="bg-background/80 absolute right-2.5 bottom-2.5 z-20 inline-flex translate-y-0.5 items-center gap-1.5 rounded-md px-1.5 py-1 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {project.stack.map((tech) => (
              <BrandIcon key={tech} name={tech} uid={`-${project.slug}-${tech}`} />
            ))}
          </span>
        ) : null}
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-foreground group-hover:text-accent text-base font-semibold tracking-[-0.02em] transition-colors">
          {project.title}
        </h3>
        {project.year ? (
          <span className="text-faint shrink-0 font-mono text-xs">{project.year}</span>
        ) : null}
      </div>

      {project.tagline ? (
        <p className="text-muted-foreground pt-1 text-sm leading-relaxed">{project.tagline}</p>
      ) : null}
    </Tag>
  );
}
