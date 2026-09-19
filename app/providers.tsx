"use client";

import { ThemeProvider } from "next-themes";

/**
 * Light is the intended look; dark is a considered second palette rather than a
 * system default we inherit by accident. The toggle lives in the footer.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
