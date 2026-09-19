"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { DottedUnderline } from "@/components/dotted-underline";
import { Section } from "@/components/section";
import { Signature } from "@/components/signature";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { title: "Home", href: "/" },
  { title: "Work", href: "/work" },
  { title: "About", href: "/about" },
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
      <nav className="flex flex-col gap-4">
        {/* Signature sits on the name's line, not beside the whole block — the nav
            links are wide enough on a phone to leave it nowhere else to go. */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-foreground text-xl font-semibold tracking-[-0.03em] sm:text-2xl"
          >
            {SITE.name}
          </Link>

          {/* 2.72:1 viewBox — these widths hold that ratio so nothing letterboxes. */}
          <Signature className="text-muted-foreground h-10 w-27 shrink-0 sm:h-12 sm:w-33" />
        </div>

        <div className="flex items-center gap-4">
          {LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
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
      </nav>
    </Section>
  );
};
