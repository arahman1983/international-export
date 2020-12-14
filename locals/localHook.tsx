import { useContext } from 'react'
import { LanguageContext, defaultLocal } from './langProvider'
import { LangStrings } from './localStrings'

export default function useTranslation(){
  const [locale] = useContext(LanguageContext)
  function t(key:string){
    // if(!LangStrings[locale][key]){
    //   console.log("This key has no value in strings object")
    // }
    return LangStrings[locale][key] || LangStrings[defaultLocal][key] || ""
  }

  return {t, locale}
}
