import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (_, res) => {
  try {
    const results = await query(` SELECT * FROM users INNER JOIN roles ON u_r_id = r_id WHERE users.isDeleted = 0 ORDER BY users.updated_at DESC `)

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
