import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })

const secret = '0e900be1-0ac5-3b6c-bf4b-38f8b21a189b'

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.cookies.auth!, secret, async function(err, decoded) {
    if (!err && decoded) {
      return await fn(req, res);
    }
    res.status(401).json({ message: 'Sorry you are not authenticated' });
  });
};