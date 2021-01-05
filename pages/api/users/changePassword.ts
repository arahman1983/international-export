import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'
import { compare, hash } from 'bcrypt';
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

const handler: NextApiHandler = async (req, res) => {
  const { id, password, old_password } = req.body
  try {
    if(req.method === 'POST') {
      const person = await query(`
      SELECT * FROM users WHERE u_id = ?
    `, [id])
    compare(old_password, person[0].u_password, function(err, result){
      if(!err && result){
        hash(password, 10, async function(err, hash) {
          const results = await query(
            `
            UPDATE users SET u_password =? WHERE u_id =?
            `,
            [hash, id ]
          )
      
          return res.json(results)
        })
      }
    }
  )
}
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
