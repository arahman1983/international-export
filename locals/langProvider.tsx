import { createContext, useState } from "react"

export const defaultLocal = "en"
export const locals = ["en", "ar"]
export const LanguageContext = createContext([])

export const LanguageProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<string>("en")

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  )
}