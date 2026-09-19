import type { Metadata } from "next";

import { ActionLink } from "@/components/action-link";
import { AvatarToy } from "@/components/avatar-toy";
import { Section } from "@/components/section";
import { Eyebrow, Heading, SectionHeader } from "@/components/typography";
import { EDUCATION } from "@/lib/experience";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Chomu to Jaipur to Udaipur to Vienna — how I got into building things for the web, and what I care about outside of it.",
  alternates: { canonical: "/about" },
};

/** Things I like. Low stakes, high signal — the bit people actually remember. */
const LIKES = [
  { title: "Long walks with a podcast", note: "Best debugging tool I own." },
  { title: "Mechanical keyboards", note: "Tactile, not clicky. I have roommates." },
  { title: "Formula 1", note: "Sunday afternoons are spoken for." },
  { title: "Coffee, badly made", note: "I own the gear. I ignore the gear." },
  { title: "Reading other people's code", note: "Half of what I know came from this." },
  { title: "Trains", note: "Vienna spoiled me completely." },
];

export default function AboutPage() {
  return (
    <>
      <Section innerClassName="py-12 sm:py-16">
        <div className="flex flex-col gap-7">
          <div className="flex items-start gap-5 sm:gap-6">
            <AvatarToy className="shrink-0" />
            <div className="flex flex-col gap-2 pt-1">
              <Eyebrow>About</Eyebrow>
              <Heading as="h1">A bit more than the homepage fits</Heading>
            </div>
          </div>

          <div className="text-muted-foreground flex max-w-prose flex-col gap-4 text-[0.9375rem] leading-relaxed">
            <p>
              I grew up in Chomu, a small town outside Jaipur, and the route from there to here ran
              through Jaipur, then Udaipur for engineering, then back to Jaipur — and now Vienna,
              which is still the biggest jump of the lot.
            </p>
            <p>
              I studied electronics, not computer science. What actually stuck was the code I wrote
              on the side: small tools, half-finished clones, the occasional thing that worked well
              enough to show someone. By the time I graduated I had several off-campus software
              offers and no real interest in circuits.
            </p>
            <p>
              Three years in, I build product end to end — React and Next.js on the front,
              TypeScript and Node behind it, React Native when it needs to be in someone&apos;s
              pocket. I like the unglamorous parts: naming things properly, deleting code, making
              the loading state feel like it was designed rather than remembered.
            </p>
            <p>
              Outside of work I&apos;m mostly reading, walking, or quietly rewriting this website
              for the fourth time.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-7">
          <SectionHeader eyebrow="Education" title="Where I studied" />
          <div className="flex flex-col gap-6">
            {EDUCATION.map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-foreground text-base font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <span className="text-faint shrink-0 font-mono text-xs">{item.period}</span>
                </div>
                <p className="font-secondary text-muted-foreground text-[0.8125rem]">
                  {item.company}
                  {item.location ? `, ${item.location}` : ""}
                </p>
                <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-7">
          <SectionHeader
            eyebrow="Off the clock"
            title="Some things I like"
            action={<ActionLink href="/inspiration">Inspiration</ActionLink>}
          />
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {LIKES.map((like) => (
              <li key={like.title} className="flex flex-col gap-1">
                <span className="text-foreground text-[0.9375rem] font-medium">{like.title}</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{like.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-4">
          <Heading>Want the short version?</Heading>
          <p className="text-muted-foreground max-w-prose text-[0.9375rem] leading-relaxed">
            The résumé is one page and says most of this with fewer adjectives.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <ActionLink href={SITE.resume} variant="outline" external>
              Read the résumé
            </ActionLink>
            <ActionLink href="/work" variant="outline">
              See the work
            </ActionLink>
          </div>
        </div>
      </Section>
    </>
  );
}
