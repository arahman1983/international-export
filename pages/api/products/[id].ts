import { NextApiHandler } from "next";
import { query } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  let lang = req.query.lang;
  let id = req.query.id

  try {
    let results;
    lang
      ? lang === "ar"
        ? (results = await query(`
      SELECT {id, title_ar, description_ar, details_ar, image, keyWords} FROM products
      WHERE id = ${id}
    `))
        : (results = await query(`
    SELECT {id, title, description, details, image, keyWords} FROM products
    WHERE id = ${id}
    `))
      : (results = await query(`
      SELECT * FROM products
      WHERE id = ${id}
  `));

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
