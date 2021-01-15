import { useState, useEffect } from 'react'
import {LanguageProvider} from '../locals/langProvider'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Loader } from '../components'
import RUM from 'next-rum';

/**
 * Implement your custom tracker/analytics here to receive the RUM data.
 *
 * @param {String} url The URL that we navigated to.
 * @param {Object} rum The measured navigation data.
 * @private
 */
function navigated(url, rum) {
  console.log('the page has navigated to', url, rum);
}

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
    <RUM navigated={ navigated }>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </RUM>
      ) : <Loader />
}

export default MyApp
