import {
  IconBadgeCcFilled,
  IconBrandDiscordFilled,
  IconLayoutKanbanFilled,
  IconMusic,
  IconPlaneTilt,
  IconShoppingCartFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

import { Box } from "./box";
import { Subheading } from "./subheading";

const iconClassName = "size-4 text-white drop-shadow-xl drop-shadow-black/40";

const workItems = [
  {
    href: "https://caption-me.vercel.app/",
    title: "Caption Me",
    description: "Upload a video, transcribe it and burn in styled captions.",
    icon: <IconBadgeCcFilled className={iconClassName} />,
    boxClassName: "",
  },
  {
    href: "https://discord-clone-rho-dun.vercel.app/",
    title: "Team Chat",
    description: "Real-time chat app with servers, channels and roles.",
    icon: <IconBrandDiscordFilled className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-indigo-400 to-indigo-600 ring-offset-indigo-500",
  },
  {
    href: "https://ecom-dashboard-five.vercel.app/",
    title: "Ecommerce Admin + Store",
    description: "Multi-store ecommerce platform with public APIs for the storefront.",
    icon: <IconShoppingCartFilled className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-emerald-400 to-emerald-600 ring-offset-emerald-500",
  },
  {
    href: "https://trello-clone-xjcj.vercel.app/",
    title: "TaskFlow",
    description: "Drag-and-drop task board backed by Appwrite.",
    icon: <IconLayoutKanbanFilled className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-orange-400 to-orange-600 ring-offset-orange-500",
  },
  {
    href: "https://www.jamandplay.com/",
    title: "Jam and Play",
    description: "Music courses platform I built for a client.",
    icon: <IconMusic className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-rose-400 to-rose-600 ring-offset-rose-500",
  },
  {
    href: "https://landing-page-tan-seven.vercel.app/",
    title: "Travel Agency",
    description: "A landing page I designed and built to sharpen my UI taste.",
    icon: <IconPlaneTilt className={iconClassName} />,
    boxClassName: "bg-linear-to-b from-sky-400 to-sky-600 ring-offset-sky-500",
  },
];

export const Work = () => {
  return (
    <div>
      <Subheading>Things I&apos;ve built</Subheading>
      <div className="mt-4 flex flex-col gap-6 md:gap-4">
        {workItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2"
          >
            <Box className={`mr-4 ${item.boxClassName}`}>{item.icon}</Box>
            <p className="text-foreground shrink-0 font-medium">{item.title}</p>
            <div className="hidden size-1 rounded-full bg-neutral-200 md:block"></div>
            <p className="text-foreground/70">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
