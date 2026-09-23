# Rohit's Portfolio

My personal website and blog: [rohitt.in](https://rohitt.in).

Design heavily inspired by [Manu Arora's site](https://manuarora.in)
([source](https://github.com/manuarora700/manuaroradotin)).

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4 (CSS-first config in `app/globals.css`)
- **Animations**: Motion (`motion/react`)
- **Content**: MDX via `next-mdx-remote` + `gray-matter`
- **Icons**: Tabler Icons
- **Analytics**: Vercel Analytics
- **Code Quality**: ESLint (flat config), Prettier, Husky, lint-staged

## 📦 Getting Started

### Prerequisites

- Node.js 24.x
- pnpm 10.x

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Structure

```
app/
  page.tsx              Home: bio, projects, stack, experience, contact
  blog/                 Blog index + [slug] MDX renderer
  inspiration/          People, tools and sites I admire
  layout.tsx            Fonts, metadata, navbar/footer shell
  globals.css           Tailwind v4 theme + design tokens
components/             UI components (kebab-case)
  blog/                 Blog index, list and article shell
data/blog/*.mdx         Blog posts
lib/
  site.ts               ⭐ All personal data, edit here first
  mdx.ts                MDX file reading + front matter
  motion-config.ts      Shared spring/variant config
  use-mounted.ts        Hydration-safe mounted flag
```

## ✏️ Editing content

| What                     | Where                         |
| ------------------------ | ----------------------------- |
| Name, email, socials, CV | `lib/site.ts`                 |
| Intro paragraphs         | `components/header.tsx`       |
| Projects                 | `components/work.tsx`         |
| Skills / tools           | `components/stack.tsx`        |
| Work history & education | `components/experience.tsx`   |
| Contact links            | `components/get-in-touch.tsx` |
| Inspiration list         | `app/inspiration/page.tsx`    |
| Blog posts               | `data/blog/*.mdx`             |

### Adding a blog post

Create `data/blog/my-post.mdx` with front matter:

```mdx
---
title: "My post"
publishedAt: "2026-01-15"
summary: "One line that shows up in the index and OG tags."
---

Content here. Components like `<StepCheck />`, `<HighlightBox />`,
`<VideoComponent />` and `<Button />` are available, see
`components/mdx-components.tsx`.
```

The route, sitemap entry and index listing are generated automatically.

## 🎨 Theme switcher

The gear in the top-right toggles between three fonts and six colour palettes,
persisted to `localStorage`. Palettes are defined in `components/settings.tsx`.

## ✅ Scripts

```bash
pnpm dev           # dev server
pnpm build         # production build
pnpm lint          # eslint
pnpm typecheck     # tsc --noEmit
pnpm format        # prettier --write
```

CI runs `format:check`, `lint`, `typecheck` and `build` on every push and PR.
