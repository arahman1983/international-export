import fetch from 'node-fetch'
const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async ({ name, email, message }) => {

  const msg = {
    to: process.env.RECIVEDEMAIL, // Change to your recipient
    from: process.env.SENTEMAIL, // Change to your verified sender
    subject: name + ', ' + email,
    text: message,
    html: `<strong>${message}</strong>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })



    // const send = await fetch(process.env.SENDGRID_API, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.SENDGRID_API_KEY}` 
    //     },
    //     body: JSON.stringify({
    //       personalizations: [
    //         {
    //           to: [
    //             {
    //               email: 'info@international-expo.com',
    //               cc: 'intexpo27@gmail.com'
    //             }
    //           ],
    //           subject: name
    //         }
    //       ],
    //       from: {
    //         email: 'intexpo27@gmail.com',
    //         name : email
    //       },
    //       content: [
    //         {
    //           type: 'text/html',
    //           value: message
    //         }
    //       ]
    //     })
    // });
}


export { sendEmail };
