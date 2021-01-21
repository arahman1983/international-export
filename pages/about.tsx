import { useRouter } from 'next/router'
import HEAD from 'next/head'
import React, { useEffect, useState } from 'react'
import { Layout, DetailsPage, InnerHeader } from '../components'

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

function AboutComp({about}) {
  const router = useRouter();
  //let lang = 
  let lang = router.query.lang
  if(typeof(Storage) !== "undefined"){
    lang =  localStorage.getItem('lang')
   }
  const [aboutDetails, setAboutDetails] = useState({
    title: about.title,
    description: about.description,
    details: about.details,
    image: about.image,
    keyWords: about.keyWords
  })

  useEffect(() => {
   if(lang === 'ar'){
    setAboutDetails({
      title: about.title_ar,
      description: about.description_ar,
      details: about.details_ar,
      image: about.image,
      keyWords: about.keyWords
    })
   }else{
    setAboutDetails({
      title: about.title,
      description: about.description,
      details: about.details,
      image: about.image,
      keyWords: about.keyWords
    })
   }
  }, [lang])

  return (
    <Layout>
      <HEAD>
        <title>{aboutDetails.title}</title>
        <meta property="og:title" content={aboutDetails.title} key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={aboutDetails.details}/>
        <meta name="keywords" content={aboutDetails.keyWords}/>
      </HEAD>
      <InnerHeader image="/images/sliderA.jpg" />
      <DetailsPage details={aboutDetails}/>
    </Layout>
  )
}


export async function getServerSideProps() {
  
  const res = await fetch(`${process.env.URL_ROOT}/api/about/about`)
  const about = await res.json()
  return {
    props: {
      about: about ? {...about[0]} : {}
    },
  }
}


export default AboutComp