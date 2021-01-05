import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function getAbout(req: NextApiRequest, res: NextApiResponse) {
  let lang = req.query.lang;
  try {
    let results;
    lang
      ? lang === "ar"
        ? (results = await query(`
              SELECT {title_ar, description_ar, details_ar, image, keyWords} FROM about
              ORDER BY id DESC
              LIMIT 1
          `))
        : (results = await query(`
              SELECT {title, description, details, image, keyWords} FROM about
              ORDER BY id DESC
              LIMIT 1
          `))
      : (results = await query(`
            SELECT * FROM about
            ORDER BY id DESC
            LIMIT 1
        `));

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
