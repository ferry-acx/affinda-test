import fs from 'fs'
import { AffindaAPI, AffindaCredential } from '@affinda/affinda';
import multer from 'multer';

const AFFINDA_KEY = "6065ee2949d2b0a0a0169751ad140b47592993cc";
const CODEV_ORG = "mgQHXdqM";
const MY_WORKSPACE = "UkVlsKyy";
const RESUME_PARSER_ID = "qPjLNglh";
const JOB_DESCRIPTION_ID = "byRRRhkI"

  const credential = new AffindaCredential(AFFINDA_KEY);
  const client = new AffindaAPI(credential);


export const uploadResume = async (file: string, flag: boolean) => {
  const readStream = fs.createReadStream(file);

  const response = await client.createDocument({
    file: readStream,
    workspace: MY_WORKSPACE,
    collection: flag ? RESUME_PARSER_ID : JOB_DESCRIPTION_ID,
  });
  
  return response
}

export const getOrganizations = async () => {
  const response = await client.getAllOrganizations();

  return response
}

export const getWorkspaces = async (id = CODEV_ORG) => {
  const response = await client.getAllWorkspaces(id);

  return response
}

export const getCollections = async (id = MY_WORKSPACE) => {
  const response = await client.getAllCollections(id);

  return response;
};

export const getAllDocuments = async (id = RESUME_PARSER_ID) => {
  const response = await client.getAllDocuments({ collection: id})

  return response;
}


const oneMegabyteInBytes = 1000000;
export const outputFolderName = "./public";

export const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 2 },
  storage: multer.diskStorage({
    destination: "./",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

export const removeFile = (file: string) => {
  try {
    fs.unlinkSync(file);
    //file removed
  } catch (err) {
    console.error(err);
  }
}

