"use client";
import { motion } from "motion/react";
import React from "react";

import { SITE } from "@/lib/site";

import Container from "./container";
import { LinkPreview } from "./link-preview";

export const Footer = () => {
  return (
    <Container className="pb-10">
      <footer className="my-8 flex flex-col items-center gap-4">
        <Monogram />
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-foreground/40 text-center text-sm text-balance">
            Built by yours truly. Here&apos;s the <LinkPreview url={SITE.repo}>code</LinkPreview>.
          </p>
          <p className="text-foreground/40 text-center text-sm text-balance">
            Design heavily inspired by{" "}
            <LinkPreview url="https://manuarora.in">Manu Arora</LinkPreview>
          </p>
        </div>
      </footer>
    </Container>
  );
};

/** Hand-drawn "RG" monogram that draws itself into view. */
const Monogram = () => {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: {
      pathLength: { duration: 2, ease: "easeInOut" as const, delay },
      opacity: { duration: 0.2, delay },
    },
  });

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 70"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-foreground/70 mx-auto h-10"
      aria-label={SITE.name}
      role="img"
    >
      <motion.path
        d="M14 58 C16 42 17 26 19 13 C31 9 45 12 45 24 C45 34 31 37 21 35 C31 41 39 49 49 58"
        {...draw(0)}
      />
      <motion.path
        d="M104 22 C100 10 80 6 70 16 C60 26 60 44 72 51 C82 57 95 52 98 42 C99 38 99 35 99 34 L85 34"
        {...draw(0.5)}
      />
    </motion.svg>
  );
};
