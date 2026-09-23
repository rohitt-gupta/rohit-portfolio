import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

/**
 * The card every link to the site unfurls with, after Matt Sellers's: a burst in
 * the top corner, the name and the role at the foot, and nothing else.
 *
 * Set in Space Grotesk, the face the home page bio is in, and on the bio's own
 * device: the name in full ink at medium weight, the role dropping to muted at
 * regular weight. The colours are the light theme's tokens as hex, since Satori
 * does not read oklch.
 *
 * Only the root has one. Every page inherits it because none of them sets
 * `openGraph` of its own; a blog post does, so it points back here by URL.
 */

export const alt = `${SITE.name}, ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#fbfaf7"; // --background
const INK = "#201c19"; // --foreground
const MUTED = "#6f6b67"; // --muted-foreground

const TYPE_SIZE = 68;
/** The burst's box, at the same share of the card's width as on the reference. */
const MARK_SIZE = 44;

/**
 * The burst, traced from the reference: eight points in pairs either side of each
 * diagonal, drawn as one outline with round joins so the tips come out soft.
 */
const BURST =
  "M36.3 19.6 L55.1 3.3 L46.2 26.3 L69.2 17.4 L52.9 36.3 L69.2 55.1 L46.2 46.2 L55.1 69.2 L36.3 52.9 L17.4 69.2 L26.3 46.2 L3.3 55.1 L19.6 36.3 L3.3 17.4 L26.3 26.3 L17.4 3.3Z";

/**
 * Space Grotesk as TrueType, cut down to the characters on the card. next/font only
 * keeps WOFF2, which Satori cannot read, so this asks Google Fonts directly; without
 * a browser user agent it answers with a TTF.
 */
async function spaceGrotesk(weight: 400 | 500, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Google Fonts sent no TrueType for Space Grotesk ${weight}`);
  return fetch(url).then((res) => res.arrayBuffer());
}

export default async function OpenGraphImage() {
  const [medium, regular] = await Promise.all([
    spaceGrotesk(500, SITE.name),
    spaceGrotesk(400, SITE.role),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 66,
          background: PAPER,
          fontFamily: "Space Grotesk",
        }}
      >
        <svg
          width={MARK_SIZE}
          height={MARK_SIZE}
          viewBox="0 0 72.5 72.5"
          fill="none"
          stroke={INK}
          strokeWidth={6.64}
          strokeLinejoin="round"
        >
          <path d={BURST} />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: TYPE_SIZE,
            lineHeight: 1.25,
            letterSpacing: -0.02 * TYPE_SIZE,
          }}
        >
          <span style={{ color: INK, fontWeight: 500 }}>{SITE.name}</span>
          <span style={{ color: MUTED, fontWeight: 400 }}>{SITE.role}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Space Grotesk", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
