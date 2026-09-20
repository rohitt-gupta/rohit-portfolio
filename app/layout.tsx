import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SITE, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import Providers from "./providers";

/** Headings. The face from gentlejoseph.com. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

/** Eyebrows, labels and buttons. The face from ozzyx.xyz. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s – ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        bricolage.variable,
        spaceGrotesk.variable,
        GeistSans.variable,
        GeistMono.variable,
      )}
      suppressHydrationWarning
    >
      {/* Extensions (password managers, colour pickers, …) inject attributes onto
          <body> before React hydrates, so suppress the resulting mismatch warning. */}
      <body suppressHydrationWarning>
        <Providers>
          <a
            href="#main"
            className="bg-background focus:ring-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
