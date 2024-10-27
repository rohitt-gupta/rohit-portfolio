import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import ActiveSectioContextProvider from '@/context/active-section-context'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
import ThemeSwitch from '@/components/ThemeSwitch'
import ThemeContextProvider from '@/context/theme-context'

import localFont from "next/font/local";


const myFont = localFont({
  src: "./CalSans-SemiBold.woff2"
});
// import ThemeSwitch from '@/components/ThemeSwitch'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rohit | Protfolio',
  description: 'Rohit is a full-stack developer with 3 years of experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='!scroll-smooth'>
      <body
        className={`${myFont.className} bg-[#EEEDEC] text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 `}
      >
        {/* The below 2 divs are responsible for the background gradient color. BG is gray-50 but on the top we have 2 coloured divs. below are those divs. */}
        {/* <div className="top-[-6rem] right-[11rem] -z-10 absolute bg-[#fbe2e3] dark:bg-[#946263] blur-[10rem] rounded-full w-[31.25rem] sm:w-[68.75rem] h-[31.25rem]"></div>
        <div className="top-[-1rem] left-[-35rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] -z-10 absolute bg-[#dbd7fb] dark:bg-[#676394] blur-[10rem] rounded-full w-[50rem] sm:w-[68.75rem] h-[31.25rem]"></div> */}

        <ThemeContextProvider>
          <ActiveSectioContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position='top-right' />
          </ActiveSectioContextProvider>
          <ThemeSwitch />
        </ThemeContextProvider>

      </body>
    </html>
  )
}
