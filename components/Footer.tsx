import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<footer className='mb-10 px-4 text-center text-gray-500'>
			<small className='block mb-2 text-xs'>
				&copy; 2025 Rohit Gupta. All rights reserved.
			</small>
			<p className='text-xs'>
				{/* <span className='font-semibold'>About this website:</span> */}
				Portfolio inspired by{" "}
				<Link
					href='https://x.com/mannupaaji'
					target='__blank'
					className="font-semibold'"
				>
					Manu Arora
				</Link>{" "}
				and{" "}
				<Link
					href='https://x.com/dillionverma'
					target='__blank'
					className='font-semibold'
				>
					Dillion
				</Link>
				.
			</p>
		</footer>
	);
}
