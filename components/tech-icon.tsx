import React from "react";
import {
  siBazel,
  siCloudflareworkers,
  siCodemirror,
  siDrizzle,
  siFramer,
  siGleam,
  siJavascript,
  siJenkins,
  siMui,
  siNeon,
  siNextdotjs,
  siProsemirror,
  siReact,
  siReactquery,
  siRedux,
  siRemix,
  siResend,
  siSpringboot,
  siTailwindcss,
  siTrpc,
  siTypescript,
  siVanillaextract,
  siVercel,
} from "simple-icons";

import { cn } from "@/lib/utils";

type SimpleIcon = { title: string; path: string };

/**
 * Tech label → brand mark. Keyed on the exact string used in `lib/experience.ts`,
 * so adding a technology there is a one-line addition here.
 *
 * Monochrome on purpose: this runs down the experience list, where three dozen
 * chips at full saturation would drown the page. The toolkit section is a short,
 * deliberate row instead, so it uses the full-colour marks in `brand-icon.tsx`.
 *
 * Simple Icons has no mark for everything — Amazon, Adobe and Playwright were all
 * pulled over trademark requests, and newer tools like Mastra and Inngest were
 * never in the set. Anything missing falls back to a dot rather than borrowing a
 * lookalike: a Socket.IO mark on a "WebSockets" chip would just be wrong.
 */
const ICONS: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  "React 19": siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Gleam: siGleam,
  tRPC: siTrpc,
  "Vercel AI SDK": siVercel,
  "Drizzle ORM": siDrizzle,
  "Neon Postgres": siNeon,
  "TanStack Query": siReactquery,
  "Tailwind CSS": siTailwindcss,
  Resend: siResend,
  Remix: siRemix,
  ProseMirror: siProsemirror,
  "prosemirror-collab": siProsemirror,
  Bazel: siBazel,
  "Cloudflare Workers": siCloudflareworkers,
  "vanilla-extract": siVanillaextract,
  CodeMirror: siCodemirror,
  "Redux Toolkit": siRedux,
  "Java Spring Boot": siSpringboot,
  "Material UI": siMui,
  "Framer Motion": siFramer,
  Jenkins: siJenkins,
};

/**
 * Drawn in currentColor, not brand colour. Two dozen logos at full saturation
 * would be the loudest thing on a page built from paper, ink and one accent.
 */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = ICONS[name];

  if (!icon) {
    return (
      <span
        aria-hidden
        className={cn("size-1 shrink-0 rounded-full bg-current opacity-40", className)}
      />
    );
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("size-3 shrink-0", className)}
    >
      <path d={icon.path} />
    </svg>
  );
}
