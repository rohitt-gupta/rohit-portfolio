import { IconBrandReact, IconCode, IconSchool } from "@tabler/icons-react";
import React from "react";

import { Box } from "./box";
import { Subheading } from "./subheading";

const iconClassName = "size-4 text-white drop-shadow-xl drop-shadow-black/40";

const experience = [
  {
    title: "Full-Stack Developer",
    company: "KrMroads, Hyderabad",
    date: "2022 — present",
    description:
      "Building product end to end with React, Next.js, TypeScript, Tailwind and Framer Motion.",
    icon: <IconBrandReact className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-cyan-400 to-cyan-600 ring-offset-cyan-500",
  },
  {
    title: "Junior Software Developer",
    company: "KrMroads, Hyderabad",
    date: "Apr 2022 — Dec 2022",
    description:
      "Started on the front-end with React and Material UI. Mostly bug fixing, refactoring and untangling folder structure.",
    icon: <IconCode className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-violet-400 to-violet-600 ring-offset-violet-500",
  },
  {
    title: "Electronics Engineering",
    company: "CTAE, Udaipur",
    date: "2018 — 2022",
    description:
      "Studied electronics, wrote a lot of code on the side, and picked up multiple off-campus software offers.",
    icon: <IconSchool className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-amber-400 to-amber-600 ring-offset-amber-500",
  },
];

export const Experience = () => {
  return (
    <section>
      <Subheading>Where I&apos;ve been</Subheading>
      <div className="mt-6 flex flex-col gap-6">
        {experience.map((item) => (
          <div key={item.title + item.date} className="flex flex-col">
            <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
              <Box className={item.boxClassName}>{item.icon}</Box>
              <p className="text-foreground shrink-0 font-medium">{item.title}</p>
              <div className="hidden size-1 rounded-full bg-neutral-200 md:block"></div>
              <p className="text-foreground/70 shrink-0">{item.company}</p>
              <p className="text-foreground/50 font-mono text-xs font-light md:ml-auto">
                {item.date}
              </p>
            </div>
            <p className="text-foreground/70 mt-2 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
