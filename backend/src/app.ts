import express from "express";
import http from "http";
import { config } from "dotenv";
import UserRoutes from "./routes/user";
import bodyParser from "body-parser";
import cors from "cors";
import PostRouter from "./routes/post";

config();
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use((req, res, next) => {
  console.log(`${new Date()} - ${req.method} request for ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", UserRoutes);
app.use("/post", PostRouter);

server.listen(3001, () => console.log("> Server listening on port: 3001"));
