import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'


const handler: NextApiHandler = async (req, res) => {
  const { id, role_id, isDeleted } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: 'This element not found' })
    }

    const results = await query(
      `
      UPDATE users
      SET u_r_id = ?, u_isDeleted = ?
      WHERE u_id = ?
      `,
      [role_id , isDeleted , id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
