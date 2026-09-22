/** Companies and education. Shown on /work and /about. */

import type { HighlightTone } from "@/components/highlight";

export type Position = {
  title: string;
  period: string;
  /** Opening line, before the bullets. */
  summary?: string;
  /** What actually got done. Kept to the specifics: numbers, systems, names. */
  highlights?: string[];
};

export type Company = {
  company: string;
  /**
   * The tile beside the name on /work. Tones come from the highlight palette, so
   * the section is coloured out of the page's own five rather than a new set.
   * Assigned once and kept, like the highlights: a reader who notices peach means
   * fynk only benefits if it stays peach.
   */
  tone: HighlightTone;
  /** One or two characters for that tile. Defaults to the first of `company`. */
  mark?: string;
  /**
   * The real logo, where the company publishes one that survives a 44px square.
   * Self-hosted under /logos rather than hotlinked, so the page does not depend
   * on someone else's CDN. Without one the tile falls back to `mark`, which is
   * the honest answer: a wordmark squeezed into a square is a smudge, and a
   * generic building glyph is worse than an initial.
   *
   * Every one is a square that carries its own background, so they fill the tile
   * and the set reads as one row of brand avatars. That is the whole reason to
   * prefer these over the marks on the companies' own sites, which come as bare
   * glyphs on transparency and each needed their own tint and inversion to sit
   * on the page.
   */
  logo?: { src: string };
  /** One line on what the company does. Worth setting for names a reader won't know. */
  blurb?: string;
  /** What the work was built with. Company-level: it spans every position here. */
  stack?: string[];
  /** Full-time, Self-employed, Contract… */
  employment?: string;
  location?: string;
  /** Remote, Hybrid, On-site. */
  mode?: string;
  /**
   * Spanning period for the company header. Only set when a company holds more
   * than one position, where it's the total and each position carries its own.
   */
  period?: string;
  /** Newest first. Several entries means promotions within one company. */
  positions: Position[];
};

/**
 * Current roles first, then past ones by the date they ended. Two things run at
 * once on purpose; the studio has been alongside the day job since 2024.
 */
