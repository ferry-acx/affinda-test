import { getAllDocuments } from '@/utils';
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { id } = req.body
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const response = await getAllDocuments();
  res.status(200).json(response);
}