import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { authenticated } from '../../../functions/authenticated'

export default authenticated(async (req:NextApiRequest, res:NextApiResponse) => {
  const { title, title_ar, image, isDeleted } = req.body
  try {
    if (!title || !title_ar) {
      return res
        .status(400)
        .json({ message: '`title` and `title_ar` are both required' })
    }

    const results = await query(
      `
      INSERT INTO categories (title, title_ar, image, isDeleted)
      VALUES (?, ?, ? , ?)
      `,
      [title, title_ar, image, isDeleted]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
)
