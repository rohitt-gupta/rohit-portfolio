"use client";
import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";

function Header() {
	const { activeSection, setActiveSection, setTimeOfLastClick } =
		useActiveSectionContext();

	return (
		<header className='relative z-[999]'>
			<motion.div
				className='top-0 sm:top-6 left-1/2 fixed border-white bg-white dark:bg-gray-950 bg-opacity-80 dark:bg-opacity-75 shadow-black/[0.03] shadow-lg backdrop-blur-[0.5rem] border dark:border-black/40 border-opacity-40 rounded-none sm:rounded-full w-full sm:w-[36rem] h-[4.5rem] sm:h-[3.25rem]'
				initial={{ y: -100, x: "-50%", opacity: 0 }}
				animate={{ y: 0, x: "-50%", opacity: 1 }}
			></motion.div>

			<nav className='top-[0.15rem] sm:top-[1.7rem] left-1/2 fixed flex py-2 sm:py-0 h-12 sm:h-[initial] -translate-x-1/2'>
				<ul className='flex flex-wrap sm:flex-nowrap justify-center items-center sm:gap-5 w-[22rem] sm:w-[initial] font-medium text-[0.9rem] text-gray-500 gay-y-1'>
					{links.map((link) => (
						<motion.li
							className='relative flex justify-center items-center h-3/4'
							initial={{ y: -100, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							key={link.hash}
						>
							<Link
								className={clsx(
									"flex justify-center items-center p-3 w-full hover:text-gray-950 dark:hover:text-gray-300 dark:text-gray-500 transition",
									{
										"text-gray-950 dark:text-gray-200":
											activeSection === link.name,
									}
								)}
								href={link.hash}
								onClick={() => {
									setActiveSection(link.name);
									setTimeOfLastClick(Date.now());
								}}
							>
								{link.name}
								{link.name === activeSection && (
									<motion.span
										className='-z-10 absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-full'
										layoutId='activeSection'
										transition={{
											type: "spring",
											stiffness: 380,
											damping: 30,
										}}
									></motion.span>
								)}
							</Link>
						</motion.li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default Header;
