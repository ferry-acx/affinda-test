import { getOrganizations, getWorkspaces } from '@/utils';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getOrganizations();
  res.status(200).json(response);
}