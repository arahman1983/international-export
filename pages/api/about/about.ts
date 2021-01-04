import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db'

export default async function getAbout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = await query(`
      SELECT * FROM about
      ORDER BY id DESC
      LIMIT 1
  `)
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
};
