# TODO

Parked deliberately during the rebuild — everything here is scaffolded in code with a
matching `TODO:` comment, so each one is a fill-in rather than a build-from-scratch.

## Deferred by decision

- [ ] **Blog: unique view counts.** Needs a store. `components/blog/blog-article-shell.tsx`
      and `components/blog/blog-post-link.tsx` both have the slot marked.
- [ ] **Blog: likes / popcorn button.** Same store, same two files. Braydon Coyer's version
      is the reference.
- [ ] **Blog: newsletter signup.** Bottom of `app/blog/page.tsx`. Needs somewhere for the
      addresses to land (Buttondown, Resend Audiences, ConvertKit).
- [ ] **`/toolbox` page.** Once it exists, add an `ActionLink` action to the
      `SectionHeader` in `components/stack-section.tsx` — the home stack stays a summary
      and Toolbox gets the long list.
- [ ] **Cal.com link.** Add `cal` to `SITE.socials` in `lib/site.ts`; then add the primary
      "Book a call" button above the email in `components/cta.tsx`.
- [ ] **Instagram.** Add `instagram` to `SITE.socials` — the footer and CTA pick it up on
      their own, no component changes needed.

## Content to replace

- [ ] **Your real signature.** `components/signature.tsx` currently holds a bezier
      stand-in. Sign on paper → scan → trace (Figma image trace or `potrace`) → paste the
      `d` strings into `STROKES`, in pen order.
- [ ] **Flowy.** `CURRENT_PROJECT` in `lib/projects.ts` is scaffolding — real tagline,
      description, stack and a link once there's something to link to.
- [ ] **More photos.** `SITE.photos` drives the click-to-cycle avatar; there are only two
      shots in `/public` today, so it flips between the same pair.
- [ ] **"Some things I like"** in `app/about/page.tsx` — I guessed. Make them yours.
- [ ] **Testimonials.** Waiting on having any.
- [ ] **`data/blog/rebuilding-my-portfolio.mdx` is now slightly out of date** — under
      "What I kept" it says "A theme switcher, tucked in the corner, for anyone who wants
      a different palette". That widget is gone. Your words, so I left them alone.

## Nice to have

- [ ] Project detail pages (`/work/[slug]`) — the data already has `slug` and a longer
      `description` doing nothing on the grid.
- [ ] OG image generation for blog posts (`next/og`).
