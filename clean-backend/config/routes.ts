import { Express, Router } from "express";
import setupRoutes from "src/app/routes/register-routes";

export default (app: Express) => {
  const router = Router();
  app.use("/api", router);
  setupRoutes(router);
};
