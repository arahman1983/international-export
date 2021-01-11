import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  console.log(req.body)
  const { 
    id,
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
    if (!id) {
      return res
        .status(400)
        .json({ message: 'This item is not find' })
    }

    const results = await query(
      `
      UPDATE products SET
        title = ?, 
        title_ar= ?, 
        description= ?, 
        description_ar= ?,
        details= ?,
        details_ar= ?,
        ct_id= ?,
        br_id= ?,
        image= ?,
        keyWords= ?,
        isDeleted= ?
        WHERE id = ?
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
        isDeleted,
        id
      ]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
