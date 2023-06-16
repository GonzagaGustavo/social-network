import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../secret/social-network-firebase-adminsdk.json";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";

export interface CustomFile extends File {
  firebaseUrl: string;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: process.env.BUCKET,
});

const bucket = admin.storage().bucket();

async function processFile(
  file: Express.Multer.File,
  croppedArea: { height: number; width: number; x: number; y: number }
) {
  const process = sharp(file.buffer);

  const metadata = await process.metadata();

  return await process
    .extract({
      height: Math.round((croppedArea.height / 100) * metadata.height),
      width: Math.round((croppedArea.width / 100) * metadata.width),
      left: Math.round((croppedArea.x / 100) * metadata.width),
      top: Math.round((croppedArea.y / 100) * metadata.height),
    })
    .toFormat("webp")
    .toBuffer();
}

export async function uploadImageToStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.title && !req.body.description && !req.file)
    res.status(201).json({ message: "Invalid options" });

  const fileBuffer = await processFile(
    req.file,
    JSON.parse(req.body.croppedArea)
  );

  const fileName = Date.now() + "." + "webp";

  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: "image/webp",
    },
  });

  stream.on("error", (err) => {
    console.error(err);
    res.status(201).json({ message: err });
  });

  stream.on("finish", async () => {
    await file.makePublic();

    const reqFile: CustomFile = req.file as unknown as CustomFile;
    reqFile.firebaseUrl = `https://storage.googleapis.com/${process.env.BUCKET}/${fileName}`;

    next();
  });

  stream.end(fileBuffer);
}
