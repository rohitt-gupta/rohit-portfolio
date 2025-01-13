"use client";
import ProjectsNew from "@/components/ProjectsNew";
import { useSectionInView } from "@/lib/hooks";

export default function ProjectsPage() {
	const { ref } = useSectionInView("Work", 0.5);
	return (
		<section id='work' ref={ref} className='scroll-mt-28 mb-28'>
			<ProjectsNew />
		</section>
	);
}
