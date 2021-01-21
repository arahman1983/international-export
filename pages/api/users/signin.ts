import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { query } from '../../../lib/db'
import { NextApiRequest, NextApiResponse } from 'next';

const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })



export default async function signIn (req:NextApiRequest, res:NextApiResponse) {
  // const { username, password, email, role } = req.body
  try {
  if(req.method === 'POST') {
    const person = await query(`
      SELECT * FROM users WHERE u_isDeleted = 0 and u_email = ?
    `, [req.body.email])

    compare(req.body.password, person[0].u_password, function(err, result){
      if(!err && result){
        const claims = { sub: person[0].u_id, myPersonEmail: person[0].u_email };
        const jwt = sign(claims, process.env.SECRET, { expiresIn: '8h' });
        
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 3600,
          path: '/admin/'
        }))
        res.json({id : person[0].u_id, userName: person[0].u_name,  role: person[0].u_r_id});
      } else {
        console.log(err)
        res.json({ message: 'Ups, something went wrong!' });
      }
    })
    } else {
      res.status(405).json({ message: 'We only support POST' });
    }
  } catch (e) {
  res.status(500).json({ message: e.message })
}
}
