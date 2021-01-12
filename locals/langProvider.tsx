import { createContext, useState } from "react"

export const defaultLocal = "en"
export const locals = ["en", "ar"]
export const LanguageContext = createContext([])

export const LanguageProvider: React.FC = ({ children }) => {
  let lang:string;
  if(typeof(Storage) !== "undefined"){
   lang =  localStorage.getItem('lang')
  }
  const [locale, setLocale] = useState<string | undefined>(lang ? lang : "en")

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  )
}