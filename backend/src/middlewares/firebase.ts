import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../secret/social-network-firebase-adminsdk.json";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { socket } from "../app";
import processVideo from "../utils/video";

export interface CustomFile extends File {
  firebaseUrl: string | undefined;
  video?: {
    v1080: string | null;
    v720: string | null;
    v480: string | null;
    v144: string | null;
  };
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: process.env.BUCKET,
});

export const bucket = admin.storage().bucket();

async function processImage(
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

async function uploadImageToStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const fileBuffer = await processImage(
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

async function uploadVideoToStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  socket
    .to(String(req.user.id))
    .emit("video", "transformando video em várias qualidades...");

  const reqFile: CustomFile = req.file as unknown as CustomFile;
  const videosUploaded = await processVideo(req.file);

  socket.to(String(req.user.id)).emit("video", "publicando video...");

  reqFile.video = videosUploaded;

  next();
}

export async function uploadFileToStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.title && !req.body.description && !req.file)
    res.status(201).json({ message: "Invalid options" });

  if (req.file.mimetype.substring(0, 5) === "image") {
    uploadImageToStorage(req, res, next);
  } else {
    uploadVideoToStorage(req, res, next);
  }
}
