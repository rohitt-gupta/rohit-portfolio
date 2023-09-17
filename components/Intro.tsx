'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BsArrowRight, BsLinkedin } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import { FaGithubSquare } from 'react-icons/fa'
import { useActiveSectionContext } from '@/context/active-section-context'
import { useSectionInView } from '@/lib/hooks'
import profileImage from '@/public/pic4.jpg'

function Intro() {
  const { ref } = useSectionInView("Home", 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()
  return (
    <section ref={ref} id='home' className='mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]'>
      <div className='flex items-center justify-center'>
        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2
            }}
          >
            <Image src={profileImage} alt='Rohit Gupta' width="192" height="192" quality="95" priority={true} className='h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl' />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              duration: 0.7,
              stiffness: 125,
              delay: 0.1,
            }}
            className='absolute bottom-0 right-0 text-4xl'>
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl'>
        <span className="font-bold">Hello, I'm Rohit.</span> I'm a{" "}
        <span className="font-bold">full-stack developer</span> with{" "}
        <span className="font-bold">2 years</span> of experience. I enjoy
        building <span className="italic">sites & apps</span>. My focus is{" "}
        <span className="underline">React (Next.js)</span>.
      </motion.h1>

      <motion.div className='flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}

      >
        <Link href="#contact"
          className='group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 outline-none rounded-full focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition' onClick={() => {
            setActiveSection("Contact")
            setTimeOfLastClick(Date.now());
          }}>
          Contact Me <BsArrowRight className='opacity-70 group-hover:translate-x-1 transition' />
        </Link>

        <a href="/Resume.pdf" download={true} className='group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer border border-black/10 dark:bg-white/10'>
          Download CV <HiDownload className='opacity-60 group-hover:translate-y-1 transition' />
        </a>
        <a href="https://www.linkedin.com/in/rohit-gupta28/" target="_blank" className='bg-white text-gray-700 p-4 flex items-center gap-2 rounded-full outline-none focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950  active:scale-105 transition dark:bg-white/10 dark:text-white/60 cursor-pointer border border-black/10'>
          <BsLinkedin />
        </a>
        <a href="https://github.com/rohitt-gupta" target="_blank" className='bg-white text-gray-700 dark:bg-white/10 dark:text-white/60 p-4 flex items-center gap-2 rounded-full text-[1.35rem] outline-none focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer border border-black/10'>
          <FaGithubSquare />
        </a>
      </motion.div>
    </section >
  )
}

export default Intro