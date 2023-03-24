import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import fs from "fs";
import { outputFolderName, removeFile, upload, uploadResume } from '@/utils';
import NextCors from 'nextjs-cors';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = any



const apiRoute = nextConnect({
  onError(
    error,
    req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("file"));

apiRoute.post(
  async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const fileList = fs.readdirSync(outputFolderName);
    const firstFile = `${outputFolderName}/${fileList[0]}`
    const {type} = req.query


    const response = await uploadResume(firstFile, type==="resume");

    removeFile(firstFile);

    res.status(200).json(response);
  }
);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;
