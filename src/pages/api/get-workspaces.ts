import { getWorkspaces } from '@/utils';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getWorkspaces();
  res.status(200).json(response);
}