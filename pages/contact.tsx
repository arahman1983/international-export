import { useState } from 'react'
import { Layout, ContactForm, InnerHeader } from '../components'

export default function ContactUs(){
  return(
    <Layout>
      <div className="container">
        <InnerHeader/>
      </div>
      <div className="container" style={{marginTop: '-80px'}}>
        <div className="row">
          <div className="col-md-6">

          </div>
          <div className="col-md-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}