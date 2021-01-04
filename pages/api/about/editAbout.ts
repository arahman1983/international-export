import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '../../../lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { id, title, title_ar, description, description_ar, details, details_ar, keyWords } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: 'This element is not found' })
    }

    const results = await query(
      `
      UPDATE about SET title= ? , title_ar = ?, description = ? , description_ar = ?
      ,details= ? , details_ar= ? ,image= ? , keyWords = ?  WHERE id = ?
      `,
      [title, title_ar, description, description_ar, details, details_ar, '/images/logo.png',  keyWords, id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
