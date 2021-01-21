import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { authenticated } from '../../../functions/authenticated'

export default authenticated(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await query(`
      SELECT * FROM sliders
      ORDER BY updated_at DESC
  `)

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})
