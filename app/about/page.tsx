import type { Metadata } from "next";

import { ActionLink } from "@/components/action-link";
import { ChomuMap } from "@/components/chomu-map";
import { Print } from "@/components/print";
import { ProseLink } from "@/components/prose-link";
import { Section } from "@/components/section";
import { StoryRail } from "@/components/story-rail";
import { Eyebrow, Heading, SectionHeader } from "@/components/typography";
import { EDUCATION } from "@/lib/experience";
import { SITE } from "@/lib/site";
import { TECH_LINKS } from "@/lib/tech-links";

export const metadata: Metadata = {
  title: "About",
  description:
    "Electronics to product engineering, by way of ten failed exams, a referral, and a long detour into text editors.",
  alternates: { canonical: "/about" },
};

/** Things I like. Low stakes, high signal. The bit people actually remember. */
const LIKES = [
  { title: "Long walks with a podcast", note: "Best debugging tool I own." },
  { title: "Mechanical keyboards", note: "Tactile, not clicky. I have roommates." },
  { title: "Formula 1", note: "Sunday afternoons are spoken for." },
  { title: "Coffee, badly made", note: "I own the gear. I ignore the gear." },
  { title: "Reading other people's code", note: "Half of what I know came from this." },
  { title: "Trains", note: "Vienna spoiled me completely." },
];

/** Everything the story points at that actually exists somewhere. */
const L = {
  ctae: "https://ctae.ac.in",
  cpp: "https://isocpp.org",
  mroads: "https://www.mroads.com",
  manu: "https://www.manuarora.in",
  manuLinkedin: "https://www.linkedin.com/in/manuarora28",
  aceternity: "https://ui.aceternity.com",
  aceBuilder: "https://acebuilder.ai",
  kishore: "https://www.kishoregunnam.com",
  kishoreLinkedin: "https://www.linkedin.com/in/kishore-gunnam",
  java: "https://dev.java",
  alpine: "https://www.alpine.inc",
  steerlab: "https://www.steerlab.ai",
  cursor: "https://cursor.com",
  fynk: "https://fynk.com",
  flowy: "https://flowyhealth.com",
  swift: "https://www.swift.org",
};

/**
 * The story, in chapters, each with the years it covers.
 *
 * Written as data rather than markup because the shape repeats and the page is
 * long enough that hand-laying each one would drift. A chapter can carry an aside,
 * which lands in the right-hand column on a wide screen and under the prose on a
 * narrow one. Three across six chapters is enough to break the column without
 * turning the page into an album, and the first one is drawn rather than
 * photographed, because the thing it wants to show is a place, not a face.
 */
