import { Router } from "express";
import prisma from "../../db";
import AuthGuard from "../../middlewares/jwt";
import Multer from "../../middlewares/multer";
import { CustomFile, uploadImageToStorage } from "../../middlewares/firebase";

const PostRouter = Router();

PostRouter.post(
  "/",
  AuthGuard,
  Multer.single("file"),
  uploadImageToStorage,
  async (req, res) => {
    const reqFile: CustomFile = req.file as unknown as CustomFile;

    try {
      const created = await prisma.post.create({
        data: {
          file: reqFile.firebaseUrl,
          title: req.body.title,
          description: req.body.description,
          type: "",
          autor_id: req.user.id,
        },
      });
      res.status(200).json({ success: true, postId: created.id });
    } catch (err) {
      console.error(err);
      res.status(201).json({ message: err });
    }
  }
);

export default PostRouter;
