import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { title, title_ar, image , isDeleted } = req.body

  try {
    if (!title || !title_ar) {
      return res
        .status(400)
        .json({ message: '`title`, `title_ar` and image are both required' })
    }

    const results = await query(
      `
      INSERT INTO brands (title, title_ar, image, isDeleted)
      VALUES (?, ?, ?, ?)
      `,
      [title, title_ar, image, isDeleted]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
