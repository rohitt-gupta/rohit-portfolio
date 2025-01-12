"use client";

import { useRef } from "react";
import { projectsData } from "@/lib/data";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = (typeof projectsData)[number];

export default function Project({
	title,
	description,
	tags,
	imageUrl,
	projectLink,
	githubLink,
}: ProjectProps) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["0 1", "1.33 1"],
	});

	const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
	const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

	return (
		<motion.div
			ref={ref}
			style={{
				scale: scaleProgess,
				opacity: opacityProgess,
			}}
			className='mb-3 sm:mb-8 last:mb-0 sm:pb-3 group'
		>
			<section className='sm:group-even:pl-8 relative bg-gray-100 hover:bg-gray-200 dark:hover:bg-white/20 dark:bg-white/10 sm:pr-8 border border-black/5 rounded-lg max-w-[42rem] sm:h-[24rem] dark:text-white transition overflow-hidden'>
				<div className='sm:group-even:ml-[18rem] flex flex-col px-5 pt-4 sm:pt-10 sm:pr-2 pb-7 sm:pl-10 sm:max-w-[50%] h-full'>
					<h3 className='font-semibold text-2xl'>{title}</h3>

					<p className='mt-2 text-gray-700 dark:text-white/70 leading-relaxed'>
						{description}
					</p>

					<ul className='flex flex-wrap gap-2 mt-4 sm:mt-6'>
						{tags.map((tag, index) => (
							<li
								className='bg-black/[0.7] px-3 py-1 rounded-full text-[0.7rem] text-white dark:text-white/70 uppercase tracking-wider'
								key={index}
							>
								{tag}
							</li>
						))}
					</ul>

					<div className='flex justify-start items-center gap-3 my-6'>
						<a
							target='_blank'
							href={
								githubLink === ""
									? "https://github.com/rohitt-gupta"
									: githubLink
							}
							className='flex items-center gap-2 bg-gray-900 hover:bg-gray-950 px-7 py-3 rounded-lg text-white transition hover:scale-110 focus:scale-110 active:scale-105 outline-none'
						>
							Github
						</a>
						<a
							target='_blank'
							href={projectLink}
							className='flex items-center gap-2 bg-gray-900 hover:bg-gray-950 px-7 py-3 rounded-lg text-white transition hover:scale-110 focus:scale-110 active:scale-105 outline-none'
						>
							Live
						</a>
					</div>
				</div>

				<Image
					src={imageUrl}
					alt='Project I worked on'
					quality={95}
					className='group-hover:scale-[1.04] group-hover:-rotate-2 group-even:group-hover:rotate-2 group-even:right-[initial] group-even:-left-40 sm:block top-[4rem] -right-40 absolute hidden shadow-2xl rounded-t-lg w-[28.25rem] transition group-hover:-translate-x-3 group-hover:translate-y-3 group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3'
				/>
			</section>
		</motion.div>
	);
}
