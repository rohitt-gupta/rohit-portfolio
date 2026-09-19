"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { DottedUnderline } from "@/components/dotted-underline";
import { Section } from "@/components/section";
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
      <nav className="flex flex-col items-start gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <motion.span
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="block"
          >
            <Image
              src={SITE.avatar}
              alt=""
              width={48}
              height={48}
              className="border-border aspect-square size-7 rounded-md border object-cover"
            />
          </motion.span>
          <span className="font-display text-foreground text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
            {SITE.name} <span className="text-faint font-normal">aka</span>{" "}
            <span className="font-normal italic">{SITE.handle}</span>
          </span>
        </Link>

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
