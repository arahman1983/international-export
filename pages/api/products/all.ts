import { NextApiHandler } from "next";
import { query } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  let lang = req.query.lang;
  let limit = req.query.limit;
  try {
    let results;
    lang
      ? lang === "ar"
        ? (results = await query(`
      SELECT {id, title_ar, description_ar, details_ar, image, keyWords} FROM products
      WHERE isDeleted = 0 ORDER BY updated_at DESC ${limit ? "LIMIT " + limit  : ""}
    `))
        : (results = await query(`
    SELECT {id, title, description, details, image, keyWords} FROM products
    WHERE isDeleted = 0 ORDER BY updated_at DESC ${limit ? "LIMIT " + limit : ""}
    `))
      : (results = await query(`
      SELECT * FROM products
      ORDER BY updated_at DESC ${limit ? "LIMIT " + limit : ""}
  `));

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
