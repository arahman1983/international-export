import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { 
    title, 
    title_ar, 
    description, 
    description_ar,
    details,
    details_ar,
    ct_id,
    br_id,
    image,
    keyWords,
    isDeleted 
  } = req.body
  try {
    if (!title || !title_ar) {
      return res
        .status(400)
        .json({ message: '`title` and `title_ar` are both required' })
    }

    const results = await query(
      `
      INSERT INTO products (
        title, 
        title_ar, 
        description, 
        description_ar,
        details,
        details_ar,
        ct_id,
        br_id,
        image,
        keyWords,
        isDeleted 
      )
      VALUES (?, ?, ?)
      `,
      [
        title, 
        title_ar, 
        description, 
        description_ar,
        details,
        details_ar,
        ct_id,
        br_id,
        image,
        keyWords,
        isDeleted
      ]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