export const EXPERIENCE: Company[] = [
  {
    company: "fynk",
    logo: { src: "/logos/fynk.jpg" },
    tone: "peach",
    blurb: "Contract lifecycle management: drafting, negotiation and signing in one place.",
    employment: "Full-time",
    location: "Vienna, Austria",
    mode: "Hybrid",
    stack: [
      "Vue 3",
      "TypeScript",
      "Tiptap",
      "ProseMirror",
      "Laravel",
      "Inertia",
      "Vite",
      "Reka UI",
      "Tailwind CSS",
      "MySQL",
      "Pusher",
      "GitLab",
      "Figma",
      "Claude",
    ],
    positions: [
      {
        title: "Software Engineer (Editor)",
        period: "Jul 2026 → Present",
        summary:
          "I own the document and template editor, the part of fynk where a contract is actually written. Everything that touches it is mine: the contract features, the AI built on top of them, the performance work, and the maintenance that keeps the rest possible. Tiptap and ProseMirror in Vue 3, on a Laravel backend.",
        highlights: [
          "A customer reported a thousand-cell template they could no longer type in. Profiling found eight independent full-document walks running on every keystroke, cursor move and scroll, so I replaced the DOM queries and node view re-renders on the typing path with derived state. A typed character went from 12 to 16 document.querySelector calls to none, and Cmd+A from 1,426 to none.",
          "The same pass turned up work happening nowhere near the typing path: the minimap sweeping around 1,030 elements and forcing a reflow on every scroll event, still doing it after it had been closed, and Sentry tracing holding 86% of the main thread on load.",
          "Reworked the layout, design and behaviour of the features that make a contract a contract rather than a text file: dynamic fields, conditional content, signature and approval blocks, dynamic tables, column layouts, headers and footers, section references, track changes. The pieces were already there; the work was making them read clearly on the page and behave the way someone drafting a contract expects.",
          "Migrated Tiptap v2 to v3, put upstream extensions back in place of our forks, and cut 70-odd dead exports. Then reorganised the editor tree around what code does to the document rather than which library construct it happens to use, so that a new engineer, or a coding agent, can find the one place a change belongs without reading the whole editor first. The architecture doc that came out of it is what the team and its agents work from now.",
          "Took a piece of the editor off a vendor's cloud and onto our own infrastructure. Contracts are the last documents a company wants leaving its own systems, so the tighter answer was to run it ourselves rather than pass customer text through someone else's service.",
        ],
      },
    ],
  },
  {
    company: "Launchbox Studio",
    logo: { src: "/logos/launchbox.jpg" },
    tone: "butter",
    mark: "LS",
    employment: "Self-employed",
    mode: "Remote",
    positions: [{ title: "Founder", period: "Apr 2024 → Present" }],
  },
  {
    company: "Steerlab",
    logo: { src: "/logos/steerlab.png" },
    tone: "mint",
    blurb: "AI that automates RFP and vendor-questionnaire responses for PreSales teams.",
    employment: "Part-time",
    location: "Paris, France",
    mode: "Remote",
    stack: ["TypeScript", "JavaScript", "ProseMirror", "React", "Gleam", "Redraw"],
    positions: [
      {
        title: "Product Engineer",
        period: "Jul 2025 → Jul 2026",
        summary: "Brought in part-time to replace the core editor in an existing codebase.",
        highlights: [
          "Rebuilt the editor on ProseMirror in JavaScript and TypeScript. It had been running on Tiptap and the team had hit a ceiling on what they could get out of it, so the work was to drop the abstraction and build straight against the document model Tiptap itself wraps.",
          "Learned Gleam, a statically typed language that was new to me, and worked in Redraw, its React bindings, where the Gleam side of the codebase meets React.",
        ],
      },
    ],
  },
  {
    company: "Frontier AI Lab",
    tone: "lilac",
    mark: "F",
    blurb: "One of the frontier labs. Which one is under NDA, so it goes unnamed here.",
    employment: "Full-time",
    mode: "Remote",
    stack: [
      "TypeScript",
      "Next.js",
      "React 19",
      "tRPC",
      "Prisma",
      "SQLite",
      "Tailwind CSS",
      "Zod",
      "MCP",
      "Playwright",
      "Vitest",
      "Storybook",
      "OpenTelemetry",
      "Docker",
    ],
    positions: [
      {
        title: "Senior Software Engineer",
        period: "Oct 2025 → Jun 2026",
        summary:
          "The lab needed somewhere to train and grade its models on real software, so we rebuilt the software. Working clones of the tools people actually spend their day in: Slack, Google Workspace, Linear, Jira, AWS, Sentry, Shopify, LinkedIn. All of it in TypeScript on tRPC and a house framework every app shared, each app a reinforcement-learning environment an agent could be dropped into and scored in. Twelve of them in nine months, alongside around 200 engineers rotating on and off from Brazil, the US, Portugal, the rest of Europe and India.",
        highlights: [
          "Owned the end-to-end testing framework for a stretch: the Playwright suite every clone was checked against, and the rules that kept it worth trusting. No arbitrary waits anywhere in a spec, a quarantine a flaky test had to earn its way back out of, and per-spec timings tracked so the suite stayed inside its budget as apps kept arriving.",
          "A clone is only worth training on if it behaves like the original, so the apps were tested against the real product rather than against themselves: the same calls run through both, the responses diffed, the recorded set checked back in. That is what catches the differences a screenshot never shows: an error shape, a pagination cursor, the order a list comes back in.",
          "Each app exposed its own tool API, MCP and REST generated off the tRPC router, because a model drives a product through tools rather than through the screen. Generating it meant a new procedure could not quietly leave the agent's view of the app behind, and a drift check in CI held the two together.",
          "Much of the rest of my time went on making the harness fast. A training run brings an app up, drives it and tears it down over and over, so startup seconds and slow endpoints are the cost of the experiment rather than a detail of it. Endpoint benchmarks, OpenTelemetry traces through the server, and generated workspaces large enough to surface what only shows up at size.",
          "None of it was ever deployed. Each app ran entirely on the machine training against it: Prisma over a local SQLite file, seeded by scripts that could stand up a realistic populated workspace on demand. The whole thing shipped as a Docker image, so every run started from an identical copy.",
        ],
      },
    ],
  },
  {
    company: "AI Acquisition",
    logo: { src: "/logos/ai-acquisition.jpg" },
    tone: "sky",
    mark: "AI",
    blurb: "AI agents and automation systems for founders and service businesses.",
    employment: "Full-time",
    location: "Dubai, UAE",
    mode: "Remote",
    stack: [
      "Next.js",
      "React 19",
      "TypeScript",
      "tRPC",
      "Vercel AI SDK",
      "Mastra",
      "Inngest",
      "Drizzle ORM",
      "Neon Postgres",
      "TanStack Query",
      "Tailwind CSS",
      "Instantly API",
      "Resend",
      "Playwright",
    ],
    positions: [
      {
        title: "Product Engineer",
        period: "Aug 2025 → Dec 2025",
        summary:
          "Worked across an outbound stack that runs itself: a campaign agent fires cold email through Instantly, the AI SDR picks up whoever replies and holds the conversation, and anything that turns out to be a real lead is written into the CRM as a new record.",
        highlights: [
          "Built the CRM end to end: the system of record every qualified lead lands in, and the last step of the automated flow.",
          "Built the dashboard and analytics: every email sent and every reply collected in one place, tied back to the CRM records they belong to.",
          "Contributed to the AI campaign manager, which sends the cold-email sequences out through the Instantly API.",
          "Contributed to the AI SDR: it answers replies, qualifies the prospect in conversation, and opens the CRM entry once someone looks worth talking to.",
        ],
      },
    ],
  },
  {
    company: "Alpine",
    logo: { src: "/logos/alpine.jpg" },
    tone: "mint",
    blurb:
      "A productivity suite in one workspace: documents, slides, tasks, projects and messaging.",
    location: "New York, United States",
    mode: "Remote",
    stack: [
      "Remix",
      "React",
      "TypeScript",
      "ProseMirror",
      "prosemirror-collab",
      "Bazel",
      "AWS CDK",
      "Cloudflare Workers",
      "DynamoDB",
      "vanilla-extract",
      "React Aria",
      "CodeMirror",
      "WebSockets",
      "Playwright",
    ],
    positions: [
      {
        title: "Product Engineer",
        period: "Nov 2024 → Jul 2025",
        summary:
          "Hired onto the editor and ended up working across the product. The editor is ProseMirror, collaborating in real time through prosemirror-collab, so most of the work sat in the document model and the operational-transform layer that keeps every client in agreement.",
        highlights: [
          "Rebuilt ProseMirror's table support from scratch. The community extension had been abandoned by its maintainer, so I worked from the existing forks, stripped out the broken behaviour and rebuilt it as a component we owned outright.",
          "Worked in the real-time collaboration layer: ProseMirror documents reconciled across clients with prosemirror-collab and operational transform.",
          "Built workspace settings end to end: the profile page, and the account and workspace switchers.",
          "Came up to speed on Bazel to work in the monorepo. A build system and repo layout I had not touched before, and the steepest part of the ramp.",
          "Shipped against infrastructure spread across AWS and Cloudflare Workers with Remix on the front, the first time I had worked on a system distributed that widely, and the thing I took most from the role.",
        ],
      },
    ],
  },
  {
    company: "mroads",
    logo: { src: "/logos/mroads.jpg" },
    tone: "butter",
    employment: "Full-time",
    location: "Hyderabad, India",
    mode: "Remote",
    period: "Apr 2022 → Nov 2024",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "Java Spring Boot",
      "Tailwind CSS",
      "Material UI",
      "Framer Motion",
      "Jenkins",
      "AWS",
    ],
    positions: [
      {
        title: "Software Engineer",
        period: "Apr 2023 → Nov 2024",
        summary:
          "Worked with the Panna team on end-to-end candidate and employee management: React on the front, Java Spring Boot behind it.",
        highlights: [
          "Built a logging and monitoring microservice covering both frontend and backend, lifting development velocity 40%, with log access served off an EC2 instance.",
          "Shipped a unified authentication microservice that cut authentication endpoints by over 50%. Packaged it to npm for drop-in frontend integration, which made deployments 30% faster.",
          "Migrated the product from Angular to React.",
          "Built a suite of reusable components: promise-returning modals and custom react-hook-form pieces that handle forms without manual registration, worth a 25% gain in development speed.",
          "Cut application response times 30% by consolidating global components and stripping out dead code.",
          "Led the agile rebuild of the Dashboard module with backend, QA and UX/UI, improving delivery speed 20%.",
          "Set up a Jenkins CI/CD pipeline deploying Spring Boot and React apps to AWS Amplify.",
        ],
      },
      {
        title: "Associate Software Engineer",
        period: "Apr 2022 → Apr 2023",
        summary:
          "Built and unit-tested product features across Next.js, TypeScript, redux-toolkit and AWS, with Framer Motion, Material UI and Tailwind CSS on the surface.",
        highlights: [
          "Led the team migrating four products from legacy Angular to modular React.",
          "Engineered and deployed the unified authentication microservice on Turbopack and React, halving authentication endpoints and raising deployment rate 30%.",
          "Built the reusable React component suite and custom react-hook-form handling, a 25% improvement in development efficiency.",
          "Drove the agile redevelopment of the Dashboard module with backend, QA and UX/UI, improving delivery speed 20%.",
          "Resolved UI discrepancies against Figma in Tailwind CSS, holding the interfaces to the design spec exactly.",
          "Handled a dataset of over a million entries, adding an edit-form flow so users could correct previously submitted information.",
        ],
      },
    ],
  },
];

export type Education = {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string;
};

export const EDUCATION: Education[] = [
  {
    title: "B.Tech, Electronics Engineering",
    company: "CTAE",
    location: "Udaipur",
    period: "2018 → 2022",
    description:
      "Studied electronics, wrote a lot of code on the side, and picked up several off-campus software offers before graduating.",
  },
];
