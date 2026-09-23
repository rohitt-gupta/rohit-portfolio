/** Single source of truth for everything personal. Edit here, the whole site follows. */

export const SITE_URL = "https://rohitt.in";

export const SITE = {
  name: "Rohit Gupta",
  firstName: "Rohit",
  handle: "whyrohitwhy",
  role: "Product engineer",
  location: "Vienna, Austria",
  title: "Rohit Gupta — Product engineer",
  description:
    "Product engineer working end to end with TypeScript, React, Next.js, Vue and React Native. I like building things for the web and shipping them.",
  email: "pta.rohit28@gmail.com",
  avatar: "/pic1.jpeg",
  /**
   * The stack the avatar on the home page cycles through. Every photo here joins
   * the click-to-cycle rotation; add one and the toy picks it up.
   *
   * Hand these over whole, at the original ratio, and say where the subject is.
   * `focus` is a CSS object-position: the point a crop keeps when the frame is a
   * different shape from the photo. The toy fills its square with every photo and
   * crops around it; the about page prints crop to 2:3 around it. Top for a
   * portrait of a person, since losing feet beats losing a face; for a landscape,
   * wherever the face is. Pre-cropping to 640 squares was the old way of doing
   * this, and is why two of these still arrive too close.
   *
   * `width` and `height` are the file's intrinsic pixels, the same way
   * `lib/projects.ts` carries them for the work shots. Framing is still worth
   * thinking about — at 128px a full-body shot is a person-shaped smudge — but
   * that is a reason to pick a closer photo, not to bake a crop.
   */
  photos: [
    // The garden shot opens the rotation. It is the one whose 640 crop happens to
    // be framed well anyway, so the photo the page loads with is not one of the
    // close ones. It also gets `priority`, being first.
    { src: "/me-garden.jpg", width: 640, height: 640, focus: "50% 50%" },
    { src: "/pic1.jpeg", width: 2316, height: 3088, focus: "50% 0%" },
    // Thumbs up in the office. Landscape: the focus sits on the right-hand half,
    // where the face and the thumb are, and the about page print widens its frame.
    { src: "/me-office.jpg", width: 1400, height: 788, focus: "56% 50%" },
    // TODO: this one is a baked 640px centre-crop of a taller photo, so it still
    // reads as a zoom no matter what the toy does with it. Replace it with the
    // original and update the numbers here.
    { src: "/me-rooftop.jpg", width: 640, height: 640, focus: "50% 50%" },
    // The glasses shot is the whole 9:16 frame, downsized to 1200px. The focus is a
    // little above centre so a square crop keeps the hair and the chin both. A new
    // name rather than overwriting the old square crop, because the image optimiser
    // caches by URL for hours and would have kept serving the crop.
    { src: "/me-glasses.jpg", width: 675, height: 1200, focus: "50% 20%" },
  ],
  resume: "https://drive.google.com/file/d/1k9ID7NkeOVhZaXhASm7GZzmtSoqxm12m/view?usp=sharing",
  github: "rohitt-gupta",
  socials: {
    github: "https://github.com/rohitt-gupta",
    linkedin: "https://www.linkedin.com/in/rohit-gupta28/",
    x: "https://x.com/whyrohitwhy",
    // TODO: add `instagram` here and it shows up in the footer + CTA automatically.
    /**
     * Booking. The full URL, so it stays a link anyone can click or paste; the
     * embed wants the slug on its own and `CAL_LINK` below peels it off.
     */
    cal: "https://cal.com/rohit.gupta/quick-chat-w-rohit",
  },
  repo: "https://github.com/rohitt-gupta/rohit-portfolio",
} as const;

/**
 * `rohit.gupta/quick-chat-w-rohit` — the same booking page as `SITE.socials.cal`, in
 * the form Cal's embed takes. Derived rather than written out twice, so changing the
 * URL above is the only edit needed.
 */
export const CAL_LINK = SITE.socials.cal
  .replace(/^https?:\/\/(app\.)?cal\.com\//, "")
  .replace(/\/+$/, "");
