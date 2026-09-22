"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { DottedUnderline } from "@/components/dotted-underline";
import { Section } from "@/components/section";
import { Signature } from "@/components/signature";
import { hoverSfx } from "@/lib/sfx";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Work", href: "/work" },
  { title: "Blog", href: "/blog" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Two rules that cross. Transform only, so the turn stays on the compositor. */
const MenuGlyph = ({ open }: { open: boolean }) => (
  <span aria-hidden className="relative block size-4">
    <span
      className={cn(
        "absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-300 ease-out",
        open ? "rotate-45" : "-translate-y-[3px]",
      )}
    />
    <span
      className={cn(
        "absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-300 ease-out",
        open ? "-rotate-45" : "translate-y-[3px]",
      )}
    />
  </span>
);

export const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const menuId = React.useId();

  // Escape closes it, the way any other disclosure would.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Section
      // Sticky only on a phone, where the menu behind the toggle is the only way
      // to get around and scrolling back up to reach it is the whole cost. From
      // `sm` the links are always on screen, so it goes back to scrolling away.
      //
      // Needs a ground of its own once it floats, or the page runs underneath
      // it. z-30 sits above the page and below both the booking pill and the
      // skip link, which has to stay reachable over the top of it.
      className="bg-background sticky top-0 z-30 sm:static"
      // The `sm:` repeat is not redundant: Section's own default is
      // `py-10 sm:py-14`, and tailwind-merge only drops a class this one
      // actually conflicts with. Passing `py-4` alone leaves `sm:py-14`
      // standing, which is exactly how the tablet header reached 56px.
      innerClassName="py-4 sm:py-4 lg:py-6"
    >
      <nav className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0 sm:gap-y-4">
        {/* Dropped on a phone, where the signature says the same name in the
            same hand and the menu carries Home.

            justify-self-start, or the grid stretches this across the whole 1fr
            column: 500-odd pixels of empty strip that still navigate home and
            still fire the hover tick. */}
        <Link
          href="/"
          {...hoverSfx()}
          className="font-display text-foreground col-start-1 row-start-1 hidden justify-self-start text-xl font-semibold tracking-[-0.03em] sm:block sm:text-2xl"
        >
          {SITE.name}
        </Link>

        {/* Leads on a phone, standing in for the name it is; moves to the right
            and spans both rows once the name appears, so it centres on the
            block. row-end rather than row-span: row-span sets grid-row-start
            too, and would fight row-start-1. 2.72:1 viewBox, so the widths hold
            that ratio. */}
        <Link
          href="/"
          aria-label={SITE.name}
          {...hoverSfx()}
          className="col-start-1 row-start-1 justify-self-start sm:col-start-2 sm:row-start-1 sm:row-end-3 sm:justify-self-end"
        >
          <Signature className="text-muted-foreground h-10 w-27 shrink-0 sm:h-12 sm:w-33" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          {...hoverSfx()}
          className="text-muted-foreground hover:text-foreground col-start-2 row-start-1 cursor-pointer justify-self-end p-1 transition-colors sm:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <MenuGlyph open={open} />
        </button>

        {/* A phone collapses this behind the menu; from `sm` it is simply the
            second row and the toggle is gone.

            max-height rather than the grid-rows 0fr/1fr trick, which collapses
            reliably but would not expand again here: the panel stuck at zero on
            the way open. A cap comfortably above one row of links costs nothing
            and animates both ways. All of it is CSS, so the `sm:` variants land
            later in the sheet than the state classes and hold the panel open
            without an important flag or a media query in JavaScript.

            Visibility rides the same transition, which keeps the links on
            screen while the panel closes rather than having them vanish a beat
            early, and is what takes them out of the tab order once it is shut. */}
        <div
          id={menuId}
          className={cn(
            "col-span-2 row-start-2 overflow-hidden transition-[max-height,opacity,visibility] duration-300 ease-out",
            open ? "visible max-h-24 opacity-100" : "invisible max-h-0 opacity-0",
            "sm:visible sm:col-span-1 sm:col-start-1 sm:max-h-none sm:overflow-visible sm:opacity-100",
          )}
        >
          <div>
            <div className="flex items-center gap-4 pt-4 sm:pt-0">
              {LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    {...hoverSfx()}
                    className={cn(
                      "font-secondary group relative text-[0.9375rem] transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.title}
                    <DottedUnderline
                      className={cn(
                        "mask-x-from-90% transition-opacity duration-300",
                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </Section>
  );
};
