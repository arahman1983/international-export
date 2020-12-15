import { useState } from 'react'
import { Layout, ContactForm, InnerHeader, ContactInfo } from '../components'

export default function ContactUs(){
  return(
    <Layout>
      <InnerHeader image="/images/aboutBg.svg"/>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ContactInfo/>
          </div>
          <div className="col-md-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}