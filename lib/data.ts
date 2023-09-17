import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import ecomImg from "@/public/ecom.png";
import jamandplayImg from "@/public/jamandplay.png";
import trelloImg from "@/public/trello.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Full-Stack Developer",
    location: "Kr Mroads, Hyderabad",
    description:
      "I'm now a full-stack developer. My stack includes React, Next.js, TypeScript, Tailwind and Framer-motion.",
    icon: React.createElement(FaReact),
    date: "2022 - present",
  },
  {
    title: "Junior Software Developer",
    location: "Kr Mroads, Hyderabad",
    description:
      "Started as a front end web developer using Reactjs and Material UI. Majorly worked on bug fixing, refactoring and folder structure.",
    icon: React.createElement(CgWorkAlt),
    date: "2022(April) - 2022(Dec)",
  },
  {
    title: "Electronics Engineering",
    location: "CTAE, Udaipur",
    description:
      "I did my engineering in electronics. Secured multiple off-campus offers of job as a Software developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2018-2022",
  }
] as const;

export const projectsData = [
  {
    title: "Ecommerce: Admin and Client",
    description:
      "Full stack ecommerce app with multiple stores functionality exposing public APIs for client app. ",
    tags: ["Next.js", "Tailwind", "shad-cn", "MySQL", "Prisma", "Typescript"],
    imageUrl: ecomImg,
    projectLink: 'https://ecom-dashboard-five.vercel.app/',
    githubLink: 'https://github.com/rohitt-gupta/ecommerce-store',
  },
  {
    title: "Jam and Play",
    description:
      "Learn the art and science of creating music, with Jam and Play's comprehensive courses",
    tags: ["React", "TypeScript", "Headless UI", "Next.js", "Tailwind", "Framer-motion"],
    imageUrl: jamandplayImg,
    projectLink: 'https://www.jamandplay.com/',
    githubLink: '',
  },
  {
    title: "TaskFlow:The Trello Clone",
    description:
      "A simple yet beautiful todo app with drag ad drop functionality, backed by appwrite cloud for seamless data integration.  ",
    tags: ["React", "Next.js", "Appwrite", "Tailwind", "React-beautiful-dnd"],
    imageUrl: trelloImg,
    projectLink: 'https://trello-clone-xjcj.vercel.app/',
    githubLink: 'https://github.com/rohitt-gupta/trello-clone',
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Headless UI",
  "Express",
  "PostgreSQL",
  "Python",
  "Open Source",
  "Framer Motion",
] as const;