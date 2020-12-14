import { useState, useEffect } from 'react'
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
      Router.events.on('routeChangeStart', ()=> setIsLoaded(true))
    }
  }, [])

  return isLoaded ? <Component {...pageProps} /> : <Loader />
}

export default MyApp
