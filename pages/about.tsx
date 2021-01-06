import { NextPageContext } from 'next'
import { Layout, DetailsPage, InnerHeader } from '../components'
import { withTranslation, Link } from '../i18n'

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

function AboutComp({about}) {
  return (
    <Layout>
      <InnerHeader image="/images/sliderA.jpg" />
      <DetailsPage details={about}/>
    </Layout>
  )
}

export async function getStaticPaths() {
  return { paths:[
      { params: { lang: "en" } },
      { params: { lang: "ar" } },
  ], fallback: false }
}

export async function getStaticProps(context) {
  let lang = await context.locale
  console.log(lang)
  const res = await fetch(`${process.env.URL_ROOT}/api/about/about?lang=${lang ? lang : 'en'}`)
  const about = await res.json()
  return {
    props: {
      about: {...about[0]}
    },
  }
}


export default withTranslation('AboutComp')(AboutComp) 