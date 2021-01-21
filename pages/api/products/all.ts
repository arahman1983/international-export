import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";
import { authenticated } from "../../../functions/authenticated";

export default authenticated(async (req: NextApiRequest, res: NextApiResponse) => {
  let limit = req.query.limit;
  try {
    let results = await query(`
      SELECT * FROM products
      ORDER BY updated_at DESC ${limit ? "LIMIT " + limit : ""}
  `);

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
