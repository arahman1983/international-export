import { useState, useEffect } from 'react'
import {LanguageProvider} from '../locals/langProvider'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Loader } from '../components'


function MyApp({ Component, pageProps, brands, categories }) {
  const Router = useRouter()
  
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  console.log("brands", categories)

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



export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

  return {
    props: {
      brands: [
        {
          id: "1",
          name: "Toyota",
          image: "/images/toyota.png"
        },
        {
          id: "2",
          name: "Renault",
          image: "/images/rino.png"
        },
        {
          id: "3",
          name: "Hundy",
          image: "/images/huy.png"
        },
        {
          id: "4",
          name: "BYD",
          image: "/images/byd.png"
        },
        {
          id: "5",
          name: "BMW",
          image: "/images/bmw.png"
        }
      ],
      categories: [
        {
          id: "1",
          name: "Wheels"
        },
        {
          id: "2",
          name: "lamps"
        }
      ]
    },
  }
}
