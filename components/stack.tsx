import {
  IconBrandCss3,
  IconBrandFramerMotion,
  IconBrandGit,
  IconBrandGraphql,
  IconBrandHeadlessui,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandOpenSource,
  IconBrandPrisma,
  IconBrandPython,
  IconBrandReact,
  IconBrandRedux,
  IconBrandTailwind,
  IconBrandTypescript,
  IconDatabase,
  IconServer2,
} from "@tabler/icons-react";
import React from "react";

import { Box } from "./box";
import { Subheading } from "./subheading";

const iconClassName = "size-4 text-white drop-shadow-xl drop-shadow-black/40";

const stack = [
  {
    title: "TypeScript",
    icon: <IconBrandTypescript className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-blue-400 to-blue-600 ring-offset-blue-500",
  },
  {
    title: "JavaScript",
    icon: <IconBrandJavascript className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-yellow-400 to-yellow-600 ring-offset-yellow-500",
  },
  {
    title: "React",
    icon: <IconBrandReact className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-cyan-400 to-cyan-600 ring-offset-cyan-500",
  },
  {
    title: "Next.js",
    icon: <IconBrandNextjs className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-neutral-500 to-neutral-800 ring-offset-neutral-700",
  },
  {
    title: "Node.js",
    icon: <IconBrandNodejs className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-green-400 to-green-600 ring-offset-green-500",
  },
  {
    title: "Express",
    icon: <IconServer2 className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-stone-400 to-stone-600 ring-offset-stone-500",
  },
  {
    title: "GraphQL",
    icon: <IconBrandGraphql className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-pink-400 to-pink-600 ring-offset-pink-500",
  },
  {
    title: "PostgreSQL",
    icon: <IconDatabase className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-sky-400 to-sky-700 ring-offset-sky-600",
  },
  {
    title: "MongoDB",
    icon: <IconBrandMongodb className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-lime-400 to-lime-600 ring-offset-lime-500",
  },
  {
    title: "Prisma",
    icon: <IconBrandPrisma className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-teal-400 to-teal-700 ring-offset-teal-600",
  },
  {
    title: "Redux",
    icon: <IconBrandRedux className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-violet-400 to-violet-600 ring-offset-violet-500",
  },
  {
    title: "Tailwind",
    icon: <IconBrandTailwind className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-teal-400 to-cyan-600 ring-offset-cyan-500",
  },
  {
    title: "Framer Motion",
    icon: <IconBrandFramerMotion className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-fuchsia-400 to-fuchsia-600 ring-offset-fuchsia-500",
  },
  {
    title: "Headless UI",
    icon: <IconBrandHeadlessui className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-indigo-400 to-indigo-600 ring-offset-indigo-500",
  },
  {
    title: "HTML",
    icon: <IconBrandHtml5 className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-orange-400 to-orange-600 ring-offset-orange-500",
  },
  {
    title: "CSS",
    icon: <IconBrandCss3 className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-blue-400 to-blue-700 ring-offset-blue-600",
  },
  {
    title: "Python",
    icon: <IconBrandPython className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-amber-400 to-amber-600 ring-offset-amber-500",
  },
  {
    title: "Git",
    icon: <IconBrandGit className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-red-400 to-red-600 ring-offset-red-500",
  },
  {
    title: "Open Source",
    icon: <IconBrandOpenSource className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-emerald-400 to-emerald-600 ring-offset-emerald-500",
  },
];

export const Stack = () => {
  return (
    <section>
      <Subheading>Things I work with</Subheading>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {stack.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            <Box className={item.boxClassName}>{item.icon}</Box>
            <p className="text-foreground text-sm font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
