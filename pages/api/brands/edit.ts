import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { authenticated } from '../../../functions/authenticated'


export default authenticated(async (req:NextApiRequest, res:NextApiResponse) => {
  const { id, title, title_ar, isDeleted } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: 'This element not found' })
    }

    const results = await query(
      `
      UPDATE brands
      SET title = ?, title_ar = ?, isDeleted = ?
      WHERE id = ?
      `,
      [title ,title_ar , isDeleted , id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
)