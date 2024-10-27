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
import profileImage from '@/public/pic1.jpeg'

function Intro() {
  const { ref } = useSectionInView("Home", 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()
  return (
    <section ref={ref} id='home' className='scroll-mt-[100rem] mb-28 sm:mb-0 max-w-[50rem] text-center'>
      <div className='flex justify-center items-center'>
        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2
            }}
          >
            <Image src={profileImage} alt='Rohit Gupta' width="192" height="192" quality="95" priority={true} className='border-[0.35rem] border-white shadow-xl rounded-full w-24 h-24 object-cover' />
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
            className='right-0 bottom-0 absolute text-4xl'>
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className='mt-4 mb-10 px-4 font-medium text-2xl sm:text-4xl !leading-[1.5]'>
        <span className="font-bold">Hello, I'm Rohit.</span> I'm a{" "}
        <span className="font-bold">full-stack developer</span> with{" "}
        <span className="font-bold">2 years</span> of experience. I enjoy
        building <span className="italic">sites & apps</span>. My focus is{" "}
        <span className="underline">React (Next.js)</span>.
      </motion.h1>

      <motion.div className='flex sm:flex-row flex-col justify-center items-center gap-4 px-4 font-medium text-lg'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}

      >
        <Link href="#contact"
          className='flex items-center gap-2 bg-gray-900 hover:bg-gray-950 px-7 py-3 rounded-full text-white group outline-none focus:scale-110 hover:scale-110 active:scale-105 transition' onClick={() => {
            setActiveSection("Contact")
            setTimeOfLastClick(Date.now());
          }}>
          Contact Me <BsArrowRight className='opacity-70 transition group-hover:translate-x-1' />
        </Link>

        <Link target='_blank' href="https://drive.google.com/file/d/13L2d9nD6PgL1GusHV6EV0OitwlAwT15R/view?usp=sharing" download={true} className='flex items-center gap-2 bg-white dark:bg-white/10 px-7 py-3 border border-black/10 rounded-full group outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer'>
          Download CV <HiDownload className='opacity-60 transition group-hover:translate-y-1' />
        </Link>
        <Link href="https://www.linkedin.com/in/rohit-gupta28/" target="_blank" className='flex items-center gap-2 bg-white dark:bg-white/10 p-4 border border-black/10 rounded-full text-gray-700 outline-none focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 dark:text-white/60 transition cursor-pointer'>
          <BsLinkedin />
        </Link>
        <Link href="https://github.com/rohitt-gupta" target="_blank" className='flex items-center gap-2 bg-white dark:bg-white/10 p-4 border border-black/10 rounded-full text-[1.35rem] text-gray-700 hover:text-gray-950 dark:text-white/60 transition cursor-pointer outline-none focus:scale-[1.15] hover:scale-[1.15] active:scale-105'>
          <FaGithubSquare />
        </Link>
      </motion.div>
    </section >
  )
}

export default Intro