import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";
import { authenticated } from "../authenticated";

export default authenticated(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, title, title_ar, isDeleted } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "This element not found" });
    }

    const results = await query(
      `
      UPDATE roles
      SET r_role = ?, r_role_ar = ?, r_isDeleted = ?
      WHERE r_id = ?
      `,
      [title, title_ar, isDeleted, id]
    );

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
