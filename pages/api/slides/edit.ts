import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'


const handler: NextApiHandler = async (req, res) => {
  const { id, title, title_ar, description, description_ar, image , isDeleted } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: 'This element not found' })
    }

    const results = await query(
      `
      UPDATE sliders
      SET title = ?, title_ar = ?, description = ?, description_ar = ?, image = ?, isDeleted = ?
      WHERE id = ?
      `,
      [title ,title_ar , description, description_ar, image , isDeleted , id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
