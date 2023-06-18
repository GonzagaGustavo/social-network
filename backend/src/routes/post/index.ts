import { Router } from "express";
import prisma from "../../db";
import AuthGuard from "../../middlewares/jwt";
import Multer from "../../middlewares/multer";
import { CustomFile, uploadFileToStorage } from "../../middlewares/firebase";

const PostRouter = Router();

PostRouter.post(
  "/",
  AuthGuard,
  Multer.single("file"),
  uploadFileToStorage,
  async (req, res) => {
    const reqFile: CustomFile = req.file as unknown as CustomFile;

    if (reqFile.firebaseUrl) {
      try {
        const created = await prisma.post.create({
          data: {
            file: reqFile.firebaseUrl,
            title: req.body.title,
            description: req.body.description,
            type: "image",
            autor_id: req.user.id,
          },
        });
        res.status(200).json({ success: true, postId: created.id });
      } catch (err) {
        console.error(err);
        res.status(201).json({ message: err });
      }
    } else if (reqFile.video) {
      try {
        const videoCreated = await prisma.video.create({
          data: {
            thumb: "",
            v1080p: reqFile.video.v1080,
            v720p: reqFile.video.v720,
            v480p: reqFile.video.v480,
            v144p: reqFile.video.v144,
          },
        });

        const created = await prisma.post.create({
          data: {
            title: req.body.title,
            description: req.body.description,
            type: "video",
            autor_id: req.user.id,
            video_id: videoCreated.id,
          },
        });

        res.status(200).json({ success: true, postId: created.id });
      } catch (err) {
        console.error(err);
        res.status(201).json({ message: err });
      }
    }
  }
);

export default PostRouter;