const STORY: { label: string; body: React.ReactNode[]; aside?: React.ReactNode }[] = [
  {
    label: "2018 → 2022 · Udaipur",
    body: [
      <>
        I grew up in Chomu, a small town outside Jaipur, and the route from there to here ran
        through Jaipur, then Udaipur for engineering, then back to Jaipur, and now Vienna, which is
        still the biggest jump of the lot.
      </>,
      <>
        I studied electronics at <ProseLink href={L.ctae}>CTAE</ProseLink>, not computer science,
        and I was not good at it. Ten failed exams across four years. I got the degree anyway,
        mostly because the thing I actually cared about was happening beside it: by the final year I
        was doing data structures and algorithms in <ProseLink href={L.cpp}>C++</ProseLink> most
        nights, because computers were the one part I could not put down.
      </>,
    ],
    aside: <ChomuMap className="lg:justify-self-end" />,
  },
  {
    label: "The wrong first turn",
    body: [
      <>
        I started in data engineering. It never landed. I still can&apos;t tell you exactly what was
        missing, only that nothing about it made me want to open the laptop again the next morning.
      </>,
      <>Web development did. The first thing I built and put in front of someone settled it.</>,
    ],
  },
  {
    label: "2022 → 2024 · mroads, Bangalore",
    body: [
      <>
        <ProseLink href={L.manu}>Manu Arora</ProseLink> used to work at{" "}
        <ProseLink href={L.mroads}>mroads</ProseLink> and was kind enough to refer me. That referral
        is the reason the rest of this happened at all, and it is the smallest part of what I owe
        him.
      </>,
      <>
        I have been following Manu since before I could write anything worth reading. He started in
        web development too, built <ProseLink href={L.aceternity}>Aceternity UI</ProseLink> into
        something a large part of the internet now builds with, and kept setting a bar just high
        enough that I had to get better to see it. He does not know any of this yet. He is the
        single biggest source of inspiration I have, and if you only click one link on this page,
        make it <ProseLink href={L.manuLinkedin}>his</ProseLink>.
      </>,
      <>
        The other one is <ProseLink href={L.kishore}>Kishore Gunnam</ProseLink>, who co-founded
        Aceternity and is the person behind <ProseLink href={L.aceBuilder}>Ace Builder</ProseLink>.
        I sat next to his code for two and a half years at mroads. Watching him take a problem apart
        and put it back together with scale already accounted for is the closest thing to formal
        training I have had.{" "}
        <ProseLink href={L.kishoreLinkedin}>Go and look at what he builds.</ProseLink>
      </>,
      <>
        I started as a front-end developer on <ProseLink href={TECH_LINKS.React}>React</ProseLink>{" "}
        and kept going: <ProseLink href={TECH_LINKS.TypeScript}>TypeScript</ProseLink>,{" "}
        <ProseLink href={TECH_LINKS["Next.js"]}>Next.js</ProseLink>,{" "}
        <ProseLink href={TECH_LINKS["Tailwind CSS"]}>Tailwind</ProseLink>. Most of it went into
        government portals, which is less glamorous than it sounds and better practice than it
        sounds. The team was good and the job was remote, which at twenty-two taught me as much as
        the code did.
      </>,
      <>
        Then they needed <ProseLink href={L.java}>Java</ProseLink> engineers and couldn&apos;t find
        the right ones, so I learned Java. That turned out to be the useful accident: I was more
        interested in how a thing was put together than in the front end of it. Somewhere in there I
        found out the word for what I wanted to be was product engineer.
      </>,
    ],
  },
  {
    label: "2024 · Going all in",
    body: [
      <>
        I started freelancing on the side and talking to clients wherever they were, mostly in the
        US. Then <ProseLink href={L.alpine}>Alpine</ProseLink> came along, and I quit the full-time
        job and went all in on consulting.
      </>,
      <>
        I joined Alpine as a freelance consultant and they hired me. Working with Caleb, who founded
        it, is the best thing that has happened to me professionally. He is opinionated in the way
        you want an engineer to be opinionated, and watching him think about code changed how I
        write it. It is also where I met{" "}
        <ProseLink href={TECH_LINKS.ProseMirror}>ProseMirror</ProseLink> and{" "}
        <ProseLink href={TECH_LINKS.Tiptap}>Tiptap</ProseLink>.
      </>,
    ],
    aside: <Print photo={SITE.photos[2]} rotate="rotate-[4deg]" className="lg:justify-self-end" />,
  },
  {
    label: "2025 → 2026 · Editors, and the AI on top of them",
    body: [
      <>
        Editors turned out to be the thing I am actually good at. They are a proper problem: the
        document model, the selection, the thousand ways a cursor ends up somewhere it
        shouldn&apos;t be. I enjoy them in a way I have not enjoyed much else.
      </>,
      <>
        Then AI landed on top of them, which made them more interesting rather than less. I have
        been on <ProseLink href={L.cursor}>Cursor</ProseLink> since the week it launched, and there
        was a stretch where I paid for more than one subscription at once purely so I could keep
        shipping. I built editor products at <ProseLink href={L.steerlab}>Steerlab</ProseLink> in
        Paris and at a few places alongside it.
      </>,
    ],
  },
  {
    label: "2026 → now · Vienna",
    body: [
      <>
        At <ProseLink href={L.fynk}>fynk</ProseLink> I am automating the contract lifecycle with AI,
        from the first draft to the signature. On the side there is{" "}
        <ProseLink href={L.flowy}>Flowy</ProseLink>, which started life in{" "}
        <ProseLink href={L.swift}>Swift</ProseLink> and is now{" "}
        <ProseLink href={TECH_LINKS.Expo}>Expo</ProseLink>, because I would rather write TypeScript
        and React.
      </>,
      <>
        The day job is <ProseLink href={TECH_LINKS.Vue}>Vue</ProseLink> and the editor under it is
        Tiptap. Which framework is under the hood matters less to me every year: the first
        principles are the same across all of them, and the interesting part was never the stack.
      </>,
      <>
        Outside of work I am mostly reading, walking, or quietly rewriting this website for the
        fourth time.
      </>,
    ],
    aside: <Print photo={SITE.photos[3]} rotate="-rotate-[3deg]" className="lg:justify-self-end" />,
  },
];

