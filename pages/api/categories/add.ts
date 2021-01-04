import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { title, title_ar } = req.body
  try {
    if (!title || !title_ar) {
      return res
        .status(400)
        .json({ message: '`title` and `title_ar` are both required' })
    }

    const results = await query(
      `
      INSERT INTO categories (title, title_ar)
      VALUES (?, ?)
      `,
      [title, title_ar]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
