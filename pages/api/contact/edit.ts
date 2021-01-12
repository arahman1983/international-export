import { NextApiRequest, NextApiResponse } from 'next'
import { query } from '../../../lib/db'
import { authenticated } from '../authenticated'


export default authenticated(async (req:NextApiRequest, res:NextApiResponse) => {
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
)