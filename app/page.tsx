import IntroHeader from "@/components/IntroHeader";
import ProjectsNew from "@/components/ProjectsNew";
import Link from "next/link";

export default function Home() {
	return (
		<main className='flex flex-col items-center px-4'>
			<IntroHeader />
			<ProjectsNew noOfProjects={4} />
			<div className='flex justify-center items-center'>
				<Link
					href='/work'
					className='flex items-center mx-auto my-4 px-4 py-2 rounded-md font-medium text-gray-900 text-sm dark:text-gray-100'
				>
					See More
					<svg
						className='ml-1 w-4 h-4'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</Link>
			</div>
		</main>
	);
}
