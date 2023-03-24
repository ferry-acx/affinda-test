import { getAllDocuments } from '@/utils';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { id } = req.body
  const response = await getAllDocuments();
  res.status(200).json(response);
}