'use client'
import indigoOpenBracket from '@/public/brackets/blue-opening.svg'
import indigoCloseBracket from '@/public/brackets/blue-closing.svg'
import React, { useEffect } from 'react'
import SectionHeading from './SectionHeading'
import { projectsData } from '@/lib/data'
import Project from './Project'
import { useSectionInView } from '@/lib/hooks'
import Image from 'next/image'
function Projects() {
  const { ref } = useSectionInView("Projects", 0.5)
  return (
    <section id='projects' ref={ref} className='scroll-mt-28 mb-28'>
      <SectionHeading>
        <Image
          src={indigoOpenBracket}
          alt="Project I worked on"
          quality={95}
          className='w-10 h-10'
        />
        <p className="title">My projects</p>
        <Image
          className='w-10 h-10'
          src={indigoCloseBracket}
          alt="Project I worked on"
          quality={95}
        />
      </SectionHeading>

      <div className="md:grid md:grid-cols-2 md:gap-8">
        {projectsData.map((project, index) => (
          <div key={index}>
            <Project {...project} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects

