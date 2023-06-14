import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UserPlayload } from "../utils/jwt";

export default function AuthGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const [_, token] = authToken.split(" ");

  try {
    const user = jwt.verify(token, process.env.AUTH_SECRET);

    req.user = user as UserPlayload;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}
