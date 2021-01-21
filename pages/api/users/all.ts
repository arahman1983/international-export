import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";
import { authenticated } from "../../../functions/authenticated";

export default authenticated(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await query(` SELECT * FROM users INNER JOIN roles ON u_r_id = r_id ORDER BY users.updated_at DESC `);

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
