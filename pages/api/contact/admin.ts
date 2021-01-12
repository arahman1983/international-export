import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { authenticated } from '../authenticated'

export default authenticated(async (req:NextApiRequest, res:NextApiResponse) =>  {
  try {
    const results = await query(`
      SELECT * FROM contact
      ORDER BY updated_at DESC LIMIT 1
  `)

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})
