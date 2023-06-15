import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../secret/social-network-firebase-adminsdk.json";
import { NextFunction, Request, Response } from "express";

export interface CustomFile extends File {
  firebaseUrl: string;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: process.env.BUCKET,
});

const bucket = admin.storage().bucket();

function processFile(file: File) {}

export function uploadImageToStorage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.title && !req.body.description && !req.file)
    res.status(201).json({ message: "Invalid options" });

  const fileName = Date.now() + "." + req.file.originalname.split(".").pop();

  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
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

  stream.end(req.file.buffer);
}
