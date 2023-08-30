"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About", 0.75)
  return (
    <motion.section
      ref={ref}
      id="about"
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About Me</SectionHeading>

      <p className="mb-3">
        Upon completing my <span className="font-medium">Electronics Engineering</span>, degree, I opted to follow my enthusiasm for programming. I embarked on a journey of acquiring knowledge in full-stack web development through YouTube tutorials and documentation. The facet of programming that resonates with me the most is the art of troubleshooting and finding resolutions. The gratification derived from unraveling complex problems is truly exhilarating. In my toolkit, I rely on {" "}        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span> as the foundational technologies. Additionally, I possess familiarity with TypeScript and Prisma. I maintain a perpetual eagerness to explore novel technological advancements.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, you'll find me immersed in anime, badminton matches, and PUBG conquests. <span className="font-medium">Learning is my ongoing pleasure</span>, currently focused on delving into the intricate world of backend architecture and the patterns that guide system design. And would you believe it, I'm even mastering the art of playing the guitar.
      </p>
    </motion.section >
  );
}