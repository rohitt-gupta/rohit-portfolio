import type { Metadata } from "next";

import { ActionLink } from "@/components/action-link";
import { ChomuMap } from "@/components/chomu-map";
import { Print } from "@/components/print";
import { ProseLink } from "@/components/prose-link";
import { Section } from "@/components/section";
import { StoryAside } from "@/components/story-aside";
import { StoryRail } from "@/components/story-rail";
import { Eyebrow, Heading, SectionHeader } from "@/components/typography";
import { EDUCATION } from "@/lib/experience";
import { SITE, withRef } from "@/lib/site";
import { TECH_LINKS } from "@/lib/tech-links";

export const metadata: Metadata = {
  title: "About",
  description:
    "Electronics to product engineering, by way of ten failed exams, a referral, a cafe, and a long detour into text editors.",
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
 * The one print that is not of me. Kept out of `SITE.photos`, which is the set of
 * photos of me the home page toy cycles through, and given its own alt.
 */
const VIENNA_STREET = {
  src: "/vienna-street.jpg",
  width: 674,
  height: 1200,
  focus: "50% 0%",
  alt: "A church at the top of a flight of steps in Vienna, with yellow houses beside it and bikes parked in front",
};

/**
 * The story, in chapters, each with the years it covers.
 *
 * Written as data rather than markup because the shape repeats and the page is
 * long enough that hand-laying each one would drift. Every chapter carries a
 * title in the display face, which is what a reader skims by; six labels in 10px
 * mono were not enough to navigate a page this long. A chapter can also carry an
 * aside, which lands in the right-hand column on a wide screen and, on a narrow one,
 * under the prose beside a place tag so it never sits there alone. Each chapter also
 * puts a bead on the rail where its title sits, so the line reads as a journey with
 * stops rather than a progress bar.
 *
 * Deliberately no company logos on those beads, and deliberately light on the stack.
 * A first draft had both, and the page turned into a CV with prose attached; the work
 * page already is that. This one is told by place and by people, which is the part a
 * CV leaves out, and it keeps the two years that had nothing to do with an editor.
 */
const STORY: {
  years: string;
  title: string;
  body: React.ReactNode[];
  aside?: React.ReactNode;
}[] = [
  {
    years: "2018 → 2022 · Udaipur",
    title: "The long way round",
    body: [
      <>
        The route out of Chomu ran through Jaipur, then Udaipur for engineering. I studied
        electronics at <ProseLink href={L.ctae}>CTAE</ProseLink>, not computer science, and I was
        not good at it: ten failed exams in four years. I got the degree anyway, because the thing I
        cared about was happening beside it. By the final year I was doing data structures in{" "}
        <ProseLink href={L.cpp}>C++</ProseLink> most nights, because computers were the one part I
        could not put down.
      </>,
      <>
        Out of college I tried data engineering first. It was fine, and it was not mine. Web
        development was: the first thing I built and put in front of someone settled it.
      </>,
    ],
    aside: (
      <StoryAside
        place="Chomu"
        lines={["27.17° N, 75.72° E", "30 km north of Jaipur"]}
        caption="Chomu, 30 km north of Jaipur"
      >
        <ChomuMap />
      </StoryAside>
    ),
  },
  {
    years: "2022 → 2024 · Hyderabad",
    title: "Hyderabad, and the two people who set the bar",
    body: [
      <>
        I joined <ProseLink href={L.mroads}>mroads</ProseLink> as a front-end developer, remote, at
        twenty-two. When they could not find the <ProseLink href={L.java}>Java</ProseLink> engineers
        they needed, I learned Java, and that was the useful accident: I cared more about how a
        thing is put together than about the front of it. Somewhere in there I found the word for
        what I wanted to be, and it was product engineer.
      </>,
      <>
        None of it happens without <ProseLink href={L.manu}>Manu Arora</ProseLink>, who used to work
        there and referred me. The referral is the smallest part of what I owe him. I have followed
        Manu since before I could write anything worth reading. He built{" "}
        <ProseLink href={L.aceternity}>Aceternity UI</ProseLink> into something a large part of the
        internet now builds with, and kept setting the bar just high enough that I had to get better
        to see it. He does not know any of this yet. If you click one link on this page, make it{" "}
        <ProseLink href={L.manuLinkedin}>his</ProseLink>.
      </>,
      <>
        The other is <ProseLink href={L.kishore}>Kishore Gunnam</ProseLink>, who co-founded
        Aceternity and is the person behind <ProseLink href={L.aceBuilder}>Ace Builder</ProseLink>.
        I sat next to his code for two and a half years, and watching him take a problem apart with
        scale already accounted for is the closest thing to formal training I have had.{" "}
        <ProseLink href={L.kishoreLinkedin}>Go and look at what he builds.</ProseLink>
      </>,
    ],
    aside: (
      <StoryAside place="Hyderabad" lines={["17.39° N, 78.49° E", "2022 → 2024"]}>
        <Print photo={SITE.photos[1]} rotate="rotate-[3deg]" />
      </StoryAside>
    ),
  },
  {
    years: "2024",
    title: "Going all in",
    body: [
      <>
        I had been freelancing on the side, mostly for clients in the US, and when{" "}
        <ProseLink href={L.alpine}>Alpine</ProseLink> came along I quit the full-time job and went
        all in. They hired me off the back of the consulting. Working with Caleb, who founded it, is
        the best thing that has happened to me professionally: he is opinionated the way you want an
        engineer to be, and watching him think about code changed how I write it.
      </>,
    ],
    aside: (
      <StoryAside place="Remote" lines={["Freelance, then Alpine", "2024"]}>
        {/* A landscape photo, so the frame widens to 3:4. Its focus, on the face
            and the thumb, comes with the photo. */}
        <Print photo={SITE.photos[2]} rotate="-rotate-[4deg]" className="aspect-[3/4]" />
      </StoryAside>
    ),
  },
  {
    years: "2024 → 2026 · Online",
    title: "The internet, and a cafe",
    body: [
      <>
        In 2024 I also started posting on <ProseLink href={SITE.socials.x}>X</ProseLink> instead of
        only reading it. A few posts went viral, the account grew to close to four thousand people,
        and some of the builders I met there became a group we called Dominate X. Some of the best
        people I know, I know from there.
      </>,
      <>
        Then in January 2025 I bought a cafe. I ran it alongside the day job for about a year, until
        it closed early in 2026. A good run all the same, and I enjoyed the whole process, start to
        finish.
      </>,
    ],
    aside: (
      <StoryAside place="Online" lines={[`@${SITE.handle} on X`, "2024 → 2026"]}>
        <Print photo={SITE.photos[4]} rotate="rotate-[4deg]" />
      </StoryAside>
    ),
  },
  {
    years: "2025 → now · Remote, then Vienna",
    title: "Editors, then the AI on top of them",
    body: [
      <>
        Editors turned out to be the thing I am actually good at: the document model, the selection,
        the cursor that ends up where it should not. I built editor products remotely for{" "}
        <ProseLink href={L.steerlab}>Steerlab</ProseLink>, a team in Paris, and AI landing on top of
        them made the problem more interesting rather than less. I have been on{" "}
        <ProseLink href={L.cursor}>Cursor</ProseLink> since the week it launched, and for a stretch
        I paid for more than one subscription at once purely to keep shipping.
      </>,
      <>
        Now, from Vienna, I am automating the contract lifecycle with AI at{" "}
        <ProseLink href={L.fynk}>fynk</ProseLink>, from the first draft to the signature. On the
        side there is <ProseLink href={withRef(L.flowy)}>Flowy</ProseLink>, which started in{" "}
        <ProseLink href={L.swift}>Swift</ProseLink> and is now{" "}
        <ProseLink href={TECH_LINKS.Expo}>Expo</ProseLink>, because I would rather write TypeScript.
      </>,
      <>
        Outside of work I am mostly reading, walking, or quietly rewriting this website for the
        fourth time.
      </>,
    ],
    aside: (
      <StoryAside place="Vienna" lines={["48.21° N, 16.37° E", "2025 → now"]}>
        <Print photo={VIENNA_STREET} rotate="-rotate-[3deg]" />
      </StoryAside>
    ),
  },
];

/**
 * A bead on the rail, level with the chapter's title. Drawn on the page background
 * with a ring of it, so the bar passes behind rather than through, and above the bar
 * in the stack but below the avatar, which travels over it.
 */
const ChapterMark = () => (
  <span
    aria-hidden
    className="ring-background bg-background border-connection relative z-10 hidden size-4 rounded-full border ring-4 lg:block"
  />
);

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
            I&apos;m Rohit. I grew up in Chomu, a small town north of Jaipur, and I live in Vienna
            now, which is still the biggest jump of the lot. I build software for a living and, most
            evenings, for fun. This is how one turned into the other, told by place rather than job
            title. The titles are on the work page; this is the part they leave out.
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
        Below `lg` the print drops under its chapter, with its place tag filling the rest
        of the row, so the chapter ends on a full line rather than a small picture and a gap.
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
              key={chapter.title}
              className="grid gap-6 lg:grid-cols-[minmax(0,32rem)_4rem_minmax(0,1fr)] lg:gap-0"
            >
              <div className="flex flex-col gap-3">
                <ChapterLabel>{chapter.years}</ChapterLabel>
                <Heading as="h3" className="text-foreground -mt-1">
                  {chapter.title}
                </Heading>
                <div className="text-muted-foreground flex flex-col gap-4 text-[0.9375rem] leading-relaxed">
                  {chapter.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* The bead sits on the rail level with the chapter's title. */}
              <div className="lg:col-start-2 lg:row-start-1 lg:mt-[1.75rem] lg:justify-self-center">
                <ChapterMark />
              </div>

              {/* A flex row from `lg` so the picture is pushed to the right edge by
                  layout, not by `justify-self` on a block child, which only some
                  browsers honour. */}
              {chapter.aside ? (
                <div className="lg:col-start-3 lg:row-start-1 lg:mt-6 lg:flex lg:justify-end">
                  {chapter.aside}
                </div>
              ) : null}
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
