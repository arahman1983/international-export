import { NextApiRequest, NextApiResponse  } from 'next';

import { sendEmail } from '../../db/sendEmail';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
    const { name, email, message } = req.body;
    const sent = await sendEmail({ name, email, message });
    return res.status(200).end();
    }
    return res.status(404).json({
        error: {
            code: 'not_found',
            messgae: "The requested endpoint was not found or doesn't support this method."
        }
    });
}
