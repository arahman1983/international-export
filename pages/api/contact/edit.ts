import { NextApiHandler } from 'next'
import { query } from '../../../lib/db'


const handler: NextApiHandler = async (req, res) => {
  const { id, address, address_ar, phones, emails } = req.body
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: 'This element not found' })
    }

    const results = await query(
      `
      UPDATE contact
      SET address = ?, address_ar = ?, phones = ?, emails = ?
      WHERE id = ?
      `,
      [address ,address_ar , phones , emails , id]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
