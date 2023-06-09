import express from "express";
import http from "http";
import { config } from "dotenv";
import UserRoutes from "./routes/user";
import bodyParser from "body-parser";
import cors from "cors";

config();
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", UserRoutes);

server.listen(3001, () => console.log("> Server listening on port: 3001"));
