"use client";

/**
 * This file is copied from https://github.com/manuarora700/manuarora.in/blob/5c008756d41284503e418f8afd9445e0bdb7ebc1/components/Header.js#L14
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurImage } from "@/components/BlurImage";
import Link from "next/link";

const IntroHeader = () => {
	const [open, setOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const variants = {
		hidden: { opacity: 0, y: "1vh" },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				delayChildren: 0.1,
				staggerChildren: 0.1,
			},
		},
		// transition: { staggerChildren: 0.5 },
		exit: { opacity: 0, y: "1vh" },
	};

	const itemA = {
		hidden: { opacity: 0, scale: 0.5, y: "1vh" },
		show: { opacity: 1, scale: 1, y: 0 },
	};
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className='flex md:flex-row flex-col justify-between items-start md:space-x-14 mb-10 w-full'>
			<div className='flex flex-col mt-6 md:w-3/4'>
				<h1 className='mb-2 font-bold text-3xl text-black md:text-5xl dark:text-white tracking-tight'>
					Rohit Gupta
				</h1>

				<div className='relative flex-wrap items-center mb-5 text-zinc-700 dark:text-zinc-400 leading-7'>
					Building
					<Link
						className={
							"inline-block px-2 py-0 font-bold bg-gray-100 dark:bg-zinc-700 dark:text-white  mx-1"
						}
						href='https://x.com/alpinedotinc'
						target='__blank'
					>
						Alpine
					</Link>
					,
					<Link
						className={
							"inline-block px-2 py-0 font-bold bg-gray-100 dark:bg-zinc-700 dark:text-white mx-1"
						}
						href='https://justcollab.io'
						target='__blank'
					>
						Just Collab
					</Link>
					other
					<Link
						className={
							"inline-block px-2 py-0 font-bold bg-gray-100 dark:bg-zinc-700 dark:text-white mx-1"
						}
						href='https://github.com/rohitt-gupta'
						target='__blank'
					>
						Cool things
					</Link>
					{/* <span
						className='font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer'
						style={{ cursor: "🤩" }}
						onMouseEnter={() => setOpen(true)}
						onMouseLeave={() => setOpen(false)}
					>
						{" "}
						cool things
						{/* <AnimatePresence>
							{open && (
								<motion.div
									key='modal'
									variants={variants}
									initial='hidden'
									animate='show'
									exit='exit'
									className='z-20 absolute inset-x-0 bg-white dark:bg-zinc-800 shadow-2xl p-4 rounded-xl w-full min-h-96 text-xs md:text-sm'
								>
									<div className='[mask-image:linear-gradient(to_bottom,transparent,white,transparent)] absolute inset-0 bg-grid-slate-50 dark:bg-grid-zinc-700/30'></div>
									<motion.p variants={itemA} className='py-3 font-normal'>
										Founder{" "}
										<Hyperlink
											text='@placeholdertech'
											link='https://placeholdertech.in'
										/>{" "}
										and{" "}
										<Hyperlink
											text='@aceternity'
											link='https://aceternity.com'
										/>
									</motion.p>
									<motion.p variants={itemA} className='py-3 font-normal'>
										Mentoring{" "}
										<Hyperlink
											text='@codementor'
											link='https://codementor.io/@manuarora'
										/>{" "}
										and{" "}
										<Hyperlink
											text='@mentorcruise'
											link='https://mentorcruise.com/mentor/manuarora/'
										/>
									</motion.p>
									<motion.p variants={itemA} className='py-3 font-normal'>
										Helping front-end developers{" "}
										<Hyperlink text='@algochurn' link='https://algochurn.com' />{" "}
										and{" "}
										<Hyperlink
											text='@pixelperfect'
											link='https://app.pixelperfect.quest'
										/>
									</motion.p>
									<motion.p variants={itemA} className='py-3 font-normal'>
										Web templates and components{" "}
										<Hyperlink
											text='@tailwindmasterkit'
											link='https://tailwindmasterkit.com'
										/>
									</motion.p>
									<motion.p variants={itemA} className='py-3 font-normal'>
										Cool TailwindCSS Box Shadows{" "}
										<Hyperlink
											text='@boxshadows'
											link='https://www.manuarora.in/boxshadows'
										/>
									</motion.p>
									<motion.p variants={itemA} className='py-3 font-normal'>
										Blogs{" "}
										<Hyperlink
											text='@freecodecamp'
											link='https://www.freecodecamp.org/news/author/manu/'
										/>
									</motion.p>
									<motion.p variants={itemA} className='py-3 font-normal'>
										Tech videos and snippets{" "}
										<Hyperlink
											text='@youtube'
											link='https://www.youtube.com/@manuarora'
										/>
									</motion.p>

									<div className='[mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)] -bottom-px absolute inset-x-0 bg-slate-900/[0.1] h-px'>
										<div className='flex-none blur-[1px] w-full h-px [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]'></div>
									</div>
								</motion.div>
							)}
						</AnimatePresence> 
					</span> */}
				</div>
				<p className='text-zinc-600 dark:text-zinc-500'>
					Software Engineer passionate about building SaaS products and web
					apps. Find me on{" "}
					<Link
						href='https://x.com/whyrohitwhy'
						className='inline-flex relative font-bold font-inter dark:text-zinc-400 overflow-hidden group'
						target='__blank'
					>
						<span className='relative'>twitter</span>
					</Link>{" "}
					for tech updates.
				</p>
			</div>

			<div className='relative flex-shrink-1 order-first md:order-last p-4 md:p-4'>
				<Link
					href='https://twitter.com/mannupaaji'
					target='__blank'
					className='block relative z-[5] bg-white shadow-xl rounded ring-1 ring-slate-900/5 w-20 h-20 overflow-hidden'
				>
					<BlurImage
						className='bg-gray-100 object-cover'
						src='/avatar-new.jpeg'
					/>
				</Link>
				<div className='z-0'>
					<div className='top-0 -right-12 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)] left-0 absolute bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] h-px'></div>
					<div className='-top-8 [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)] bottom-0 left-12 absolute bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] w-px'></div>
					<div className='-right-12 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)] bottom-14 left-0 absolute bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] h-px'></div>
					<div className='-top-2 [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)] right-0 -bottom-8 absolute bg-slate-900/[0.1] dark:bg-zinc-300/[0.1] w-px'></div>
					<div className='right-10 bottom-full absolute flex items-end -mb-px h-8 overflow-hidden'>
						<div className='flex -mb-px w-40 h-[2px] -scale-x-100'>
							<div className='flex-none blur-sm w-full [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]'></div>
							<div className='flex-none blur-[1px] -ml-[100%] w-full [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IntroHeader;

export const Hyperlink = ({ link, text }: { link: string; text: string }) => {
	return (
		<a
			href={link}
			className='inline-block font-bold text-zinc-700 dark:text-zinc-200 transform transition duration-200 hover:scale-105'
			target='__blank'
		>
			{text}
		</a>
	);
};
