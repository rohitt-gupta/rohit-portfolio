/** Single source of truth for everything personal. Edit here, the whole site follows. */

export const SITE_URL = "https://rohitt.in";

export const SITE = {
  name: "Rohit Gupta",
  firstName: "Rohit",
  handle: "whyrohitwhy",
  role: "Full-stack developer",
  location: "Vienna, Austria",
  title: "Rohit Gupta - Full-stack developer",
  description:
    "Full-stack developer working with TypeScript, React, Next.js, Vue and React Native. I like building things for the web and shipping them.",
  email: "pta.rohit28@gmail.com",
  avatar: "/pic1.jpeg",
  /**
   * The stack the avatar on the home page cycles through. Every photo here joins
   * the click-to-cycle rotation; add one and the toy picks it up.
   *
   * Hand these over whole. The toy sizes its tile to each photo's own ratio and
   * shows all of it, so a portrait phone photo comes out portrait rather than
   * having its middle enlarged to fill a square — which is what pre-cropping
   * them to 640 squares did, and why the face used to arrive so close.
   *
   * `width` and `height` are the file's intrinsic pixels and are only used for
   * that ratio, the same way `lib/projects.ts` carries them for the work shots.
   * Framing is still worth thinking about — at 128px a full-body shot is a
   * person-shaped smudge — but that is a reason to pick a closer photo, not to
   * crop a wide one.
   */
  photos: [
    // The garden shot opens the rotation. It is the one whose 640 crop happens to
    // be framed well anyway, so the photo the page loads with is not one of the
    // close ones. It also gets `priority`, being first.
    { src: "/me-garden.jpg", width: 640, height: 640 },
    { src: "/pic1.jpeg", width: 2316, height: 3088 },
    { src: "/pic4.jpg", width: 678, height: 628 },
    // TODO: these two are baked 640px centre-crops of taller photos, so they still
    // read as a zoom no matter what the toy does with them. Replace each with the
    // original and update the numbers here.
    { src: "/me-rooftop.jpg", width: 640, height: 640 },
    { src: "/me-street.jpg", width: 640, height: 640 },
  ],
  resume: "https://drive.google.com/file/d/1-1LW0ArT3ujaIBx0Le7zKQ_IEimRCxuA/view?usp=sharing",
  github: "rohitt-gupta",
  socials: {
    github: "https://github.com/rohitt-gupta",
    linkedin: "https://www.linkedin.com/in/rohit-gupta28/",
    x: "https://x.com/whyrohitwhy",
    // TODO: add `instagram` here and it shows up in the footer + CTA automatically.
    // TODO: add `cal` (https://cal.com/…) here to switch the CTA's primary button to booking.
  },
  repo: "https://github.com/rohitt-gupta/rohit-portfolio",
} as const;
