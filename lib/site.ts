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
  /** Every photo here joins the click-to-cycle rotation in the hero. Add more, it picks them up. */
  /**
   * The stack the avatar on the home page cycles through. Square crops, 640px,
   * because the toy renders at 128 and `object-cover` would throw away
   * everything outside the square anyway. Framed head-and-shoulders on the face:
   * at 128px a full-body shot is a person-shaped smudge.
   */
  photos: ["/pic1.jpeg", "/pic4.jpg", "/me-garden.jpg", "/me-rooftop.jpg", "/me-street.jpg"],
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
