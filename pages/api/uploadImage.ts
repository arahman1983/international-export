import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadImage (req:NextApiRequest, res:NextApiResponse){
  const form = new formidable.IncomingForm();
  form.uploadDir = "/images/";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    console.log(err, fields, files);
  });
};
