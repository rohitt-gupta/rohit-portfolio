"use client";

import { getCalApi } from "@calcom/embed-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React from "react";

import { sfx } from "@/lib/sfx";
import { CAL_LINK } from "@/lib/site";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

/**
 * The one sticky thing on the page: a pill in the bottom-right corner that opens
 * Cal.com's own booking overlay, rather than sending anyone off to another tab.
 *
 * Cal's embed is deliberately *not* loaded on mount. `embed.js` pulls a whole
 * booker behind it, and most visitors are here to read; it would be a download
 * paid by everyone for a thing almost nobody clicks. Instead the first sign of
 * intent — hovering the pill, tabbing onto it, touching it — warms it up, and the
 * click itself awaits the same promise, so a click that beats the download still
 * opens the overlay rather than doing nothing.
 */

/** One namespace, so this embed's config can't be clobbered by a second one later. */
const NAMESPACE = "book-a-call";

/**
 * The booker renders in a cross-origin iframe, so it cannot read our CSS
 * variables: `--accent` has to go over as a literal. These two are that token's
 * light and dark values (`oklch(0.58 0.15 42)` / `oklch(0.72 0.14 52)`) converted
 * to sRGB — if the accent moves in `globals.css`, re-convert and update here.
 */
const CAL_UI = {
  layout: "month_view",
  cssVarsPerTheme: {
    light: { "cal-brand": "#c15527" },
    dark: { "cal-brand": "#e8894a" },
  },
} as const;

type CalApi = Awaited<ReturnType<typeof getCalApi>>;

/** What Cal calls a theme. Spelled out here; `embed-core` isn't a direct dependency. */
type CalTheme = "light" | "dark";

export function BookACall({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  // Light is the site's default, so that's the assumption until hydration lands.
  const theme: CalTheme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  /**
   * A ref, and the promise rather than the API itself. Cal's API *is* a function,
   * and `setState(fn)` reads a function as an updater: passing it to a setter calls
   * it with the previous state, which here means firing a Cal instruction of
   * `(null)`. That lands a junk entry in the embed's queue and takes the whole
   * namespace down with it — nothing after it executes.
   */
  const cal = React.useRef<Promise<CalApi> | null>(null);
  const themeRef = React.useRef(theme);

  /** Fetches `embed.js` exactly once, whichever signal of intent got here first. */
  const warm = React.useCallback(() => {
    cal.current ??= getCalApi({ namespace: NAMESPACE }).then((api) => {
      api("ui", { ...CAL_UI, theme: themeRef.current });
      // Build the iframe now, while the pointer is still on its way to the pill,
      // so the click itself has nothing left to wait for.
      api("preload", { calLink: CAL_LINK, type: "modal" });
      return api;
    });
    return cal.current;
  }, []);

  React.useEffect(() => {
    themeRef.current = theme;
    // Resent on every theme change, so the footer's toggle carries into an overlay
    // that is already open rather than only the next one. Nothing to do if the
    // embed hasn't been asked for yet; `warm` reads the ref above when it lands.
    void cal.current?.then((api) => api("ui", { ...CAL_UI, theme }));
  }, [theme]);

  const open = async () => {
    const api = await warm();
    api("modal", { calLink: CAL_LINK });
  };

  return (
    <button
      type="button"
      onClick={open}
      onFocus={() => void warm()}
      onTouchStart={() => void warm()}
      onPointerEnter={(event) => {
        // Touch fires this on tap, where the hover tick is just a click sound
        // arriving early. Same rule as `hoverSfx`, which can't be spread here
        // because this element needs the enter event for warming too.
        if (event.pointerType !== "touch") sfx.tick();
        void warm();
      }}
      aria-haspopup="dialog"
      className={cn(
        "font-secondary bg-foreground text-background hover:bg-accent fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex cursor-pointer items-center gap-2 rounded-full py-3 pr-4.5 pl-4 text-[0.8125rem] font-medium shadow-[0_6px_24px_-6px_var(--well-shadow)] transition-colors duration-200 sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <IconCalendarEvent className="size-4" stroke={1.6} aria-hidden />
      Book a call
    </button>
  );
}
