import { NextApiHandler } from "next";
import { query } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  let limit = req.query.limit;
  try {
    let results = await query(`
      SELECT * FROM products WHERE isDeleted = 0
      ORDER BY updated_at DESC ${limit ? "LIMIT " + limit : " "}
  `);

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