/**
 * The tracked label that opens each chapter. gentlejoseph.com's device: a rule
 * running out to the edge separates without a heading's weight, which is what this
 * wants. Six of these down a page, and headings would read as six new sections.
 */
const ChapterLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-secondary text-faint flex items-center gap-3 text-[0.625rem] tracking-[0.2em] uppercase">
    <span className="shrink-0">{children}</span>
    <span aria-hidden className="bg-rule h-px flex-1" />
  </p>
);

export default function AboutPage() {
  return (
    <>
      <Section innerClassName="py-12 sm:py-16">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Eyebrow>About</Eyebrow>
            <Heading as="h1">A bit more than the homepage fits</Heading>
          </div>

          {/* The lede runs at the home page's scale rather than body size, so the page
              opens on something with weight instead of straight into small print. */}
          <p className="font-secondary text-foreground max-w-prose text-lg leading-[1.45] font-medium tracking-[-0.02em] text-balance sm:text-xl">
            I came to this the long way round. Electronics rather than computer science, and a false
            start in data engineering before the web caught. What I have been working out since is
            that the part I like is the whole of it: the problem, the build, and whether the person
            on the other end can tell the difference.
          </p>
        </div>
      </Section>

      {/*
        The story runs as chapters rather than one block of prose, because it covers
        eight years and a reader should be able to drop in at the year they care about.

        Two columns from `lg`: the prose held to a readable measure on the left and the
        prints out at the right edge. The right-hand space was there anyway, since text set
        to `max-w-prose` inside a 54rem column leaves it, and putting the photos in it
        is better than centring them over a page that is left-aligned everywhere else.
        Below `lg` the print drops under its chapter and stays left-aligned with it.
      */}
      <Section>
        {/* `relative`, so the rail can span every chapter at once. Its left offset is
            the prose column's exact width: from `lg` the section's track is always
            capped at 54rem, so that column is always 32rem and the rail never drifts
            off the seam. */}
        <ol className="relative flex flex-col gap-12 sm:gap-14">
          <StoryRail className="left-[32rem] hidden w-16 lg:block" />
          {STORY.map((chapter) => (
            <li
              key={chapter.label}
              className="grid gap-6 lg:grid-cols-[minmax(0,32rem)_4rem_minmax(0,1fr)] lg:gap-0"
            >
              <div className="flex flex-col gap-3">
                <ChapterLabel>{chapter.label}</ChapterLabel>
                <div className="text-muted-foreground flex flex-col gap-4 text-[0.9375rem] leading-relaxed">
                  {chapter.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {chapter.aside ? <div className="lg:col-start-3 lg:mt-6">{chapter.aside}</div> : null}
            </li>
          ))}
        </ol>
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
