import { useRouter } from 'next/router';
import { Layout, ContactForm, InnerHeader, ContactInfo } from '../components'

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

export default function ContactUs({ contact }) {
  const router = useRouter();
  //let lang = 
  let lang = router.query.lang
  if(typeof(Storage) !== "undefined"){
    lang =  localStorage.getItem('lang')
  }

  let contactInfo = lang === 'ar' ? {...contact, address: contact.address_ar} : {...contact}

  return (
    <Layout>
      <InnerHeader image="/images/aboutBg.svg" />
      <div className="container my-5">
        <div className="row mx-0">
          <div className="col-md-6">
            <ContactInfo contactInfo={contactInfo} />
          </div>
          <div className="col-md-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${process.env.URL_ROOT}/api/contact/all`)
  const contact = await res.json()

  return {
    props: {
      contact: contact ? contact[0] : {}
    },
  }
}