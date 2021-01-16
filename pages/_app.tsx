import { useState, useEffect } from 'react'
import {LanguageProvider} from '../locals/langProvider'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Loader } from '../components'

function MyApp({ Component, pageProps }) {
  const Router = useRouter()
  
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    Router.events.on('routeChangeStart', ()=> setIsLoaded(false))
    Router.events.on('routeChangeComplete', ()=> setIsLoaded(true))

    return () => {
      Router.events.off('routeChangeStart', ()=> setIsLoaded(false))
    }
  }, [])

  return isLoaded ? (
    
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    
      ) : <Loader />
}

export default MyApp
