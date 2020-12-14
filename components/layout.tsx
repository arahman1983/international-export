import Head from 'next/head'
import {Header, Footer} from "../components"
import {LanguageProvider} from '../locals/langProvider'
import useTranslation from "../locals/localHook"

export default function Layout({ children }) {  
  return (
    <LanguageProvider>
      <Head>
        <title>International Export</title>
        <link rel="icon" href="/fav.png" />
      </Head>
      <div className="w-100" >
        <Header />
      </div>
      {children}
      <Footer/>
    </LanguageProvider>
  )
}