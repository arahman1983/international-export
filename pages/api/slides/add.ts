import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { title, title_ar, description, description_ar } = req.body
  try {
    if (!title || !title_ar) {
      return res
        .status(400)
        .json({ message: '`title` and `title_ar` are both required' })
    }

    const results = await query(
      `
      INSERT INTO sliders (title, title_ar, description, description_ar)
      VALUES (?, ?, ?, ?)
      `,
      [title, title_ar, description, description_ar]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
