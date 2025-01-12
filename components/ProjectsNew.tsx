import React from "react";
import BlurFade from "./ui/blur-fade";
import { ProjectCard } from "./ProjectCard";
import { DATA } from "@/lib/new-data";

const ProjectsNew = ({ noOfProjects }: { noOfProjects?: number }) => {
	return (
		<section id='projects'>
			<div className='space-y-12 py-12 w-full'>
				<BlurFade delay={0.1}>
					<div className='flex flex-col justify-center items-center space-y-4 text-center'>
						<div className='space-y-2'>
							{/* <div className='inline-block bg-foreground px-3 py-1 rounded-lg text-background text-sm'>
									My Projects
								</div> */}
							<h2 className='font-bold text-3xl sm:text-5xl tracking-tighter'>
								Check out my latest work
							</h2>
							<p className='text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
								I&apos;ve worked on a variety of projects, from simple websites
								to complex web applications. Here are a few of my favorites.
							</p>
						</div>
					</div>
				</BlurFade>
				<div className='gap-3 grid grid-cols-1 sm:grid-cols-2 mx-auto max-w-[800px]'>
					{DATA.projects
						.slice(0, noOfProjects || DATA.projects.length)
						.map((project, id) => (
							<BlurFade key={project.title} delay={0.1 * 8 + id * 0.05}>
								<ProjectCard
									href={project.href}
									key={project.title}
									title={project.title}
									description={project.description}
									dates={project.dates}
									tags={project.technologies}
									image={project.image}
									video={project.video}
									links={project.links}
								/>
							</BlurFade>
						))}
				</div>
			</div>
		</section>
	);
};

export default ProjectsNew;
