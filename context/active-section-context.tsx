'use client'
import React, { createContext, useContext, useState } from 'react'
import { links } from '@/lib/data'

type SectionName = typeof links[number]["name"]

type ActiveSectionType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>
}
export const ActiveSectionContext = createContext<ActiveSectionType | null>(null)

const ActiveSectioContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SectionName>("Home")
  return (
    <ActiveSectionContext.Provider value={{
      activeSection,
      setActiveSection
    }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export default ActiveSectioContextProvider


export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error("useActiveSectionContext must be used within an ActiveSectionContextProvider");
  }

  return context
}