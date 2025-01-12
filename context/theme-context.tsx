"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
type ThemeContextProviderProps = {
	children: React.ReactNode;
};
function ThemeContextProvider({ children }: ThemeContextProviderProps) {
	const [theme, setTheme] = useState<Theme>("light");

	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
			window.localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
			window.localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
		}
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme") as Theme | null;

		if (localTheme) {
			setTheme(localTheme);
			if (localTheme === "dark") {
				document.documentElement.classList.add("dark");
			}
		} else {
			// Check system preference
			const systemPrefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			setTheme(systemPrefersDark ? "dark" : "light");
			if (systemPrefersDark) {
				document.documentElement.classList.add("dark");
				window.localStorage.setItem("theme", "dark");
			}
		}
	}, []);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeContextProvider;

export function useTheme() {
	const context = useContext(ThemeContext);

	if (context === null) {
		throw new Error(
			"useActiveSectionContext must be used within an ActiveSectionContextProvider"
		);
	}

	return context;
}
