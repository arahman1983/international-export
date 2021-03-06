import { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from '../../../functions/authenticated'
import cookie from 'cookie';


export default async function signOut (req:NextApiRequest, res:NextApiResponse) {
  try {
        res.setHeader('Set-Cookie', cookie.serialize('auth', '', {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 0,
          path: '/'
        }))
        res.json({auth:'', expiresIn: Date.now()})
        res.destroy()
  } catch(e) {
    console.log(e.message)
  }
}