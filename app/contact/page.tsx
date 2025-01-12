"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";
import SectionHeading from "@/components/SectionHeading";
import SubmitBtn from "@/components/SubmitButton";
import Image from "next/image";
import indigoOpenBracket from "@/public/brackets/indigo-opening.svg";
import indigoCloseBracket from "@/public/brackets/indigo-closing.svg";

export default function Contact() {
	const { ref } = useSectionInView("Contact");

	return (
		<motion.section
			id='contact'
			ref={ref}
			className='mb-20 sm:mb-28 w-[min(100%,38rem)] text-center'
			initial={{
				opacity: 0,
			}}
			whileInView={{
				opacity: 1,
			}}
			transition={{
				duration: 1,
			}}
			viewport={{
				once: true,
			}}
		>
			<SectionHeading>
				<Image
					src={indigoOpenBracket}
					alt='Project I worked on'
					quality={95}
					className='w-10 h-10'
				/>
				<p className='title'>Contact me</p>
				<Image
					className='w-10 h-10'
					src={indigoCloseBracket}
					alt='Project I worked on'
					quality={95}
				/>
			</SectionHeading>

			<p className='-mt-6 text-gray-700 dark:text-white/80'>
				Please contact me directly at{" "}
				<a className='underline' href='mailto:example@gmail.com'>
					pta.rohit28@gmail.com
				</a>{" "}
				or through this form.
			</p>

			<form
				className='flex flex-col mt-10 dark:text-black'
				action={async (formData) => {
					const { error } = await sendEmail(formData);

					if (error) {
						toast.error(error);
						return;
					}

					toast.success("Email sent successfully!");
				}}
			>
				<input
					className='dark:bg-white dark:focus:bg-opacity-100 dark:bg-opacity-80 px-4 borderBlack rounded-lg h-14 transition-all dark:outline-none'
					name='senderEmail'
					type='email'
					required
					maxLength={500}
					placeholder='Your email'
				/>
				<textarea
					className='dark:bg-white dark:focus:bg-opacity-100 dark:bg-opacity-80 my-3 p-4 borderBlack rounded-lg h-52 transition-all dark:outline-none'
					name='message'
					placeholder='Your message'
					required
					maxLength={5000}
				/>
				<SubmitBtn />
			</form>
		</motion.section>
	);
}
