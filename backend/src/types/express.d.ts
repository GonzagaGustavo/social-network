import express from "express";
import { UserPlayload } from "../utils/jwt";

interface CustomRequest {
  user: UserPlayload | undefined;
}

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}
