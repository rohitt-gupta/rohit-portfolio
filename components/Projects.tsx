import React from 'react'
import SectionHeading from './SectionHeading'
import { projectsData } from '@/lib/data'
import Project from './Project'

function Projects() {
  return (
    <section id='projects' className='scroll-mt-28'>
      <SectionHeading>
        My projects
      </SectionHeading>

      <div>
        {
          projectsData.map((project, index) => (
            <React.Fragment key={index}>

              <Project {...project} />
            </React.Fragment>
          ))
        }
      </div>
    </section>
  )
}

export default Projects

