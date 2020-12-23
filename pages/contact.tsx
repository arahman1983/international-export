import { Layout, ContactForm, InnerHeader, ContactInfo } from '../components'

export default function ContactUs({ contactInfo }) {
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


export async function getStaticProps() {
  //const res = await fetch('https://.../posts')
  //const about = await res.json()

  return {
    props: {
      contactInfo: {
        address: "15 building name, Street Name, Town, Country",
        phone: ["010-202-3555", "010-202-3500"],
        email: ["info@international-expo.com"],
      },
    },
  }
}