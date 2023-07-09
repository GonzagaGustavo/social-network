import { Express } from "express";
import { json, urlencoded } from "./middleware/body-parser";
import cors from "./middleware/cors";
import contentType from "./middleware/content-type";

export default (app: Express) => {
  app.use(json);
  app.use(urlencoded);
  app.use(cors);
  app.use(contentType);
};
