import { hash } from 'bcrypt' ;
import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { authenticated } from '../authenticated';

export default authenticated(async (req:NextApiRequest, res:NextApiResponse) =>{
  const { username, password, email, role } = req.body
  try {
  if(req.method === 'POST') {
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: '`email`, `password` and `role` are both required' })
    }

    hash(password, 10, async function(err, hash) {
      const results = await query(
        `
        INSERT INTO users (u_name, u_password, u_email, u_r_id)
        VALUES (?, ?, ?, ?)
        `,
        [username, hash, email, role ]
      )
  
      return res.json(results)
    })
  }
}catch (e) {
  res.status(500).json({ message: e.message })
}
})
