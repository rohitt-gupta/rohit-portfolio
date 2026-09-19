"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import React from "react";

import { useMounted } from "@/lib/use-mounted";

/**
 * Light is the default and the intended look; this is here so the dark palette is
 * reachable, not so the site has a "theme feature".
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"}
      className="text-faint hover:text-accent cursor-pointer p-1 transition-colors"
    >
      {/* Before hydration we don't know the theme, so render the sun and let it swap. */}
      {mounted && isDark ? (
        <IconSun className="size-4" stroke={1.6} aria-hidden />
      ) : (
        <IconMoon className="size-4" stroke={1.6} aria-hidden />
      )}
    </button>
  );
}
