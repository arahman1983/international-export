import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'
import { authenticated } from '../../../functions/authenticated'

const filter = new Filter()

export default authenticated(async (req:NextApiRequest, res:NextApiResponse) => {
  const { title, title_ar, isDeleted } = req.body
  try {
    if (!title || !title_ar) {
      return res
        .status(400)
        .json({ message: '`title` and `title_ar` are both required' })
    }

    const results = await query(
      `
      INSERT INTO roles (r_role, r_role_ar, r_isDeleted)
      VALUES (?, ?, ?)
      `,
      [title, title_ar, isDeleted]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
)