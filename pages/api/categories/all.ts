import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { authenticated } from '../authenticated'

export default authenticated(async (req:NextApiRequest, res:NextApiResponse) =>{
  try {
    const results = await query(`
      SELECT * FROM categories
      ORDER BY id DESC
  `)

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})
