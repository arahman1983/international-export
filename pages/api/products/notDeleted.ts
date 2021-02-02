import { NextApiHandler } from "next";
import { query } from "../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  let limit = req.query.limit;
  try {
    let results = await query(`
    SELECT products.id,products.title,products.title_ar, products.description,products.description_ar,products.details, products.details_ar, products.image, products.keywords, brands.title as brand, categories.title as category FROM products 
      LEFT JOIN brands ON br_id = brands.id 
      LEFT JOIN categories ON ct_id = categories.id ORDER BY products.updated_at DESC
      ${limit ? "LIMIT " + limit : " "}
  `);

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
