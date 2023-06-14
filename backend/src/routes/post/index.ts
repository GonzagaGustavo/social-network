import { Router } from "express";
import prisma from "../../db";
import AuthGuard from "../../middlewares/jwt";
import Multer from "../../middlewares/multer";

const PostRouter = Router();

PostRouter.post("/", AuthGuard, Multer.single("file"), async (req, res) => {
  console.log(req.file);

  const created = await prisma.post.create({
    data: {
      file: "",
      title: req.body.title,
      description: req.body.description,
      type: "",
      autor_id: req.user.id,
    },
  });
});

export default PostRouter;
