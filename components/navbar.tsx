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

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <Section innerClassName="py-6 sm:py-8">
      <nav className="grid grid-cols-[1fr_auto] items-center gap-4">
        <Link
          href="/"
          {...hoverSfx()}
          // justify-self-start, or the grid stretches this across the whole 1fr
          // column: 500-odd pixels of empty strip that still navigate home and
          // still fire the hover tick.
          className="font-display text-foreground col-start-1 row-start-1 justify-self-start text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
        >
          {SITE.name}
        </Link>

        <div className="col-span-2 row-start-2 flex items-center gap-4 sm:col-span-1 sm:col-start-1">
          {LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
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

        {/* Beside the name on a phone, where the links row needs the full width;
            spanning both rows once there is room, so it centres on the block.
            row-end rather than row-span: row-span sets grid-row-start too, and
            would fight row-start-1. 2.72:1 viewBox, so the widths hold that ratio. */}
        <Signature className="text-muted-foreground col-start-2 row-start-1 h-10 w-27 shrink-0 sm:row-end-3 sm:h-12 sm:w-33" />
      </nav>
    </Section>
  );
};
