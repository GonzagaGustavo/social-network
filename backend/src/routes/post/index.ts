import { Router } from "express";
import prisma from "../../db";
import AuthGuard, { GetUser } from "../../middlewares/jwt";
import Multer from "../../middlewares/multer";
import { uploadFileToStorage } from "../../middlewares/firebase";

const PostRouter = Router();

PostRouter.post(
  "/",
  AuthGuard,
  Multer.array("file", 2),
  uploadFileToStorage,
  async (req, res) => {
    if (req.fileInfos.firebaseUrl) {
      try {
        const created = await prisma.post.create({
          data: {
            file: req.fileInfos.firebaseUrl,
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
    } else if (req.fileInfos.video) {
      try {
        const videoCreated = await prisma.video.create({
          data: {
            thumb: req.fileInfos.thumb,
            v1080p: req.fileInfos.v1080,
            v720p: req.fileInfos.v720,
            v480p: req.fileInfos.v480,
            v144p: req.fileInfos.v144,
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

PostRouter.get("/", GetUser, (req, res) => {});

export default PostRouter;
