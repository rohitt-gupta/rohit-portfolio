# TODO

Parked deliberately during the rebuild. Everything here is scaffolded in code with a
matching `TODO:` comment, so each one is a fill-in rather than a build-from-scratch.

## Deferred by decision

- [ ] **Blog: unique view counts.** Needs a store. `components/blog/blog-article-shell.tsx`
      and `components/blog/blog-post-link.tsx` both have the slot marked.
- [ ] **Blog: likes / popcorn button.** Same store, same two files. Braydon Coyer's version
      is the reference.
- [ ] **Blog: newsletter signup.** Bottom of `app/blog/page.tsx`. Needs somewhere for the
      addresses to land (Buttondown, Resend Audiences, ConvertKit).
- [ ] **`/toolbox` page.** Once it exists, add an `ActionLink` action to the
      `SectionHeader` in `components/stack-section.tsx`. The home stack stays a summary
      and Toolbox gets the long list.
- [ ] **"Book a call" in the CTA.** The link and the overlay both exist now
      (`SITE.socials.cal`, `components/book-a-call.tsx`); what's left is deciding whether
      the CTA in `components/cta.tsx` should carry the same trigger as a primary button
      above the email, or whether the sticky pill is enough on its own.
- [ ] **Instagram.** Add `instagram` to `SITE.socials`. The footer and CTA pick it up on
      their own, no component changes needed.

## Content to replace

- [ ] **Your real signature.** `components/signature.tsx` currently holds a bezier
      stand-in. Sign on paper → scan → trace (Figma image trace or `potrace`) → paste the
      `d` strings into `STROKES`, in pen order.
- [ ] **More photos.** `SITE.photos` drives the click-to-cycle avatar; there are only two
      shots in `/public` today, so it flips between the same pair.
- [ ] **"Some things I like"** in `app/about/page.tsx`. I guessed, so make them yours.
- [ ] **Testimonials.** Waiting on having any.
- [ ] **`data/blog/rebuilding-my-portfolio.mdx` is now slightly out of date.** Under
      "What I kept" it says "A theme switcher, tucked in the corner, for anyone who wants
      a different palette". That widget is gone. Your words, so I left them alone.

## Nice to have

- [ ] Project detail pages (`/work/[slug]`). The data already has `slug` and a longer
      `description` doing nothing on the grid.
- [ ] OG image generation for blog posts (`next/og`).
