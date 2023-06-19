import express from "express";
import { UserPlayload } from "../utils/jwt";

interface CustomRequest {
  user: UserPlayload | undefined;
  fileInfos?: {
    video?: true;
    firebaseUrl: string | undefined;
    thumb: string;
    v1080: string | null;
    v720: string | null;
    v480: string | null;
    v144: string | null;
  };
}

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}
