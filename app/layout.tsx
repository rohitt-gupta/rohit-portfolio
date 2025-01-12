import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectioContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import ThemeSwitch from "@/components/ThemeSwitch";
import ThemeContextProvider from "@/context/theme-context";

import localFont from "next/font/local";

const myFont = localFont({
	src: "./CalSans-SemiBold.woff2",
});

export const metadata = {
	title: "Rohit | Protfolio",
	description: "Rohit is a full-stack developer with 3 years of experience",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='!scroll-smooth'>
			<body
				className={`${myFont.className} bg-[#EEEDEC] max-w-3xl mx-auto text-gray-950 relative pt-28 sm:pt-36 dark:bg-[#18181B] dark:text-gray-50 dark:text-opacity-90 min-h-screen flex flex-col`}
			>
				<ThemeContextProvider>
					<ActiveSectioContextProvider>
						<Header />
						<div className='flex-grow'>{children}</div>
						<Footer />
						<Toaster position='top-right' />
					</ActiveSectioContextProvider>
					<ThemeSwitch />
				</ThemeContextProvider>
			</body>
		</html>
	);
}
