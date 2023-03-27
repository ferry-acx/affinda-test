import NextCors from 'nextjs-cors';
import { NextApiRequest, NextApiResponse } from "next";

import { getOrganizations } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // await NextCors(req, res, {
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200,
  // });
  const response = await getOrganizations();
  res.status(200).json(response);
}