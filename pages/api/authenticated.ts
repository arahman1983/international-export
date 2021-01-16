import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })


export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.cookies.auth!, process.env.SECRET, async function(err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ message: 'Sorry you are not authenticated' });
  });
};