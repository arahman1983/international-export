import Head from 'next/head'
import { Header, Footer } from "../components"

export default function Layout({ children }) {

  return (
    <>
      <Head>
        <title>International Export</title>
        <link rel="icon" href="/fav.png" />
      </Head>
      <div className="w-100">
        <Header />
      </div>
      <div style={{minHeight: '80vh'}}>
        {children}
      </div>
      <Footer/>
      </>
  )
}