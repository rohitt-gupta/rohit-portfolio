import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import ActiveSectioContextProvider from '@/context/active-section-context'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
import ThemeSwitch from '@/components/ThemeSwitch'
import ThemeContextProvider from '@/context/theme-context'
// import ThemeSwitch from '@/components/ThemeSwitch'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rohit | Personal Protfolio',
  description: 'Rohit is a full-stack developer with 2 years of experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='!scroll-smooth'>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 `}
      >
        {/* The below 2 divs are responsible for the background gradient color. BG is gray-50 but on the top we have 2 coloured divs. below are those divs. */}
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263] "></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

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
