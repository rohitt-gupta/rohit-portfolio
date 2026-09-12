"use client";

import {
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconBrandX,
  IconFileTextFilled,
  IconMailFilled,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { createPortal } from "react-dom";

import { SPRING_CONFIG } from "@/lib/motion-config";
import { SITE } from "@/lib/site";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

import { Box } from "./box";
import { Subheading } from "./subheading";

const iconClassName = "size-4 text-white drop-shadow-xl drop-shadow-black/40";

type ContactItem = {
  title: string;
  description: string;
  boxClassName: string;
  skeleton: React.ReactNode;
} & ({ type: "link"; href: string } | { type: "copyEmail"; email: string });

export const GetInTouch = () => {
  const [copied, setCopied] = useState(false);
  const mounted = useMounted();

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy email", error);
    }
  };

  const items: ContactItem[] = [
    {
      title: "Email me",
      description: "Click to copy my address — I read everything.",
      type: "copyEmail",
      email: SITE.email,
      boxClassName: "bg-linear-to-b from-blue-400 to-blue-600 ring-offset-blue-500",
      skeleton: <IconMailFilled className={iconClassName} />,
    },
    {
      title: "GitHub",
      description: "Everything I build in the open lives here.",
      type: "link",
      href: SITE.socials.github,
      boxClassName: "bg-linear-to-b from-neutral-500 to-neutral-800 ring-offset-neutral-700",
      skeleton: <IconBrandGithubFilled className={iconClassName} />,
    },
    {
      title: "LinkedIn",
      description: "For work, roles and the more formal conversations.",
      type: "link",
      href: SITE.socials.linkedin,
      boxClassName: "bg-linear-to-b from-sky-400 to-sky-700 ring-offset-sky-600",
      skeleton: <IconBrandLinkedin className={iconClassName} />,
    },
    {
      title: "X / Twitter",
      description: "Where I post about what I'm building.",
      type: "link",
      href: SITE.socials.x,
      boxClassName: "bg-linear-to-b from-neutral-700 to-black ring-offset-neutral-800",
      skeleton: <IconBrandX className={iconClassName} />,
    },
    {
      title: "Résumé",
      description: "The one-page version of all of this.",
      type: "link",
      href: SITE.resume,
      boxClassName: "bg-linear-to-b from-emerald-400 to-emerald-600 ring-offset-emerald-500",
      skeleton: <IconFileTextFilled className={iconClassName} />,
    },
  ];

  const toast = (
    <AnimatePresence mode="wait">
      {copied ? <CopyAnimation key="copy-email-toast" /> : null}
    </AnimatePresence>
  );

  return (
    <section>
      <Subheading>Get in touch</Subheading>
      {mounted ? createPortal(toast, document.body) : null}
      <div className="mt-8 flex flex-col gap-6">
        {items.map((item) => {
          if (item.type === "copyEmail") {
            return (
              <button
                type="button"
                onClick={() => handleCopyEmail(item.email)}
                className="flex w-full cursor-pointer flex-col items-start gap-1 text-left md:flex-row md:items-center md:gap-2"
                key={item.title}
              >
                <Box className={cn("", item.boxClassName)}>{item.skeleton}</Box>
                <p className="text-foreground shrink-0 font-medium">{item.title}</p>
                <div className="hidden size-1 rounded-full bg-neutral-200 md:block"></div>
                <p className="text-foreground/70">{item.description}</p>
              </button>
            );
          }

          return (
            <Link
              href={item.href}
              target="_blank"
              className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2"
              key={item.title}
            >
              <Box className={cn("", item.boxClassName)}>{item.skeleton}</Box>
              <p className="text-foreground shrink-0 font-medium">{item.title}</p>
              <div className="hidden size-1 rounded-full bg-neutral-200 md:block"></div>
              <p className="text-foreground/70">{item.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

const CopyAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={SPRING_CONFIG}
      className="pointer-events-none fixed inset-x-0 bottom-20 z-200 mx-auto flex w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-b from-blue-400 to-blue-600 p-4 text-center text-white shadow-lg ring-1 shadow-black/10 ring-white/50 ring-offset-2 ring-offset-blue-500 ring-inset"
    >
      <EmailIcon /> Email copied to clipboard
    </motion.div>
  );
};

const EmailIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4 perspective-distant"
      initial={{ scale: 0.8 }}
      animate={{ scale: [0.8, 1, 1.2, 1] }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
      <motion.path
        initial={{ rotateX: 40 }}
        animate={{ rotateX: [40, 0, 40] }}
        style={{ transformOrigin: "top" }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
        d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
      />
    </motion.svg>
  );
};
